import { create } from 'zustand'

interface AppStates {
  signUp: {
    email: string
  }
  setSignUp: (data: { email: string }) => void
}

export const useAppStates = create<AppStates>()((set) => ({
  signUp: {
    email: 'janedoe@example.com',
  },
  setSignUp: (data) =>
    set({
      signUp: data,
    }),
}))
