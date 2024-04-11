import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { create } from 'zustand'

interface AppStates {
  unallocatedTasks: UnallocatedTask[]
  setUnallocatedTasks: (unallocatedTasks: UnallocatedTask[]) => void
  addUnallocatedTask: (unallocatedTasks: UnallocatedTask) => void
  deleteUnallocatedTask: (id: string) => void
}

export const useUnallocatedTaskStates = create<AppStates>()((set) => ({
  unallocatedTasks: [],
  setUnallocatedTasks: (unallocatedTasks) => {
    set(() => ({
      unallocatedTasks,
    }))
  },
  addUnallocatedTask: (unallocatedTasks) => {
    set((state) => ({
      unallocatedTasks: [...state.unallocatedTasks, unallocatedTasks],
    }))
  },
  deleteUnallocatedTask: (id) => {
    set((state) => ({
      unallocatedTasks: state.unallocatedTasks.filter((task) => task.id !== id),
    }))
  },
}))
