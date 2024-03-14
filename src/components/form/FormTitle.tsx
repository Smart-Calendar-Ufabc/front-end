import { Typography } from '@mui/material'

interface FormTitleProps {
  children: React.ReactNode
  component?: React.ElementType
}

export default function FormTitle({ children, component }: FormTitleProps) {
  return (
    <Typography component={component || 'h1'} variant="h4">
      {children}
    </Typography>
  )
}
