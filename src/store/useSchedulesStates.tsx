import { Schedule } from '@/entities/Schedule'
import { create } from 'zustand'

interface AppStates {
  schedules: Schedule[]
  setSchedules: (schedules: Schedule[]) => void
  addSchedule: (schedule: Omit<Schedule, 'done'> & { done?: boolean }) => void
  deleteSchedule: (id: string) => void
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
}))
