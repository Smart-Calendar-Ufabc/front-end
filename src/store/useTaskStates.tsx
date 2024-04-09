import { Task } from '@/entities/Task'
import { create } from 'zustand'

interface AppStates {
  tasks: Task[]
  addTask: (task: Task) => void
}

export const useTagStates = create<AppStates>()((set) => ({
  tasks: [],
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }))
  },
}))
