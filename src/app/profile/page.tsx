import SettingsLayout from '@/components/layout/SettingsLayout'
import SettingsMain from './component'

export const runtime = 'edge'

export default function Settings() {
  return (
    <SettingsLayout>
      <SettingsMain />
    </SettingsLayout>
  )
}
