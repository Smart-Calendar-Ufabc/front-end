import HomeLayout from '@/components/layout/home/HomeLayout'
import HomeMain from './main'

export const runtime = 'edge'

export default function Settings() {
  return (
    <HomeLayout>
      <HomeMain />
    </HomeLayout>
  )
}
