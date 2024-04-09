type Priority = 'low' | 'medium' | 'high'

export type UnallocatedTask = {
  id: string
  title: string
  notes?: string
  duration: number
  dueDate: string
  dueTime: string
  priority: Priority
}
