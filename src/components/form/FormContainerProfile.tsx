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
        marginLeft: '219',
        marginTop: '110',
        flexDirection: 'column',
        alignContent: 'center',
        gap: '24px',
        width: '400px',
        height: '324px',
        alignItems: 'stretch',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}