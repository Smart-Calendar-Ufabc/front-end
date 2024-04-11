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
import { ScheduleSuggestionCard } from '../ScheduleSuggestionCard'
import { getBrazilianDate } from '@/helpers/date/getBrazilianDate'

interface DialogUnallocatedTasksProps {
  open: boolean
  onClose: () => void
}

export function DialogUnallocatedTasks({
  open,
  onClose,
}: DialogUnallocatedTasksProps) {
  const [list, setList] = useState<Record<string, Schedule[]>>({})
  const [openSuggestionSchedule, setOpenSuggestionSchedule] = useState(false)
  const [schedulesSuggestion, setSchedulesSuggestion] = useState<Schedule[]>([])
  const {
    unallocatedTasks,
    countUnallocatedTasks,
    setUnallocatedTasks,
    clearUnallocatedTasks,
  } = useUnallocatedTaskStates()
  const { schedules, addSchedule } = useSchedulesStates()

  const handleGenerateScheduleSuggestion = useCallback(() => {
    onClose()
    const data = createScheduleSuggestion(unallocatedTasks, schedules)
    if (data) {
      setSchedulesSuggestion(data)
    }
    setOpenSuggestionSchedule(true)
  }, [unallocatedTasks, schedules, setSchedulesSuggestion, onClose])

  const handleAddToSchedules = useCallback(() => {
    schedulesSuggestion.forEach((schedule) => {
      addSchedule(schedule)
      clearUnallocatedTasks()
    })
    setOpenSuggestionSchedule(false)
  }, [schedulesSuggestion, addSchedule, clearUnallocatedTasks])

  useEffect(() => {
    setUnallocatedTasks(initialUnallocatedTasks)
  }, [setUnallocatedTasks])

  useEffect(() => {
    setList(
      schedulesSuggestion.reduce(
        (grouped, schedule) => {
          const key = schedule.startAt.toISOString().split('T')[0]
          if (!grouped[key]) {
            grouped[key] = []
          }
          grouped[key].push(schedule)
          return grouped
        },
        {} as Record<string, Schedule[]>,
      ),
    )
  }, [schedulesSuggestion])

  return (
    <>
      <Dialog
        open={openSuggestionSchedule}
        onClose={() => setOpenSuggestionSchedule(false)}
        sx={(theme) => ({
          '& .MuiDialog-paper': {
            width: 500,
            [theme.breakpoints.down('sm')]: {
              minWidth: '85%',
              maxWidth: '85%',
            },
          },
        })}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>Revisar Agendamento</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenSuggestionSchedule(false)}
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
          <Box
            display="grid"
            className="custom-scrollbar"
            sx={{
              overflowX: 'auto',
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              {Object.entries(list).map(([startDate, schedules]) => (
                <Box key={startDate}>
                  <Typography mb={1}>
                    {getBrazilianDate(new Date(startDate))}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {schedules.map((task) => (
                      <ScheduleSuggestionCard
                        key={task.id}
                        title={task.title}
                        priority={task.priority}
                        startTime={`${task.startAt.getUTCHours().toString().padStart(2, '0').toString().padStart(2, '0')}:${task.startAt.getUTCMinutes().toString().padStart(2, '0')}`}
                        endTime={`${task.endAt.getUTCHours().toString().padStart(2, '0')}:${task.endAt.getUTCMinutes().toString().padStart(2, '0')}`}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </DialogContent>
        {schedulesSuggestion.length > 0 && (
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
              Aprovar Agendamento
            </Button>
          </DialogActions>
        )}
      </Dialog>
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
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  overflowX: 'auto',
                },
              })}
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
