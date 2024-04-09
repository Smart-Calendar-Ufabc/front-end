import { create } from 'zustand'

interface AppStates {
  tags: { id: string; title: string; color: string }[]
  addTag: (tag: { id: string; title: string; color: string }) => void
  deleteTag: (id: string) => void
}

export const useTagStates = create<AppStates>()((set) => ({
  tags: [],
  addTag: (tag) => {
    set((state) => ({
      tags: [...state.tags, tag],
    }))
  },
  deleteTag: (id) => {
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    }))
  },
}))
