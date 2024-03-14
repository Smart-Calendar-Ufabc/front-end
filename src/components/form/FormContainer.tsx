import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import { SystemStyleObject } from '@mui/system/styleFunctionSx'

export default function FormContainer({
  children,
  sx,
}: {
  children: React.ReactNode
  sx?: SystemStyleObject<Theme>
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '300px',
        alignItems: 'stretch',
        margin: '0 auto',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
