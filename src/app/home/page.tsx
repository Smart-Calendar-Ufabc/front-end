import HomeLayout from '@/components/layout/home/HomeLayout'
import HomeMain from './component'

export const runtime = 'edge'

export default function Settings() {
  return (
    <HomeLayout>
      <HomeMain />
    </HomeLayout>
  )
}
