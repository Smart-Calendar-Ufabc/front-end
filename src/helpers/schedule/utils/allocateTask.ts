import { Schedule } from '@/entities/Schedule'
import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { BlockedTimeType } from '@/entities/Profile'
import { DeadlineExceededException } from '@/errors/DeadlineExceededException'

const getPeriodsToSearch = (
  task: UnallocatedTask,
  blockedTimes?: BlockedTimeType,
) => {
  let sleepHours:
    | {
        start: { hour: number; minutes: number }
        end: { hour: number; minutes: number }
      }
    | undefined

  if (blockedTimes?.intervals) {
    sleepHours = blockedTimes.intervals[0]
  }

  const endDate = new Date(task.deadline)

  const [taskDurationHours, taskDurationMinutes] = task.duration
    .split(':')
    .map(Number)

  endDate.setHours(endDate.getUTCHours() - taskDurationHours)
  endDate.setMinutes(endDate.getUTCMinutes() - taskDurationMinutes)

  const currentDate = new Date()

  let currentDay = currentDate.getUTCDate()
  let currentMonth = currentDate.getUTCMonth()
  let currentYear = currentDate.getUTCFullYear()

  const endDay = endDate.getUTCDate()
  const endMonth = endDate.getUTCMonth()
  const endYear = endDate.getUTCFullYear()

  const periodsToSearch = []

  let i = 0
  while (
    currentDay - 1 !== endDay ||
    currentMonth !== endMonth ||
    currentYear !== endYear
  ) {
    let start =
      i === 0
        ? currentDate
        : new Date(currentYear, currentMonth, currentDay, 0, 0, 0)

    if (sleepHours && i !== 0) {
      start = new Date(
        currentYear,
        currentMonth,
        currentDay,
        sleepHours.end.hour,
        0,
        sleepHours.end.minutes,
      )
    }

    let end =
      currentDay === endDay
        ? new Date(
            currentYear,
            currentMonth,
            currentDay,
            endDate.getHours(),
            endDate.getMinutes(),
            0,
          )
        : new Date(currentYear, currentMonth, currentDay, 23, 59, 59)

    if (sleepHours) {
      end = new Date(
        currentYear,
        currentMonth,
        currentDay,
        sleepHours.start.hour,
        0,
        sleepHours.start.minutes,
      )
    }

    if (
      sleepHours &&
      i === 0 &&
      currentDate.getHours() >= sleepHours.start.hour
    ) {
      // se a hora atual for maior ou igual ao horário de início do intervalo de sono
    } else {
      periodsToSearch.push({
        start,
        end,
      })
    }

    currentDay += 1

    // verifica se o dia atual é maior que o último dia do mês
    if (currentDay > new Date(currentYear, currentMonth + 1, 0).getUTCDate()) {
      currentDay = 1
      currentMonth += 1
    }

    // verifica se o mês atual é maior que 11 (dezembro)
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear += 1
    }

    i += 1
  }

  if (task.priority === 'high') {
    return periodsToSearch
  } else if (task.priority === 'medium') {
    const thirdIndex = Math.floor(periodsToSearch.length / 3)
    let firstThird: { start: Date; end: Date }[],
      secondThird: { start: Date; end: Date }[],
      lastThird: { start: Date; end: Date }[]

    if (periodsToSearch.length === 2) {
      firstThird = periodsToSearch.slice(0, 2).reverse()
      secondThird = []
      lastThird = []
    } else {
      firstThird = periodsToSearch.slice(0, thirdIndex).reverse()
      secondThird = periodsToSearch.slice(thirdIndex, 2 * thirdIndex)
      lastThird = periodsToSearch.slice(2 * thirdIndex)
    }

    const sortedPeriods = firstThird.concat(secondThird, lastThird)

    return sortedPeriods
  }

  if (periodsToSearch.length > 2) {
    const lastElement = periodsToSearch[periodsToSearch.length - 1]
    const lastElements = periodsToSearch
      .slice(1, periodsToSearch.length - 1)
      .reverse()

    const sortedPeriods = [...lastElements, lastElement]

    return sortedPeriods
  }

  const sortedPeriods = periodsToSearch.reverse()

  return sortedPeriods
}

export const allocateTask = (
  schedules: Schedule[],
  taskToAllocate: UnallocatedTask,
  options: {
    blockedTimes?: BlockedTimeType
  },
): Schedule | null => {
  const periodsToSearch = getPeriodsToSearch(
    taskToAllocate,
    options?.blockedTimes,
  )

  const [hours, minutes] = taskToAllocate.duration.split(':').map(Number)
  const taskDuration = hours * 60 + minutes // convert hours to minutes

  let end = false
  let spaceFounded = true
  let index = 0

  while (end || spaceFounded) {
    const period = periodsToSearch[index]

    const schedulesInTheSameDayOfPeriod = schedules.filter((schedule) => {
      const scheduleStartAt = new Date(schedule.startAt).getDate()
      const periodStartAt = period.start.getUTCDate()

      return scheduleStartAt === periodStartAt
    })

    if (schedulesInTheSameDayOfPeriod.length === 0) {
      spaceFounded = true
      const newSchedule: Schedule = {
        id: taskToAllocate.id,
        title: taskToAllocate.title,
        status: 'pending',
        priority: taskToAllocate.priority,
        startAt: new Date(period.start),
        endAt: new Date(period.start.getTime() + taskDuration * 60 * 1000),
        deadline: taskToAllocate.deadline,
      }

      return newSchedule
    }

    for (let i = 0; i < schedulesInTheSameDayOfPeriod.length; i++) {
      const currentSchedule = schedulesInTheSameDayOfPeriod[i]
      const nextSchedule = schedulesInTheSameDayOfPeriod[i + 1]

      const spaceStart = Math.max(
        period.start.getTime(),
        new Date(currentSchedule.endAt).getTime(),
      )
      const spaceEnd = nextSchedule
        ? Math.min(
            period.end.getTime(),
            new Date(nextSchedule.startAt).getTime(),
          )
        : period.end.getTime()

      const spaceDuration = (spaceEnd - spaceStart) / (60 * 1000) // convert milliseconds to minutes

      if (spaceDuration >= taskDuration) {
        const newSchedule: Schedule = {
          id: taskToAllocate.id,
          title: taskToAllocate.title,
          status: 'pending',
          priority: taskToAllocate.priority,
          startAt: new Date(spaceStart),
          endAt: new Date(spaceStart + taskDuration * 60 * 1000),
          deadline: taskToAllocate.deadline,
        }

        return newSchedule
      }
    }

    index += 1

    if (index === periodsToSearch.length) {
      end = true
    }
  }

  throw new DeadlineExceededException()
}
