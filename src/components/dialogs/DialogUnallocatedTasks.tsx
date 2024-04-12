import { useCallback, useEffect, useState } from 'react'
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
import { createScheduleSuggestion } from '@/helpers/schedule-sugestion/createScheduleSuggestion'
import { Schedule } from '@/entities/Schedule'
import Mobile from '../layout/responsive/Mobile'
import MobileUp from '../layout/responsive/MobileUp'
import { DialogSuggestionSchedule } from './DialogSuggestionSchedule'

interface DialogUnallocatedTasksProps {
  open: boolean
  onClose: () => void
}

export function DialogUnallocatedTasks({
  open,
  onClose,
}: DialogUnallocatedTasksProps) {
  const [openSuggestionSchedule, setOpenSuggestionSchedule] = useState(false)
  const [schedulesSuggestion, setSchedulesSuggestion] = useState<Schedule[]>([])
  const {
    unallocatedTasks,
    countUnallocatedTasks,
    setUnallocatedTasks,
    clearUnallocatedTasks,
  } = useUnallocatedTaskStates()
  const { schedules } = useSchedulesStates()

  const handleGenerateScheduleSuggestion = useCallback(() => {
    onClose()
    const data = createScheduleSuggestion(unallocatedTasks, schedules)
    if (data) {
      setSchedulesSuggestion(data)
    }
    setOpenSuggestionSchedule(true)
  }, [unallocatedTasks, schedules, setSchedulesSuggestion, onClose])

  useEffect(() => {
    setUnallocatedTasks(initialUnallocatedTasks)
  }, [setUnallocatedTasks])

  return (
    <>
      <DialogSuggestionSchedule
        open={openSuggestionSchedule}
        onClose={() => setOpenSuggestionSchedule(false)}
        schedulesSuggestions={schedulesSuggestion}
        onApprove={clearUnallocatedTasks}
      />
      <Dialog
        open={open}
        onClose={onClose}
        sx={(theme) => ({
          '& .MuiDialog-paper': {
            width: '80%',
            maxWidth: 820,
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
            <Box display="grid">
              <Mobile>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    '&.MuiStack-root': {
                      pr: 3,
                    },
                  }}
                >
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
              </Mobile>
              <MobileUp>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    '&.MuiStack-root': {
                      pr: 3,
                    },
                  }}
                >
                  {unallocatedTasks.map((task) => (
                    <UnallocatedTaskCard
                      key={task.id}
                      id={task.id}
                      duration={task.duration}
                      priority={task.priority}
                      title={task.title}
                    />
                  ))}
                </Box>
              </MobileUp>
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
              onClick={handleGenerateScheduleSuggestion}
              sx={{
                py: '10px',
              }}
            >
              Alocar Tarefas no Calendário
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}
