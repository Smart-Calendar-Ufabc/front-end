import { PriorityTag } from '@/components/PriorityTag'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { CaretDown as MenuIcon } from '@phosphor-icons/react'
import { DialogEditRoutine } from './dialogs/DialogEditRoutine'
import { DialogEditTask } from './dialogs/DialogEditTask'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import AlertDialog from './dialogs/AlertDialog'

interface ScheduleCardProps {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  done: boolean
  startTime: string
  endTime: string
}

export const ScheduleCard = ({
  id,
  title,
  done,
  priority,
  startTime,
  endTime,
}: ScheduleCardProps) => {
  const [openEditRoutineDialog, setOpenEditRoutineDialog] = useState(false)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [completed, setCompleted] = useState(done)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { deleteSchedule } = useSchedulesStates()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenEdit = () => {
    switch (priority) {
      case 'routine': {
        setOpenEditRoutineDialog(true)
        break
      }
      default: {
        setOpenEditTaskDialog(true)
        break
      }
    }

    handleClose()
  }

  const handleOpenDeleteModal = () => {
    setOpenDeleteDialog(true)
    handleClose()
  }

  const handleDelete = () => {
    deleteSchedule(id)
    handleClose()
  }

  return (
    <Card
      sx={{
        opacity: completed ? 0.6 : 1,
        '&.MuiCard-root': {
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <AlertDialog
        open={openDeleteDialog}
        title="Deseja realmente excluir este agendamento?"
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
      <DialogEditRoutine
        open={openEditRoutineDialog}
        onClose={() => setOpenEditRoutineDialog(false)}
      />
      <DialogEditTask
        open={openEditTaskDialog}
        onClose={() => setOpenEditTaskDialog(false)}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        <MenuItem onClick={handleOpenEdit}>Editar</MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>Excluir</MenuItem>
      </Menu>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
          minWidth: 140,
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
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
          <Checkbox
            checked={completed}
            onChange={() => setCompleted(!completed)}
            sx={{
              '&.MuiCheckbox-root': {
                p: 0,
                color: 'grey.200',
              },
              '&.Mui-checked': {
                color: 'primary.light',
              },
            }}
          />
        </Box>
        <PriorityTag variant="little" priority={priority} />
        <Box
          sx={{
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'divider',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
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
              {startTime} - {endTime}
            </Typography>
            <IconButton
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
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
        </Box>
      </Box>
    </Card>
  )
}

function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox
      disableRipple
      color="primary"
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  )
}
