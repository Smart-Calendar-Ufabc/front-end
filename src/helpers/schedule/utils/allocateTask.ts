import { BlockedTimeType } from '@/seed/blockedTimes'
import { DeadlineExceededException } from '@/errors/DeadlineExceededException'
import { Schedule } from '@/entities/Schedule'
import { UnallocatedTask } from '@/entities/UnallocatedTask'

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
        throw new DeadlineExceededException()
      }

      newSchedule = {
        id: taskToAllocate.id,
        title: taskToAllocate.title,
        done: false,
        priority: taskToAllocate.priority,
        startAt: new Date(previousSchedule.endAt),
        endAt: new Date(newScheduleEndAt),
        deadline: taskToAllocate.deadline,
      }

      if (isItInPast(newSchedule.startAt) || isItInPast(newSchedule.endAt)) {
        return false
      }

      if (isTaskWithinPeriodBlocked(newSchedule, options.blockedTimes)) {
        return false
      }

      return true
    }

    const [hours, minutes] = taskToAllocate.duration
      .split(':')
      .map((time) => parseInt(time, 10))
    const taskDurationMs = (hours * 60 + minutes) * 60 * 1000

    if (
      isThereGapBetweenSchedules(
        taskDurationMs,
        previousSchedule,
        currentSchedule,
      )
    ) {
      const newScheduleEndAt = new Date(
        previousSchedule.endAt.getTime() + taskDurationMs,
      )

      if (taskToAllocate.deadline.getTime() < newScheduleEndAt.getTime()) {
        throw new DeadlineExceededException()
      }

      newSchedule = {
        id: taskToAllocate.id,
        title: taskToAllocate.title,
        done: false,
        priority: taskToAllocate.priority,
        startAt: new Date(previousSchedule.endAt),
        endAt: new Date(newScheduleEndAt),
        deadline: taskToAllocate.deadline,
      }

      if (isItInPast(newSchedule.startAt) || isItInPast(newSchedule.endAt)) {
        return false
      }

      if (isTaskWithinPeriodBlocked(newSchedule, options.blockedTimes)) {
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
  newScheduleDurationMs: number,
  previousSchedule: Schedule,
  currentSchedule: Schedule,
) => {
  const diff =
    currentSchedule.startAt.getTime() - previousSchedule.endAt.getTime()

  return diff >= newScheduleDurationMs
}

export const isTaskWithinPeriodBlocked = (
  schedule: Schedule,
  blockedTimes: BlockedTimeType,
): boolean => {
  const scheduleDurationMs =
    schedule.endAt.getTime() - schedule.startAt.getTime()

  const isBlockedInterval = blockedTimes.intervals.some((interval) => {
    let startDate: Date
    let endDate: Date

    if (interval.startHour < interval.endHour) {
      startDate = new Date()
      startDate.setUTCHours(interval.startHour)
      endDate = new Date()
      endDate.setUTCHours(interval.endHour)
    } else {
      startDate = new Date()
      startDate.setUTCHours(interval.startHour)
      endDate = new Date()
      endDate.setUTCHours(interval.endHour)
      endDate.setUTCDate(endDate.getUTCDate() + 1)
    }

    const diff = endDate.getTime() - startDate.getTime()

    return diff >= scheduleDurationMs
  })

  if (isBlockedInterval) {
    return true
  }

  const isBlockedInDates = blockedTimes.dates.some((date) => {
    return (
      date.getTime() >= schedule.startAt.getTime() &&
      date.getTime() <= schedule.endAt.getTime()
    )
  })

  if (isBlockedInDates) {
    return true
  }

  const isBlockedInWeekDays = blockedTimes.weekDays.some((weekDay) => {
    return schedule.startAt.getUTCDay() === weekDay
  })

  return isBlockedInWeekDays
}

const isItInPast = (date: Date): boolean => {
  return date.getTime() < new Date().getTime()
}
