import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStates {
  tags: { id: string; title: string; color: string }[]
  setTags: (tags: { id: string; title: string; color: string }[]) => void
  addTag: (tag: { id: string; title: string; color: string }) => void
  deleteTag: (id: string) => void
}

export const useTagStates = create<AppStates>()(
  persist(
    (set) => ({
      tags: [],
      setTags: (tags) => {
        set(() => ({
          tags,
        }))
      },
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
    }),
    {
      name: 'easeCalendarTagStates',
      getStorage: () => localStorage,
    },
  ),
)
