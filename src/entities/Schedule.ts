export interface Schedule {
  id: string
  title: string
  done: boolean
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startDate: string
  startTime: string
  endTime: string
}
