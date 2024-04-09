import { Routine } from '@/entities/Routine'
import { create } from 'zustand'

interface AppStates {
  routine: Routine[]
  addRoutine: (routine: Routine) => void
}

export const useRoutineStates = create<AppStates>()((set) => ({
  routine: [],
  addRoutine: (routine) => {
    set((state) => ({
      routine: [...state.routine, routine],
    }))
  },
}))
