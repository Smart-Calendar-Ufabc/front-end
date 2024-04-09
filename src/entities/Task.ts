type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  notes?: string
  done: boolean
  duration: number
  startAt: string
  startTime: string
  dueDate: string
  dueTime: string
  priority: Priority
}
