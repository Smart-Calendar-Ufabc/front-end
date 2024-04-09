import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.grey[700],
  },
}))
