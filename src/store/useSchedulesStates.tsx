import { Schedule } from '@/entities/Schedule'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  changeCompleted: (id: string) => void
}

export const useSchedulesStates = create<AppStates>()(
  persist(
    (set) => ({
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
      changeCompleted: (id) => {
        set((state) => {
          const schedules = state.schedules.map((schedule) => {
            if (schedule.id === id) {
              const newStatus = schedule.status === 'done' ? 'pending' : 'done'
              return {
                ...schedule,
                status: newStatus as Schedule['status'],
              }
            }

            return schedule
          })

          return { schedules }
        })
      },
    }),
    {
      name: 'easeCalendarSchedulesStates',
      getStorage: () => localStorage,
    },
  ),
)
