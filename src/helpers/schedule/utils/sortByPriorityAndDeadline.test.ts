import { describe, expect, it } from '@jest/globals'
import { UnallocatedTask } from '../entities/UnallocatedTask'
import { sortByPriorityAndDeadline } from './sortByPriorityAndDeadline'

describe('sortByPriorityAndDeadline', () => {
  it('should sort tasks by priority and deadline', () => {
    const tasks: UnallocatedTask[] = [
      {
        id: '1',
        title: 'Test Task 1',
        duration: '01:00',
        priority: 'medium',
        deadline: new Date('2022-01-01T10:00:00'),
      },
      {
        id: '2',
        title: 'Test Task 2',
        duration: '01:00',
        priority: 'high',
        deadline: new Date('2022-01-01T09:00:00'),
      },
      {
        id: '3',
        title: 'Test Task 3',
        duration: '01:00',
        priority: 'medium',
        deadline: new Date('2022-01-01T09:00:00'),
      },
    ]

    const result = sortByPriorityAndDeadline(tasks)

    expect(result).toEqual([
      {
        id: '2',
        title: 'Test Task 2',
        duration: '01:00',
        priority: 'high',
        deadline: new Date('2022-01-01T09:00:00'),
      },
      {
        id: '3',
        title: 'Test Task 3',
        duration: '01:00',
        priority: 'medium',
        deadline: new Date('2022-01-01T09:00:00'),
      },
      {
        id: '1',
        title: 'Test Task 1',
        duration: '01:00',
        priority: 'medium',
        deadline: new Date('2022-01-01T10:00:00'),
      },
    ])
  })

  it('should leave tasks with the same priority and deadline in their original order', () => {
    const tasks: UnallocatedTask[] = [
      {
        id: '1',
        title: 'Test Task 1',
        duration: '01:00',
        priority: 'high',
        deadline: new Date('2022-01-01T09:00:00'),
      },
      {
        id: '3',
        title: 'Test Task 3',
        duration: '01:00',
        priority: 'high',
        deadline: new Date('2022-01-01T09:00:00'),
      },
    ]

    const result = sortByPriorityAndDeadline(tasks)

    expect(result).toEqual(tasks)
  })
})
