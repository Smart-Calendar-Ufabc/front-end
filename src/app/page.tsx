import OnboardingLayout from '@/components/layout/OnboardingLayout'
import FormLogin from './component'

export const runtime = 'edge'

export default function Login() {
  return (
    <OnboardingLayout>
      <FormLogin />
    </OnboardingLayout>
  )
}
