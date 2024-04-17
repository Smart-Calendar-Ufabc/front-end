import { PriorityTag } from '@/components/PriorityTag'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { Info as InfoIcon } from '@phosphor-icons/react'
import { DialogEditRoutine } from './dialogs/DialogEditRoutine'
import { DialogEditTask } from './dialogs/DialogEditTask'
import Popover from '@mui/material/Popover'
import { getBrazilianTime } from '@/helpers/date'

interface UnallocatedTaskInSuggestionCardProps {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  duration: string
  deadline: Date
  reason?: string
}

export default function UnallocatedTaskInSuggestionCard({
  title,
  priority,
  duration,
  deadline,
  reason,
}: UnallocatedTaskInSuggestionCardProps) {
  const [openEditRoutineDialog, setOpenEditRoutineDialog] = useState(false)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [anchorElInfoPopover, setAnchorElInfoPopover] =
    useState<null | HTMLElement>(null)
  const openInfoPopover = Boolean(anchorElInfoPopover)

  const handleOpenInfoPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElInfoPopover(event.currentTarget)
  }

  const handleCloseInfoPopover = () => {
    setAnchorElInfoPopover(null)
  }

  const getBrazilianDuration = () => {
    const hour = duration.split(':')[0].replace(/^0/, '')
    const minutes = duration.split(':')[1].replace(/^0/, '')
    return `${hour}h${minutes}min`
  }

  return (
    <Card
      sx={{
        width: 'auto',
        maxWidth: '200px',
        '&.MuiCard-root': {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey.200',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <DialogEditRoutine
        open={openEditRoutineDialog}
        onClose={() => setOpenEditRoutineDialog(false)}
      />
      <DialogEditTask
        open={openEditTaskDialog}
        onClose={() => setOpenEditTaskDialog(false)}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
          minWidth: 140,
          p: 1,
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
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                whiteSpace: 'normal',
              }}
            >
              {title}
            </Typography>

            <IconButton
              id="fade-button"
              aria-owns={openInfoPopover ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handleOpenInfoPopover}
              onMouseLeave={handleCloseInfoPopover}
              sx={{
                color: openInfoPopover ? 'error.main' : 'grey.500',
                pr: 0,
                pb: 0,
                pt: 0.25,
                '&:hover': {
                  color: 'error.main',
                },
              }}
            >
              <InfoIcon size={16} weight="bold" />
            </IconButton>
            <Popover
              open={openInfoPopover}
              anchorEl={anchorElInfoPopover}
              onClose={handleCloseInfoPopover}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 36, vertical: 24 }}
              sx={{
                pointerEvents: 'none',
              }}
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
            >
              {reason && (
                <Typography
                  sx={{
                    p: 1.5,
                    maxWidth: 200,
                    color: 'text.secondary',
                  }}
                >
                  {reason}
                </Typography>
              )}
            </Popover>
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
              width: '100%',
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1,
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
                {getBrazilianDuration()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
