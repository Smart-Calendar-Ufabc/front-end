import SettingsLayout from '@/components/layout/SettingsLayout'
import SettingsMain from './main'

export const runtime = 'edge'

export default function Settings() {
  return (
    <SettingsLayout>
      <SettingsMain />
    </SettingsLayout>
  )
}
