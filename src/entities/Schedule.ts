export type Schedule = {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'done'
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startAt: Date
  endAt: Date
  done?: boolean
  deadline?: Date
  notes?: string
  tags?: string[]
}
