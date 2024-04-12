export type BlockedTimeType = {
  dates: Date[]
  weekDays: number[]
  intervals: {
    startHour: number
    endHour: number
  }[]
}

export const blockedTimes: BlockedTimeType = {
  dates: [new Date('2024-04-12T00:00:00Z')],
  weekDays: [0, 6], // Sunday and Saturday
  intervals: [
    {
      startHour: 22, // 22:00
      endHour: 8, // 08:00
    },
  ],
}
