import { UnallocatedTask } from '@/entities/UnallocatedTask'

export const unallocatedTasks: UnallocatedTask[] = [
  {
    id: 'e6786a2e-fec8-4472-8a26-fb623e633f8e',
    title: 'Task 1',
    priority: 'high',
    duration: '01:00',
    deadline: new Date('2024-04-19T09:00:00.000Z'),
  },
  {
    id: '67985943-c969-456e-bb43-301d4d421018',
    title: 'Task 2',
    priority: 'low',
    duration: '02:00',
    deadline: new Date('2024-04-22T09:00:00.000Z'),
  },
]
