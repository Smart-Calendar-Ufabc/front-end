import OnboardingLayout from '@/components/layout/OnboardingLayout'
import FormLogin from './component'
import { useProfileStates } from '@/store/useProfileStates'
import { profile } from '@/seed/profile'

export const runtime = 'edge'

export default function Login() {
  const { setProfile } = useProfileStates.getState()
  setProfile(profile)

  return (
    <OnboardingLayout>
      <FormLogin />
    </OnboardingLayout>
  )
}
