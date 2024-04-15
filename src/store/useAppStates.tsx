import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStates {
  onboarding: {
    email: string
    code: string
  }
  setOnboarding: (data: { email?: string; code?: string }) => void
  authToken: string | null
  setAuthToken: (authToken: string | null) => void
}

export const useAppStates = create<AppStates>()(
  persist(
    (set) => ({
      authToken: null,
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
      name: 'app-states',
      getStorage: () => localStorage,
    },
  ),
)
