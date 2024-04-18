import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStates {
  onboarding: {
    email: string
    completed?: boolean
  }
  setOnboarding: (data: { email?: string; completed?: boolean }) => void
  authToken: string | null
  setAuthToken: (authToken: string | null) => void
}

export const useAppStates = create<AppStates>()(
  persist(
    (set) => ({
      authToken: '',
      setAuthToken: (authToken) =>
        set({
          authToken,
        }),
      onboarding: {
        email: '',
      },
      setOnboarding: (data) =>
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            ...data,
          },
        })),
    }),
    {
      name: 'easeCalendarAppStates',
      getStorage: () => localStorage,
    },
  ),
)
