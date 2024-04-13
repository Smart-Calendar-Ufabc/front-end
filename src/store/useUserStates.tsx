import { create } from 'zustand'

interface AppStates {
  authToken: string | null
  setAuthToken: (authToken: string | null) => void
  user: { id: string; name: string }[]
  setUser: (user: { id: string; name: string }[]) => void
  addUser: (user: { id: string; name: string }) => void
  deleteUser: (id: string) => void
}

export const useUserStates = create<AppStates>()((set) => ({
  authToken: null,
  setAuthToken: (authToken) => {
    set(() => ({
      authToken,
    }))
  },
  user: [],
  setUser: (user) => {
    set(() => ({
      user,
    }))
  },
  addUser: (user) => {
    set((state) => ({
      user: [...state.user, user],
    }))
  },
  deleteUser: (id) => {
    set((state) => ({
      user: state.user.filter((user) => user.id !== id),
    }))
  },
}))
