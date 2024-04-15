export type BlockedTimeType = {
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

export type Profile = {
  name?: string
  blockedTimes?: BlockedTimeType
  sleepHours?: {
    start: {
      hour: number
      minutes: number
    }
    end: {
      hour: number
      minutes: number
    }
  }
}
