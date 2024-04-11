import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface Props {
  children?: React.ReactNode
}

const Tablet = ({ children }: Props) => {
  const theme = useTheme()

  const upSmall = useMediaQuery(theme.breakpoints.up('sm'))
  const downMedium = useMediaQuery(theme.breakpoints.down('md'))

  const matches = upSmall && downMedium

  return matches ? <>{children}</> : null
}

export default Tablet
