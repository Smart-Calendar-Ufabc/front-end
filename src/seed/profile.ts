import { Profile } from '@/entities/Profile'

export const profile: Profile = {
  name: 'Jane Doe',
  blockedTimes: {
    dates: [],
    weekDays: [0, 6], // Sunday and Saturday
    intervals: [
      {
        start: {
          hour: 22,
          minutes: 22,
        },
        end: {
          hour: 8,
          minutes: 0,
        },
      },
    ],
  },
}
