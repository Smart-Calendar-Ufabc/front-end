import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStates {
  onboarding: {
    email?: string | null
    completed?: boolean
    token?: string | null
    openAlert?: boolean
    alertMessage?: string
  }
  setOnboarding: (data: {
    email?: string | null
    token?: string | null
    openAlert?: boolean
    alertMessage?: string
    completed?: boolean
  }) => void
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
        email: null,
        token: null,
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
