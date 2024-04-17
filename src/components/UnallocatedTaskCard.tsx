import { PriorityTag } from '@/components/PriorityTag'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useCallback, useState } from 'react'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { CaretDown as MenuIcon } from '@phosphor-icons/react'
import { DialogEditRoutine } from './dialogs/DialogEditRoutine'
import { DialogEditTask } from './dialogs/DialogEditTask'
import AlertDialog from './dialogs/AlertDialog'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { createScheduleSuggestion } from '@/helpers/schedule/createScheduleSuggestion'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import { DialogSuggestionSchedule } from './dialogs/DialogSuggestionSchedule'
import { useSchedulesSuggestionsStates } from '@/store/useSchedulesSuggestionStates'
import { useProfileStates } from '@/store/useProfileStates'

interface UnallocatedTaskCardProps {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  duration: string
}

export default function UnallocatedTaskCard({
  id,
  title,
  priority,
  duration,
}: UnallocatedTaskCardProps) {
  const [openEditRoutineDialog, setOpenEditRoutineDialog] = useState(false)
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openSuggestionSchedule, setOpenSuggestionSchedule] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { schedules } = useSchedulesStates()
  const { setSchedulesSuggestions } = useSchedulesSuggestionsStates()
  const { unallocatedTasks, deleteUnallocatedTask } = useUnallocatedTaskStates()
  const { profile } = useProfileStates()

  const getBrazilianDuration = () => {
    const hour = duration.split(':')[0].replace(/^0/, '')
    const minutes = duration.split(':')[1].replace(/^0/, '')
    return `${hour ? hour + ' horas ' : ''}${hour && minutes ? ' e ' : ''}${minutes ? minutes + ' minutos' : ''}`
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleOpenEdit = () => {
  //   switch (priority) {
  //     case 'routine': {
  //       setOpenEditRoutineDialog(true)
  //       break
  //     }
  //     default: {
  //       setOpenEditTaskDialog(true)
  //       break
  //     }
  //   }

  //   handleClose()
  // }

  const handleOpenDeleteModal = () => {
    setOpenDeleteDialog(true)
    handleClose()
  }

  const handleDelete = () => {
    deleteUnallocatedTask(id)
    handleClose()
  }

  const handleOpenAllocateSuggestions = () => {
    handleClose()
    handleAllocate()
  }

  const handleAllocate = useCallback(() => {
    const thisUnallocatedTask = unallocatedTasks.find((task) => task.id === id)
    const data = createScheduleSuggestion(
      thisUnallocatedTask ? [thisUnallocatedTask] : [],
      schedules,
      {
        dates: [],
        intervals: profile?.sleepHours ? [profile?.sleepHours] : [],
        weekDays: [],
      },
    )
    if (data) {
      setSchedulesSuggestions(data)
    }
    setOpenSuggestionSchedule(true)
  }, [id, unallocatedTasks, schedules, setSchedulesSuggestions, profile])

  return (
    <Card
      sx={{
        width: 180,
        minHeight: 140,
        '&.MuiCard-root': {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey.200',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <AlertDialog
        open={openDeleteDialog}
        title="Deseja realmente excluir esta tarefa?"
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
      <DialogSuggestionSchedule
        open={openSuggestionSchedule}
        onClose={() => setOpenSuggestionSchedule(false)}
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
        <MenuItem onClick={handleOpenAllocateSuggestions}>Alocar</MenuItem>
        {/* <MenuItem onClick={handleOpenEdit}>Editar</MenuItem> */}
        <MenuItem onClick={handleOpenDeleteModal}>Excluir</MenuItem>
      </Menu>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
          minWidth: 140,
          height: '100%',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 1,
            width: '100%',
            height: '100%',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3, // Change this number to the maximum number of lines you want
              whiteSpace: 'normal',
            }}
          >
            {title}
          </Typography>
          <IconButton
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              color: open ? 'primary.main' : 'grey.500',
              pr: 0,
              pb: 0,
              pt: 0.25,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <MenuIcon size={16} weight="bold" />
          </IconButton>
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
