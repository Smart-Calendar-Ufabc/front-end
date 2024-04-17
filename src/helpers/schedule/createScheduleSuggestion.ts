import { allocateTask } from './utils/allocateTask'
import { sortByPriorityAndDeadline } from './utils/sortByPriorityAndDeadline'
import { DeadlineExceededException } from '@/errors/DeadlineExceededException'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { Schedule } from '@/entities/Schedule'
import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { BlockedTimeType } from '@/seed/blockedTimes'

export const createScheduleSuggestion = (
  tasksToAllocate: UnallocatedTask[],
  schedules: Schedule[],
  blockedTimes?: BlockedTimeType,
): Schedule[] | null => {
  const { addUnallocatedTaskInSuggestion } = useUnallocatedTaskStates.getState()

  if (tasksToAllocate.length === 0) {
    return null
  }

  const sortedTasks = sortByPriorityAndDeadline(tasksToAllocate)

  const newSchedules: Schedule[] = []

  sortedTasks.forEach((task) => {
    const initialSchedules = sortByStartDate([...schedules, ...newSchedules])
    try {
      const newSchedule = allocateTask(initialSchedules, task, {
        blockedTimes,
      })

      if (newSchedule) {
        newSchedules.push(newSchedule)
      }
    } catch (error) {
      if (error instanceof DeadlineExceededException) {
        addUnallocatedTaskInSuggestion(task, {
          key: 'deadline-exceeded',
          message: `Não há tempo disponível na agenda para realizar esta tarefa antes do prazo de entrega.`,
        })
      } else {
        console.error(error)
      }
    }
  })

  return newSchedules
}

const sortByStartDate = (schedules: Schedule[]): Schedule[] => {
  return schedules.sort((a, b) => {
    return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  })
}
