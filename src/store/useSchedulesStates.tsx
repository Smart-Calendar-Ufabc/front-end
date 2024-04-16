import { Schedule } from '@/entities/Schedule'
import { create } from 'zustand'

interface Routine {
  title: string
  startAt: Date
  endAt: Date
}

interface AppStates {
  schedules: Schedule[]
  setSchedules: (schedules: Schedule[]) => void
  addSchedule: (schedule: Omit<Schedule, 'done'> & { done?: boolean }) => void
  deleteSchedule: (id: string) => void
  addRoutine: (routine: Routine) => void
}

export const useSchedulesStates = create<AppStates>()((set) => ({
  schedules: [],
  setSchedules: (schedules) => {
    set(() => ({
      schedules,
    }))
  },
  addSchedule: (tag) => {
    set((state) => ({
      schedules: [...state.schedules, { ...tag, done: false }],
    }))
  },
  deleteSchedule: (id) => {
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== id),
    }))
  },
  addRoutine: (routine) => {
    set((state) => ({
      schedules: [
        ...state.schedules,
        {
          id: crypto.randomUUID(),
          title: routine.title,
          status: 'pending',
          priority: 'routine',
          startAt: routine.startAt,
          endAt: routine.endAt,
        },
      ],
    }))
  },
}))
