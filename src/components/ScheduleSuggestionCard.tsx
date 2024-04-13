import { PriorityTag } from '@/components/PriorityTag'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { CaretDown as MenuIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'
import MenuItem from '@mui/material/MenuItem'
import { SxProps, Theme } from '@mui/material/styles'
import { getBrazilianTime } from '@/helpers/date'

interface ScheduleSuggestionCardProps {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startTime: string
  endTime: string
  deadline: Date
  sx?: SxProps<Theme>
  onApprove: (id: string) => void
  onRemove: (id: string) => void
}

export const ScheduleSuggestionCard = ({
  id,
  title,
  priority,
  startTime,
  endTime,
  deadline,
  sx,
  onApprove,
  onRemove,
}: ScheduleSuggestionCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleApprove = () => {
    onApprove(id)
  }

  const handleRemove = () => {
    onRemove(id)
  }

  return (
    <Card
      sx={{
        width: '200px',
        '&.MuiCard-root': {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey.200',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
        ...sx,
      }}
    >
      <Menu
        id={`fade-menu-${id}`}
        MenuListProps={{
          'aria-labelledby': `fade-button-${id}`,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 36, vertical: 24 }}
      >
        <MenuItem onClick={handleApprove}>Aprovar</MenuItem>
        <MenuItem onClick={handleRemove}>Remover</MenuItem>
      </Menu>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
          minWidth: 140,
          p: 1,
          height: '100%',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
              }}
            >
              {title}
            </Typography>
            <IconButton
              id={`fade-button-${id}`}
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenMenu}
              sx={{
                color: 'grey.500',
                pr: 0,
                pb: 0,
                pt: 0.25,
              }}
            >
              <MenuIcon size={16} weight="bold" />
            </IconButton>
          </Box>
          <Box
            sx={{
              backgroundColor: 'grey.100',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              mt: 1,
            }}
          >
            <Typography variant="caption">
              <b>Prazo final</b>:<br />
              {new Date(deadline).toLocaleDateString('pt-BR', {
                day: 'numeric',
                year: 'numeric',
                month: 'numeric',
              })}
              {' às ' + getBrazilianTime(deadline)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <PriorityTag variant="little" priority={priority} />
          <Box
            sx={{
              borderTopWidth: '1px',
              borderTopStyle: 'solid',
              borderTopColor: 'divider',
              mt: 1,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                pt: 0.5,
                display: 'block',
                textAlign: 'right',
              }}
            >
              {startTime} - {endTime}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
