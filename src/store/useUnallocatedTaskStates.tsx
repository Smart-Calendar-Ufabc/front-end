import { UnallocatedTask } from '@/entities/UnallocatedTask'
import { create } from 'zustand'

interface AppStates {
  unallocatedTasks: UnallocatedTask[]
  countUnallocatedTasks: number
  unallocatedTasksInSuggestion: (UnallocatedTask & {
    reason: { key: 'deadline-exceeded'; message: string }
  })[]
  setUnallocatedTasks: (unallocatedTasks: UnallocatedTask[]) => void
  addUnallocatedTask: (unallocatedTasks: UnallocatedTask) => void
  deleteUnallocatedTask: (id: string) => void
  clearUnallocatedTasks: () => void
  addUnallocatedTaskInSuggestion: (
    task: UnallocatedTask,
    reason: { key: 'deadline-exceeded'; message: string },
  ) => void
}

export const useUnallocatedTaskStates = create<AppStates>()((set) => ({
  unallocatedTasks: [],
  countUnallocatedTasks: 0,
  unallocatedTasksInSuggestion: [],
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
  clearUnallocatedTasks: () => {
    set(() => ({
      unallocatedTasks: [],
      countUnallocatedTasks: 0,
    }))
  },
  addUnallocatedTaskInSuggestion: (task, reason) => {
    set((state) => ({
      unallocatedTasksInSuggestion: [
        ...state.unallocatedTasksInSuggestion,
        {
          ...task,
          reason,
        },
      ],
    }))
  },
}))
