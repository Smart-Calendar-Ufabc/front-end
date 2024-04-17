'use client'

import OnboardingLayout from '@/components/layout/OnboardingLayout'
import FormLogin from './component'
import { useRouter } from 'next/navigation'
import { useAppStates } from '@/store/useAppStates'
import { useEffect } from 'react'

export default function Login() {
  const { authToken, setAuthToken } = useAppStates()

  // const authToken =
  //   typeof window !== 'undefined'
  //     ? window.localStorage.getItem('authToken')
  //     : null

  const router = useRouter()

  useEffect(() => {
    if (authToken) {
      setAuthToken(authToken)
      router.push('/home')
    }
  }, [authToken, setAuthToken, router])

  return (
    <OnboardingLayout>
      <FormLogin />
    </OnboardingLayout>
  )
}
