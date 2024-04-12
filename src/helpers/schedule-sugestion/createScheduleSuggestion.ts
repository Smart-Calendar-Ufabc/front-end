import { allocateTask } from './utils/allocateTask'
import { Schedule } from './entities/Schedule'
import { UnallocatedTask } from './entities/UnallocatedTask'
import { sortByPriorityAndDeadline } from './utils/sortByPriorityAndDeadline'
import { blockedTimes } from '@/seed/blockedTimes'

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
    const initialSchedules = sortByStartDate([...schedules, ...newSchedules])
    try {
      const newSchedule = allocateTask(initialSchedules, task, {
        blockedTimes,
      })
      if (newSchedule) {
        newSchedules.push(newSchedule)
      }
    } catch (error) {
      console.error(error)
    }
  })

  return newSchedules
}

const sortByStartDate = (schedules: Schedule[]): Schedule[] => {
  return schedules.sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
}
