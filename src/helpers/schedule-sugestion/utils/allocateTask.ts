import { BlockedTimeType } from '@/seed/blockedTimes'
import { Schedule } from '../entities/Schedule'
import { UnallocatedTask } from '../entities/UnallocatedTask'

export const allocateTask = (
  schedules: Schedule[],
  taskToAllocate: UnallocatedTask,
  options: {
    blockedTimes: BlockedTimeType
  },
): Schedule | null => {
  let newSchedule: Schedule | null = null

  schedules.some((_, index) => {
    const previousSchedule = schedules[index]
    const currentSchedule = schedules[index + 1]

    if (index === schedules.length - 1) {
      const [hours, minutes] = taskToAllocate.duration
        .split(':')
        .map((time) => parseInt(time, 10))
      const taskDuration = hours * 60 + minutes // convert hours to minutes

      const newScheduleEndAt = new Date(
        previousSchedule.endAt.getTime() + taskDuration * 60 * 1000,
      )

      if (taskToAllocate.deadline.getTime() < newScheduleEndAt.getTime()) {
        throw new Error(
          'Não há tempo disponível para alocar a tarefa antes do prazo de entrega.',
        )
      }

      newSchedule = {
        id: crypto.randomUUID(),
        title: taskToAllocate.title,
        done: false,
        priority: taskToAllocate.priority,
        startAt: new Date(previousSchedule.endAt),
        endAt: new Date(newScheduleEndAt),
      }

      if (isItInPast(newSchedule.startAt) || isItInPast(newSchedule.endAt)) {
        return false
      }

      if (isTaskWithinPeriodBlocked(options.blockedTimes, newSchedule)) {
        return false
      }

      return true
    }

    const [hours, minutes] = taskToAllocate.duration
      .split(':')
      .map((time) => parseInt(time, 10))
    const taskDuration = hours * 60 + minutes // convert hours to minutes

    if (
      isThereGapBetweenSchedules(
        taskDuration,
        previousSchedule,
        currentSchedule,
      )
    ) {
      const newScheduleEndAt = new Date(
        previousSchedule.endAt.getTime() + taskDuration * 60 * 1000,
      )

      if (taskToAllocate.deadline.getTime() < newScheduleEndAt.getTime()) {
        throw new Error(
          'Não há tempo disponível para alocar a tarefa antes do prazo de entrega.',
        )
      }

      newSchedule = {
        id: crypto.randomUUID(),
        title: taskToAllocate.title,
        done: false,
        priority: taskToAllocate.priority,
        startAt: new Date(previousSchedule.endAt),
        endAt: new Date(newScheduleEndAt),
      }

      if (isItInPast(newSchedule.startAt) || isItInPast(newSchedule.endAt)) {
        return false
      }

      if (isTaskWithinPeriodBlocked(options.blockedTimes, newSchedule)) {
        return false
      }

      // adiciona a tarefa alocada na lista de schedules
      return true
    }

    // não há tempo disponível para alocar a tarefa, procura o próximo horário
    return false
  })

  return newSchedule
}

export const isThereGapBetweenSchedules = (
  newScheduleDuration: number,
  previousSchedule: Schedule,
  currentSchedule: Schedule,
) => {
  const diff =
    currentSchedule.startAt.getTime() - previousSchedule.endAt.getTime()
  const newScheduleDurationInMs = newScheduleDuration * 60 * 1000 // convert minutes to milliseconds

  return diff >= newScheduleDurationInMs
}

const isTaskWithinPeriodBlocked = (
  blockedTimes: BlockedTimeType,
  newSchedule: Schedule,
): boolean => {
  const isBlockedDate = blockedTimes.dates.some((date) => {
    return (
      date.getTime() >= newSchedule.startAt.getTime() &&
      date.getTime() <= newSchedule.endAt.getTime()
    )
  })

  if (isBlockedDate) {
    return true
  }

  const isBlockedWeekDay = blockedTimes.weekDays.some((weekDay) => {
    return newSchedule.startAt.getUTCDay() === weekDay
  })

  if (isBlockedWeekDay) {
    return true
  }

  const isBlockedTime = blockedTimes.intervals.some((interval) => {
    const startDate = new Date(newSchedule.startAt)
    const startHourUTC = startDate.getUTCHours()

    const endDate = new Date(newSchedule.endAt)

    const periodInMilliseconds = startDate.getTime() - endDate.getTime()
    const periodInHours = Math.abs(periodInMilliseconds / 1000 / 60 / 60)

    return startHourUTC + periodInHours >= interval.startHour
  })

  return isBlockedTime
}

const isItInPast = (date: Date): boolean => {
  return date.getTime() < new Date().getTime()
}
