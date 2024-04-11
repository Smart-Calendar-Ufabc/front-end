export type UnallocatedTask = {
  id: string
  title: string
  notes?: string
  priority: 'low' | 'medium' | 'high'
  duration: string
  deadline: Date
}
