import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import Typography from '@mui/material/Typography'
import UnallocatedTaskCard from '../UnallocatedTaskCard'
import Stack from '@mui/material/Stack'
import { unallocatedTasks as initialUnallocatedTasks } from '@/seed/unallocatedTasks'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import Box from '@mui/material/Box'

import './styles.css'

interface DialogUnallocatedTasksProps {
  open: boolean
  onClose: () => void
}

export function DialogUnallocatedTasks({
  open,
  onClose,
}: DialogUnallocatedTasksProps) {
  const {
    unallocatedTasks,
    countUnallocatedTasks,
    setUnallocatedTasks,
    deleteUnallocatedTask,
  } = useUnallocatedTaskStates()
  const { addSchedule } = useSchedulesStates()

  useEffect(() => {
    setUnallocatedTasks(initialUnallocatedTasks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddToSchedules = () => {
    unallocatedTasks.forEach((task) => {
      addSchedule({
        id: crypto.randomUUID(),
        title: task.title,
        priority: task.priority,
        endTime: '10:00',
        startDate: '2024-04-12',
        startTime: '09:00',
      })

      deleteUnallocatedTask(task.id)
    })

    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={(theme) => ({
        '& .MuiDialog-paper': {
          minWidth: 500,
          [theme.breakpoints.down('sm')]: {
            minWidth: '85%',
            maxWidth: '85%',
          },
        },
      })}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Tarefas Não Alocadas
        {countUnallocatedTasks ? `:  ${countUnallocatedTasks}` : ''}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Divider />
      <DialogContent>
        {unallocatedTasks.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Não há tarefas para serem alocadas.
          </Typography>
        ) : (
          <Box
            display="grid"
            className="custom-scrollbar"
            sx={{
              overflowX: 'auto',
            }}
          >
            <Stack direction="row" spacing={2}>
              {unallocatedTasks.map((task) => (
                <UnallocatedTaskCard
                  key={task.id}
                  id={task.id}
                  duration={task.duration}
                  priority={task.priority}
                  title={task.title}
                />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
      {unallocatedTasks.length > 0 && (
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToSchedules}
            sx={{
              py: '10px',
            }}
          >
            Alocar Tarefas no Calendário
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
