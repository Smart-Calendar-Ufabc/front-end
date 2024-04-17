import { Profile } from '@/entities/Profile'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStates {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

export const useProfileStates = create<AppStates>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => {
        set(() => ({
          profile,
        }))
      },
    }),
    {
      name: 'easeCalendarProfileStates',
      getStorage: () => localStorage,
    },
  ),
)
