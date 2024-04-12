import { Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { SystemStyleObject } from '@mui/system/styleFunctionSx'

interface TagProps {
  minWidth?: number
  children: React.ReactNode
  sx?: SystemStyleObject<Theme>
}

export function FormHelperTag({ children, minWidth, sx }: TagProps) {
  return (
    <Typography variant="caption" sx={[style.tag, { minWidth }, { ...sx }]}>
      {children}
    </Typography>
  )
}

const style = {
  tag: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[700],
    borderRadius: 2,
    py: 0.25,
    px: 0.75,
    width: 'fit-content',
  }),
}
