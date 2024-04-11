type Priority = 'low' | 'medium' | 'high'

export type UnallocatedTask = {
  id: string
  title: string
  notes?: string
  priority: Priority
  duration: string
  dueDate: string
  dueTime: string
}
