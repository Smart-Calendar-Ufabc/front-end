import { Profile } from '@/entities/Profile'
import { create } from 'zustand'

interface AppStates {
  profile: Profile | null
  setProfile: (profile: Profile) => void
}

export const useProfileStates = create<AppStates>()((set) => ({
  profile: null,
  setProfile: (profile) => {
    set(() => ({
      profile,
    }))
  },
}))
