export type Schedule = {
  id: string
  title: string
  done: boolean
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startAt: Date
  endAt: Date
}
