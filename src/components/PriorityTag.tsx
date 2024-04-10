import Typography from '@mui/material/Typography'
import { Circle as CircleIcon } from '@phosphor-icons/react'

interface PriorityTagProps {
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  variant: 'little' | 'medium' | 'big'
}

export const PriorityTag = ({ priority, variant }: PriorityTagProps) => {
  return (
    <Typography
      variant="caption"
      sx={(theme) => ({
        backgroundColor: theme.tags.backgroundColor[priority],
        color: theme.tags.text[priority],
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.25,
        ...getBoxStyle(variant),
      })}
    >
      <CircleIcon weight="fill" />
      {getLabel(priority)}
    </Typography>
  )
}

const getLabel = (
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event',
) => {
  switch (priority) {
    case 'high':
      return 'Alta'
    case 'medium':
      return 'Media'
    case 'low':
      return 'Baixa'
    case 'routine':
      return 'Rotina'
    case 'event':
      return 'Evento'
  }
}

const getBoxStyle = (variant: 'little' | 'medium' | 'big') => {
  switch (variant) {
    case 'little':
      return {
        borderRadius: '16px',
        fontSize: '0.75rem', // 12px
        px: '4px',
      }
    case 'medium':
      return {
        borderRadius: '16px',
        fontSize: '0.875rem', // 14px
        px: '6px',
      }
    case 'big':
      return {
        borderRadius: '16px',
        px: '8px',
        py: '4px',
        fontSize: '1rem', // 16px
      }
  }
}
