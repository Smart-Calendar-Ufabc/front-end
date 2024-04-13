export type Profile = {
  name?: string
  blockedTimes?: {
    dates?: Date[]
    weekDays?: number[]
    intervals?: {
      start: {
        hour: number
        minutes: number
      }
      end: { hour: number; minutes: number }
    }[]
  }
}
