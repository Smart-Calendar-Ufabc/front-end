import { Schedule } from '@/entities/Schedule'
import { create } from 'zustand'

interface AppStates {
  schedulesSuggestions: Schedule[]
  setSchedulesSuggestions: (schedules: Schedule[]) => void
  addScheduleSuggestion: (
    schedule: Omit<Schedule, 'done'> & { done?: boolean },
  ) => void
  deleteScheduleSuggestion: (id: string) => void
}

export const useSchedulesSuggestionsStates = create<AppStates>()((set) => ({
  schedulesSuggestions: [],
  setSchedulesSuggestions: (schedulesSuggestions) => {
    set(() => ({
      schedulesSuggestions,
    }))
  },
  addScheduleSuggestion: (tag) => {
    set((state) => ({
      schedulesSuggestions: [
        ...state.schedulesSuggestions,
        { ...tag, done: false },
      ],
    }))
  },
  deleteScheduleSuggestion: (id) => {
    set((state) => ({
      schedulesSuggestions: state.schedulesSuggestions.filter(
        (schedule) => schedule.id !== id,
      ),
    }))
  },
}))
