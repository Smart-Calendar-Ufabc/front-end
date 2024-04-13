export type BlockedTimeType = {
  dates: Date[]
  weekDays: number[]
  intervals: {
    startHour: number
    endHour: number
  }[]
}

export const blockedTimes: BlockedTimeType = {
  dates: [],
  weekDays: [0, 6], // Sunday and Saturday
  intervals: [
    {
      startHour: 22, // 22:00
      endHour: 8, // 08:00
    },
  ],
}
