import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { create } from 'zustand'

interface AppStates {
  unallocatedTasks: UnallocatedTask[]
  countUnallocatedTasks: number
  setUnallocatedTasks: (unallocatedTasks: UnallocatedTask[]) => void
  addUnallocatedTask: (unallocatedTasks: UnallocatedTask) => void
  deleteUnallocatedTask: (id: string) => void
}

export const useUnallocatedTaskStates = create<AppStates>()((set) => ({
  unallocatedTasks: [],
  countUnallocatedTasks: 0,
  setUnallocatedTasks: (unallocatedTasks) => {
    set(() => ({
      unallocatedTasks,
      countUnallocatedTasks: unallocatedTasks.length,
    }))
  },
  addUnallocatedTask: (unallocatedTasks) => {
    set((state) => ({
      unallocatedTasks: [...state.unallocatedTasks, unallocatedTasks],
      countUnallocatedTasks: state.countUnallocatedTasks + 1,
    }))
  },
  deleteUnallocatedTask: (id) => {
    set((state) => ({
      unallocatedTasks: state.unallocatedTasks.filter((task) => task.id !== id),
      countUnallocatedTasks: state.countUnallocatedTasks - 1,
    }))
  },
}))
