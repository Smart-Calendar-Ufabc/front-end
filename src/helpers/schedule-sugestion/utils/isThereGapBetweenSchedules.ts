import { Schedule } from '../entities/Schedule'

export const isThereGapBetweenSchedules = (
  newScheduleDuration: number,
  previousSchedule: Schedule,
  nextSchedule: Schedule,
) => {
  const diff = nextSchedule.startAt.getTime() - previousSchedule.endAt.getTime()
  const newScheduleDurationInMs = newScheduleDuration * 60 * 1000 // convert minutes to milliseconds

  return diff >= newScheduleDurationInMs
}
