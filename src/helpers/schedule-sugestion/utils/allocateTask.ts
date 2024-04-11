import { Schedule } from '../entities/Schedule'
import { UnallocatedTask } from '../entities/UnallocatedTask'

export const allocateTask = (
  schedules: Schedule[],
  taskToAllocate: UnallocatedTask,
): Schedule | null => {
  let newSchedule: Schedule | null = null

  schedules.some((_, index) => {
    const previousSchedule = schedules[index]

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
        startAt: previousSchedule.endAt,
        endAt: newScheduleEndAt,
      }

      return true
    }

    const nextSchedule = schedules[index + 1]

    const [hours, minutes] = taskToAllocate.duration
      .split(':')
      .map((time) => parseInt(time, 10))
    const taskDuration = hours * 60 + minutes // convert hours to minutes

    if (
      isThereGapBetweenSchedules(taskDuration, previousSchedule, nextSchedule)
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
        startAt: previousSchedule.endAt,
        endAt: newScheduleEndAt,
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
  nextSchedule: Schedule,
) => {
  const diff = nextSchedule.startAt.getTime() - previousSchedule.endAt.getTime()
  const newScheduleDurationInMs = newScheduleDuration * 60 * 1000 // convert minutes to milliseconds

  return diff >= newScheduleDurationInMs
}
