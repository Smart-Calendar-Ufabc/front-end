export type BlockedTimeType = {
  dates: Date[]
  weekDays: number[]
  intervals: {
    start: {
      hour: number
      minutes: number
    }
    end: { hour: number; minutes: number }
  }[]
}

export const blockedTimes: BlockedTimeType = {
  dates: [],
  weekDays: [0, 6], // Sunday and Saturday
  intervals: [
    {
      start: {
        hour: 22,
        minutes: 0,
      },
      end: {
        hour: 8,
        minutes: 0,
      },
    },
  ],
}
