import { CalendarSchedule } from '@/entities/CalendarSchedule'

export const initialSchedules: {
  [startDate: string]: CalendarSchedule[]
} = {
  '2024-04-10': [
    {
      id: 'e6786a2e-fec8-4472-8a26-fb623e633f8e',
      done: false,
      priority: 'high',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: '67985943-c969-456e-bb43-301d4d421018',
      done: false,
      priority: 'low',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: '8c16a17a-6503-42c8-a36a-cc649836a2bd',
      done: true,
      priority: 'high',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
  '2024-04-11': [
    {
      id: '93d7ee4c-770d-4734-a69f-ba6512d835ef',
      done: false,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: '329b4011-3f78-458a-a8c5-9a60f7db8255',
      done: true,
      priority: 'low',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: '2dd9169e-a383-45d9-ae1b-38232da0ea2f',
      done: false,
      priority: 'low',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
  '2024-04-12': [
    {
      id: '70283f27-07cb-4cb9-a2ac-d31a90e265b1',
      done: false,
      priority: 'high',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: '86e71a20-cf69-4fca-bbd2-6df84bddb714',
      done: true,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: '91775f48-60ff-41b9-abad-2edbba5a1352',
      done: false,
      priority: 'low',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
  '2024-04-13': [
    {
      id: '90dc170a-321a-449f-a00d-6f84dab2ccd5',
      done: false,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: '33abeb36-b7dd-4397-9ace-c2144f3e3dc5',
      done: false,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: 'd99ac027-54ca-44fa-9a86-0ea521f2d508',
      done: true,
      priority: 'high',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
  '2024-04-14': [
    {
      id: '36176366-4106-47ff-a0f0-92f9432626b0',
      done: true,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: '8aca4515-b83e-4d69-8bc3-06d709930222',
      done: false,
      priority: 'high',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: '614c94e2-f8d5-4a46-a6e6-6d1509ff5971',
      done: false,
      priority: 'low',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
  '2024-04-15': [
    {
      id: '0a4c541f-5250-4456-bfb1-50e33d61691e',
      done: true,
      priority: 'low',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: 'fae64e2d-82e3-4393-94cb-d46270a9039d',
      done: false,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: 'e90c4559-3bf2-419e-8b50-90450d7f080d',
      done: false,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
  '2024-04-16': [
    {
      id: 'bf53a8df-1218-4094-8a65-8eeee9074626',
      done: true,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 1',
    },
    {
      id: 'fb9c5ab0-68e6-4bef-96f3-80bde7564eec',
      done: false,
      priority: 'high',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 2',
    },
    {
      id: 'e9fa5a8d-1598-406f-b4ce-ca75c4bdb6fa',
      done: true,
      priority: 'medium',
      startTime: '09:00',
      endTime: '10:00',
      title: 'Task 3',
    },
  ],
}
