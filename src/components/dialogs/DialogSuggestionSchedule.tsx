import { getBrazilianDate } from '@/helpers/date/getBrazilianDate'
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

interface DialogSuggestionScheduleProps {
  schedulesSuggestions: Schedule[]
  open: boolean
  onClose: () => void
  onApprove: () => void
  onReschedule?: () => void
}

export function DialogSuggestionSchedule({
  schedulesSuggestions,
  open,
  onClose,
  onApprove,
}: DialogSuggestionScheduleProps) {
  const [list, setList] = useState<Record<string, Schedule[]>>({})
  const { addSchedule } = useSchedulesStates()

  const handleAddToSchedules = useCallback(() => {
    schedulesSuggestions.forEach((schedule) => {
      addSchedule(schedule)
      onApprove()
    })
    onClose()
  }, [schedulesSuggestions, addSchedule, onApprove, onClose])

  const handleRemoveFromSuggestions = useCallback(
    (id: string) => {
      setList((prev) => {
        const newList = { ...prev }
        const key =
          schedulesSuggestions
            .find((schedule) => schedule.id === id)
            ?.startAt.toISOString()
            .split('T')[0] + 'T00:00:00.000Z'

        if (key) {
          newList[key] = newList[key]?.filter((schedule) => schedule.id !== id)
        }

        if (newList[key]?.length === 0) {
          delete newList[key]
        }

        return newList
      })
    },
    [schedulesSuggestions, setList],
  )

  const handleApproveSuggestion = useCallback(
    (id: string) => {
      const schedule = schedulesSuggestions.find(
        (schedule) => schedule.id === id,
      )
      if (schedule) {
        addSchedule(schedule)
        handleRemoveFromSuggestions(id)
      }
    },
    [addSchedule, handleRemoveFromSuggestions, schedulesSuggestions],
  )

  useEffect(() => {
    const newList = schedulesSuggestions.reduce(
      (grouped, schedule) => {
        const key =
          schedule.startAt.toISOString().split('T')[0] + 'T00:00:00.000Z'
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={(theme) => ({
        '& .MuiDialog-paper': {
          width: '80%',
          maxWidth: 500,
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
            {Object.entries(list).length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                Não há sugestões de agendamento.
              </Typography>
            ) : (
              Object.entries(list)
                .sort(
                  ([startDateA], [startDateB]) =>
                    new Date(startDateA).getTime() -
                    new Date(startDateB).getTime(),
                )
                .map(([startDate, schedules]) => (
                  <Box key={startDate} display="grid">
                    <Typography mb={2}>
                      {getBrazilianDate(new Date(schedules[0].startAt))}
                    </Typography>
                    <Box>
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
                          .sort(
                            (a, b) => a.startAt.getTime() - b.startAt.getTime(),
                          )
                          .map((task) => (
                            <ScheduleSuggestionCard
                              key={task.id}
                              id={task.id}
                              title={task.title}
                              priority={task.priority}
                              startTime={`${task.startAt.getUTCHours().toString().padStart(2, '0').toString().padStart(2, '0')}:${task.startAt.getUTCMinutes().toString().padStart(2, '0')}`}
                              endTime={`${task.endAt.getUTCHours().toString().padStart(2, '0')}:${task.endAt.getUTCMinutes().toString().padStart(2, '0')}`}
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
      </DialogContent>
      {Object.entries(list).length > 0 && (
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          {/* {onReschedule && (
            <Button
              variant="outlined"
              fullWidth
              onClick={onReschedule}
              sx={{
                py: '10px',
              }}
              endIcon={<CLockIcon />}
            >
              Reagendar
            </Button>
          )} */}

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
  )
}
