'use client'

import OnboardingLayout from '@/components/layout/OnboardingLayout'
import FormLogin from './component'
import { redirect } from 'next/navigation'
import { useAppStates } from '@/store/useAppStates'

export default function Login() {
  const { setAuthToken } = useAppStates()

  const authToken =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('authToken')
      : null

  if (authToken) {
    setAuthToken(authToken)
    redirect('/home')
  }

  return (
    <OnboardingLayout>
      <FormLogin />
    </OnboardingLayout>
  )
}
