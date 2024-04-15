'use client'

import OnboardingLayout from '@/components/layout/OnboardingLayout'
import PageUnderConstruction from '@/components/PageUnderConstructionAlert'
import { useAppStates } from '@/store/useAppStates'
import { redirect } from 'next/navigation'

export default function PasswordRecovery() {
  const authToken = useAppStates.getState().authToken

  if (authToken) {
    redirect('/home')
  }

  return (
    <OnboardingLayout>
      <PageUnderConstruction title="Recuperar Conta" />
    </OnboardingLayout>
  )
}
