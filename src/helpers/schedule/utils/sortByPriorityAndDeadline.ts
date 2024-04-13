import { UnallocatedTask } from '@/entities/UnallocatedTask'

export const sortByPriorityAndDeadline = (tasks: UnallocatedTask[]) => {
  return tasks.sort((a, b) => {
    // Compare by deadline first
    if (a.deadline < b.deadline) return -1
    if (a.deadline > b.deadline) return 1

    // If deadlines are equal, compare by priority
    const priorityOrder = ['low', 'medium', 'high']
    const aPriority = priorityOrder.indexOf(a.priority)
    const bPriority = priorityOrder.indexOf(b.priority)

    // Return the comparison result
    return aPriority - bPriority
  })
}
