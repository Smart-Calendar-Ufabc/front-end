import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface LinkProps {
  to: string
  children: React.ReactNode
}

export default function Link({ to, children }: LinkProps) {
  const router = useRouter()

  const handleNavigate = (url: string) => {
    router.push(url)
  }

  return (
    <Typography
      component="a"
      href={to}
      onClick={(e) => {
        e.preventDefault()
        handleNavigate(to)
      }}
      variant="body1"
      sx={{
        fontWeight: 'bold',
        color: 'primary.main',
        '&:hover': {
          color: 'primary.light',
        },
      }}
    >
      {children}
    </Typography>
  )
}
