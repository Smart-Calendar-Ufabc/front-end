import { UnallocatedTask } from '../entities/UnallocatedTask'

export const sortByPriorityAndDeadline = (tasks: UnallocatedTask[]) => {
  return tasks.sort((a, b) => {
    if (a.priority === b.priority) {
      return a.deadline.getTime() - b.deadline.getTime()
    }

    if (a.priority === 'high' && b.priority === 'medium') {
      return -1
    }
    if (a.priority === 'medium' && b.priority === 'low') {
      return -1
    }
    if (a.priority === 'high' && b.priority === 'low') {
      return -1
    }
    return 1
  })
}
