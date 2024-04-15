'use client'

import OnboardingLayout from '@/components/layout/OnboardingLayout'
import FormLogin from './component'
import { redirect } from 'next/navigation'
import { useAppStates } from '@/store/useAppStates'

export default function Login() {
  const authToken = window.localStorage.getItem('authToken')
  const { setAuthToken } = useAppStates()

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
