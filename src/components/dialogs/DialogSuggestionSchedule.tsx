import { getBrazilianDate } from '@/helpers/date'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { ScheduleSuggestionCard } from '../ScheduleSuggestionCard'
import Stack from '@mui/material/Stack'
import { X as CloseIcon } from '@phosphor-icons/react'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Schedule } from '@/entities/Schedule'
import { useCallback, useEffect, useState } from 'react'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { useSchedulesSuggestionsStates } from '@/store/useSchedulesSuggestionStates'
import { getDuration } from '@/helpers/schedule/getDuration'
import UnallocatedTaskInSuggestionCard from '../UnallocatedTaskInSuggestionCard'
import { useTour } from '@reactour/tour'

interface DialogSuggestionScheduleProps {
  open: boolean
  onClose: () => void
  onReschedule?: () => void
}

export function DialogSuggestionSchedule({
  open,
  onClose,
}: DialogSuggestionScheduleProps) {
  const [list, setList] = useState<Record<string, Schedule[]>>({})
  const { addSchedule } = useSchedulesStates()
  const { schedulesSuggestions, deleteScheduleSuggestion } =
    useSchedulesSuggestionsStates()
  const { unallocatedTasksInSuggestion, deleteUnallocatedTask } =
    useUnallocatedTaskStates()

  const { setIsOpen, setCurrentStep, currentStep } = useTour()

  const handleAddToSchedules = useCallback(() => {
    schedulesSuggestions.forEach((schedule) => {
      addSchedule(schedule)
      deleteUnallocatedTask(schedule.id)
    })
    setCurrentStep(currentStep + 1)
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedulesSuggestions, addSchedule, deleteUnallocatedTask, onClose])

  const handleRemoveFromSuggestions = useCallback(
    (id: string) => {
      deleteScheduleSuggestion(id)
    },
    [deleteScheduleSuggestion],
  )

  const handleApproveSuggestion = useCallback(
    (id: string) => {
      const schedule = schedulesSuggestions.find(
        (schedule) => schedule.id === id,
      )
      if (schedule) {
        addSchedule(schedule)
        handleRemoveFromSuggestions(id)
        deleteUnallocatedTask(id)
      }
    },
    [
      addSchedule,
      handleRemoveFromSuggestions,
      schedulesSuggestions,
      deleteUnallocatedTask,
    ],
  )

  useEffect(() => {
    const newList = schedulesSuggestions.reduce(
      (grouped, schedule) => {
        const startAt = new Date(schedule.startAt)
        startAt.setUTCHours(0, 0, 0, 0)
        const key = startAt.toISOString()
        if (!grouped[key]) {
          grouped[key] = []
        }
        grouped[key].push(schedule)
        return grouped
      },
      {} as Record<string, Schedule[]>,
    )

    setList(newList)
  }, [schedulesSuggestions])

  useEffect(() => {
    if (currentStep === 3) {
      setIsOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={(theme) => ({
        '& .MuiDialog-paper': {
          width: '90%',
          maxWidth: 800,
          [theme.breakpoints.down('sm')]: {
            minWidth: '100%',
            minHeight: '100%',
            borderRadius: 0,
          },
        },
      })}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Revisar Agendamento</DialogTitle>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Box display="grid">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              {schedulesSuggestions.length === 0 &&
              unallocatedTasksInSuggestion.length === 0 ? (
                <Typography
                  color="text.secondary"
                  sx={{
                    minHeight: 100,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  Nenhum agendamento para exibir.
                </Typography>
              ) : (
                Object.entries(list)
                  .sort(
                    ([startDateA], [startDateB]) =>
                      new Date(startDateA).getTime() -
                      new Date(startDateB).getTime(),
                  )
                  .map(([startDate, schedules]) => (
                    <Box key={startDate}>
                      <Typography mb={2}>
                        {getBrazilianDate(new Date(startDate), { utc: true })}
                      </Typography>
                      <Box
                        display="grid"
                        sx={(theme) => ({
                          maxWidth: '752px',
                          overflowX: 'auto',
                          pb: 2,
                          [theme.breakpoints.down('sm')]: {
                            maxWidth: '100%',
                          },
                        })}
                      >
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
                          {schedules
                            .sort((a, b) => {
                              return (
                                new Date(a.startAt).getTime() -
                                new Date(b.startAt).getTime()
                              )
                            })
                            .map((task) => (
                              <ScheduleSuggestionCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                priority={task.priority}
                                startTime={getDuration(task.startAt, {
                                  utc: true,
                                })}
                                endTime={getDuration(task.endAt, {
                                  utc: true,
                                })}
                                deadline={task.deadline ?? new Date()}
                                onApprove={handleApproveSuggestion}
                                onRemove={handleRemoveFromSuggestions}
                              />
                            ))}
                        </Stack>
                      </Box>
                    </Box>
                  ))
              )}
            </Box>
          </Box>
          {unallocatedTasksInSuggestion.length > 0 && (
            <Box>
              <Box display="grid">
                <Typography variant="subtitle1" mb={2}>
                  Tarefas não alocadas ou removidas da sugestão
                </Typography>
                <Box
                  sx={(theme) => ({
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    gap: 2,
                    '&.MuiStack-root': {
                      pr: 3,
                    },
                    [theme.breakpoints.down('sm')]: {
                      maxWidth: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'stretch',
                    },
                  })}
                >
                  {unallocatedTasksInSuggestion
                    .sort(
                      (a, b) =>
                        new Date(a.deadline).getTime() -
                        new Date(b.deadline).getTime(),
                    )
                    .map((task) => (
                      <UnallocatedTaskInSuggestionCard
                        key={task.id}
                        id={task.id}
                        duration={task.duration}
                        priority={task.priority}
                        title={task.title}
                        deadline={task.deadline}
                        reason={task.reason.message}
                      />
                    ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      {Object.entries(list).length > 0 && (
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button
            className="suggestion-schedule-button"
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
  )
}
