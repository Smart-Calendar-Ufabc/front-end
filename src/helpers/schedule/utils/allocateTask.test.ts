import { beforeAll, describe, expect, it } from '@jest/globals'
import { advanceTo } from 'jest-date-mock'
import { allocateTask } from './allocateTask'

type UnallocatedTask = {
  id: string
  title: string
  notes?: string
  priority: 'low' | 'medium' | 'high'
  duration: string
  deadline: Date
}

type Schedule = {
  id: string
  title: string
  done: boolean
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startAt: Date
  endAt: Date
}

describe('allocateTask', () => {
  beforeAll(() => {
    advanceTo(new Date('2022-01-01T07:00:00'))
  })

  it('should allocate a task if there is a gap between schedules', () => {
    const schedules: Schedule[] = [
      {
        id: '1',
        title: 'Test Schedule',
        priority: 'low',
        done: false,
        startAt: new Date('2022-01-01T08:00:00'),
        endAt: new Date('2022-01-01T09:00:00'),
      },
      {
        id: '2',
        title: 'Test Schedule',
        priority: 'low',
        done: false,
        startAt: new Date('2022-01-01T10:00:00'),
        endAt: new Date('2022-01-01T11:00:00'),
      },
    ]
    const taskToAllocate: UnallocatedTask = {
      id: '1',
      duration: '00:30',
      deadline: new Date('2022-01-01T12:00:00'),
      title: 'Test Task',
      priority: 'low',
    }

    const result = allocateTask(schedules, taskToAllocate, {
      blockedTimes: {
        dates: [],
        intervals: [],
        weekDays: [],
      },
    })

    console.log(result)

    expect(result).not.toBeNull()
    expect(result?.startAt).toEqual(new Date('2022-01-01T09:00:00'))
    expect(result?.endAt).toEqual(new Date('2022-01-01T09:30:00'))
  })

  it('should allocate the task if the generated delivery date respects the deadline', () => {
    const schedules: Schedule[] = [
      {
        id: '1',
        title: 'Test Schedule 1',
        priority: 'low',
        done: false,
        startAt: new Date('2022-01-01T08:00:00'),
        endAt: new Date('2022-01-01T09:00:00'),
      },
      {
        id: '2',
        title: 'Test Schedule 2',
        priority: 'low',
        done: false,
        startAt: new Date('2022-01-01T09:00:00'),
        endAt: new Date('2022-01-01T10:00:00'),
      },
    ]

    const taskToAllocate: UnallocatedTask = {
      id: '1',
      duration: '00:30',
      deadline: new Date('2022-01-01T12:00:00'),
      title: 'Test Task',
      priority: 'low',
    }

    const result = allocateTask(schedules, taskToAllocate, {
      blockedTimes: {
        dates: [],
        intervals: [],
        weekDays: [],
      },
    })

    expect(result).not.toBeNull()
    expect(result?.startAt).toEqual(new Date('2022-01-01T10:00:00'))
    expect(result?.endAt).toEqual(new Date('2022-01-01T10:30:00'))
  })

  it('should throw an error if the task cannot be allocated before the deadline', () => {
    const schedules: Schedule[] = [
      {
        id: '1',
        title: 'Test Schedule',
        priority: 'low',
        done: false,
        endAt: new Date('2022-01-01T09:00:00'),
        startAt: new Date('2022-01-01T08:00:00'),
      },
      {
        id: '2',
        title: 'Test Schedule',
        priority: 'low',
        done: false,
        startAt: new Date('2022-01-01T09:00:00'),
        endAt: new Date('2022-01-01T10:00:00'),
      },
    ]

    const taskToAllocate: UnallocatedTask = {
      id: '1',
      duration: '01:00',
      deadline: new Date('2022-01-01T09:30:00'),
      title: 'Test Task',
      priority: 'low',
    }

    expect(() =>
      allocateTask(schedules, taskToAllocate, {
        blockedTimes: {
          dates: [],
          intervals: [],
          weekDays: [],
        },
      }),
    ).toThrowError(
      'Não há tempo disponível para alocar a tarefa antes do prazo de entrega.',
    )
  })
})
