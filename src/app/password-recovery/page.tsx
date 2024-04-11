import OnboardingLayout from '@/components/layout/OnboardingLayout'
import PageUnderConstruction from '@/components/PageUnderConstructionAlert'

export const runtime = 'edge'

export default function PasswordRecovery() {
  return (
    <OnboardingLayout>
      <PageUnderConstruction title="Recuperar Conta" />
    </OnboardingLayout>
  )
}
