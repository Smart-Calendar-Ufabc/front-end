import { describe, expect, it } from '@jest/globals'
import { Schedule } from '../entities/Schedule'
import { isThereGapBetweenSchedules } from './isThereGapBetweenSchedules'

describe('isThereGapBetweenSchedules', () => {
  it('should return true if there is a gap between schedules', () => {
    const previousSchedule: Schedule = {
      id: '1',
      title: 'Test Schedule',
      priority: 'low',
      done: false,
      startAt: new Date('2022-01-01T08:00:00'),
      endAt: new Date('2022-01-01T09:00:00'),
    }
    const nextSchedule: Schedule = {
      id: '2',
      title: 'Test Schedule',
      priority: 'low',
      done: false,
      startAt: new Date('2022-01-01T10:00:00'),
      endAt: new Date('2022-01-01T11:00:00'),
    }
    const newScheduleDuration = 30 // 30 minutes

    const result = isThereGapBetweenSchedules(
      newScheduleDuration,
      previousSchedule,
      nextSchedule,
    )

    expect(result).toBe(true)
  })

  it('should return true if the gap between schedules is exactly the same as the new schedule duration', () => {
    const previousSchedule: Schedule = {
      id: '1',
      title: 'Test Schedule',
      priority: 'low',
      done: false,
      startAt: new Date('2022-01-01T08:00:00'),
      endAt: new Date('2022-01-01T09:00:00'),
    }
    const nextSchedule: Schedule = {
      id: '2',
      title: 'Test Schedule',
      priority: 'low',
      done: false,
      startAt: new Date('2022-01-01T09:30:00'),
      endAt: new Date('2022-01-01T11:00:00'),
    }
    const newScheduleDuration = 30 // 30 minutes

    const result = isThereGapBetweenSchedules(
      newScheduleDuration,
      previousSchedule,
      nextSchedule,
    )

    expect(result).toBe(true)
  })

  it('should return false if there is no gap between schedules', () => {
    const previousSchedule: Schedule = {
      id: '1',
      title: 'Test Schedule',
      priority: 'low',
      done: false,
      startAt: new Date('2022-01-01T08:00:00'),
      endAt: new Date('2022-01-01T09:00:00'),
    }
    const nextSchedule: Schedule = {
      id: '2',
      title: 'Test Schedule',
      priority: 'low',
      done: false,
      startAt: new Date('2022-01-01T09:30:00'),
      endAt: new Date('2022-01-01T11:00:00'),
    }
    const newScheduleDuration = 45 // 45 minutes

    const result = isThereGapBetweenSchedules(
      newScheduleDuration,
      previousSchedule,
      nextSchedule,
    )

    expect(result).toBe(false)
  })
})
