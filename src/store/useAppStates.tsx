import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStates {
  onboarding: {
    email: string
  }
  setOnboarding: (data: { email?: string }) => void
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
        code: '',
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
