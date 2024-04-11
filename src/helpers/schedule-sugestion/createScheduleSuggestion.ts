import { allocateTask } from './utils/allocateTask'
import { Schedule } from './entities/Schedule'
import { UnallocatedTask } from './entities/UnallocatedTask'
import { sortByPriorityAndDeadline } from './utils/sortByPriorityAndDeadline'

export const createScheduleSuggestion = (
  tasksToAllocate: UnallocatedTask[],
  schedules: Schedule[],
): Schedule[] | null => {
  if (tasksToAllocate.length === 0) {
    return null
  }

  const sortedTasks = sortByPriorityAndDeadline(tasksToAllocate)

  const newSchedules: Schedule[] = []

  sortedTasks.forEach((task) => {
    try {
      const newSchedule = allocateTask(schedules, task)
      if (newSchedule) {
        newSchedules.push(newSchedule)
      }
    } catch (error) {
      console.error(error)
    }
  })

  return newSchedules
}
