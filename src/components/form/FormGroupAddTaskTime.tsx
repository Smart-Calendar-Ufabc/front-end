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
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '12px',
        gap: '16px',
        width: '452px',
        height: '81px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
