import { Schedule } from '@/entities/Schedule'
import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { BlockedTimeType } from '@/entities/Profile'
import { DeadlineExceededException } from '@/errors/DeadlineExceededException'

export const allocateTask = (
  schedules: Schedule[],
  taskToAllocate: UnallocatedTask,
  options: {
    blockedTimes?: BlockedTimeType
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
        status: 'pending',
        priority: taskToAllocate.priority,
        startAt: new Date(previousSchedule.endAt),
        endAt: new Date(newScheduleEndAt),
        deadline: taskToAllocate.deadline,
      }

      if (
        options?.blockedTimes &&
        isTaskWithinPeriodBlocked(newSchedule, options.blockedTimes)
      ) {
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
        status: 'pending',
        priority: taskToAllocate.priority,
        startAt: new Date(previousSchedule.endAt),
        endAt: new Date(newScheduleEndAt),
        deadline: taskToAllocate.deadline,
      }

      if (
        options?.blockedTimes &&
        isTaskWithinPeriodBlocked(newSchedule, options.blockedTimes)
      ) {
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
  const isBlockedInWeekDay = checkIfIsWithinBlockedWeekDay(
    schedule,
    blockedTimes.weekDays,
  )

  if (isBlockedInWeekDay) {
    return true
  }

  const isBlockedInterval = checkIfIsWithinBlockedInterval(
    schedule,
    blockedTimes.intervals,
  )

  return isBlockedInterval
}

const checkIfIsWithinBlockedWeekDay = (
  schedule: Schedule,
  blockedWeekDays: number[],
) => {
  return blockedWeekDays.some((blockedWeekDay) => {
    const isBlocked = schedule.startAt.getUTCDay() === blockedWeekDay

    if (isBlocked) {
      return true
    }

    return false
  })
}

const checkIfIsWithinBlockedInterval = (
  schedule: Schedule,
  intervals: {
    start: {
      hour: number
      minutes: number
    }
    end: { hour: number; minutes: number }
  }[],
): boolean => {
  return intervals.some((interval) => {
    if (interval.start.hour < interval.end.hour) {
      // intervalo normal (sem passar para o dia seguinte) e.g. 8:00 - 12:00

      const startDateInterval = new Date(schedule.startAt)
      startDateInterval.setUTCHours(interval.start.hour)
      startDateInterval.setMinutes(interval.start.minutes)

      if (schedule.endAt > startDateInterval) {
        return true
      }
    } else {
      // intervalo que passa para o dia seguinte e.g. 22:00 - 6:00

      const startDateInterval = new Date(schedule.startAt)
      startDateInterval.setUTCHours(interval.start.hour)
      startDateInterval.setMinutes(interval.start.minutes)

      if (schedule.endAt > startDateInterval) {
        return true
      }
    }

    return false
  })
}
