export type Routine = {
  id: string
  title: string
  done: boolean
  duration: number
  startAt: string
  startTime: string
  repeatAt: 'daily' | 'weekly' | 'weekdays'
  repeatEvery: number
}
