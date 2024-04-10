export interface CalendarSchedule {
  id: string
  title: string
  done: boolean
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startTime: string
  endTime: string
}
