import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { create } from 'zustand'

interface AppStates {
  unallocatedTasks: UnallocatedTask[]
  addUnallocatedTask: (unallocatedTasks: UnallocatedTask) => void
}

export const useUnallocatedTaskStates = create<AppStates>()((set) => ({
  unallocatedTasks: [],
  addUnallocatedTask: (unallocatedTasks) => {
    set((state) => ({
      unallocatedTasks: [...state.unallocatedTasks, unallocatedTasks],
    }))
  },
}))
