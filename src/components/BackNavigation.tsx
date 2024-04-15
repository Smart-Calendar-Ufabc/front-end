import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CaretLeft as ArrowBackIcon } from '@phosphor-icons/react'
import { Link } from '@mui/material'

interface BackNavigationProps {
  to: string
  title?: string
}

const BackNavigation = ({ to, title }: BackNavigationProps) => {
  return (
    <Box
      ml="-2px"
      sx={{
        mb: 2,
      }}
    >
      <Link
        href={to}
        sx={(theme) => ({
          color: theme.palette.grey['600'],
          '&:hover': {
            color: theme.palette.primary.main,
          },
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mx: 0,
          px: 0,
          cursor: 'pointer',
          width: '100%',
          [theme.breakpoints.down('md')]: {
            width: '100%',
            px: 0,
          },
          [theme.breakpoints.down('sm')]: {
            px: 0,
          },
        })}
      >
        <ArrowBackIcon />
        <Typography
          sx={{
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {title || 'Voltar'}
        </Typography>
      </Link>
    </Box>
  )
}

export default BackNavigation
