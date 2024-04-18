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
import UnallocatedTaskCard from '../UnallocatedTaskCard'
import Stack from '@mui/material/Stack'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import Box from '@mui/material/Box'

import './styles.css'
import { createScheduleSuggestion } from '@/helpers/schedule/createScheduleSuggestion'
import Mobile from '../layout/responsive/Mobile'
import MobileUp from '../layout/responsive/MobileUp'
import { DialogSuggestionSchedule } from './DialogSuggestionSchedule'
import { useSchedulesSuggestionsStates } from '@/store/useSchedulesSuggestionStates'
import { useProfileStates } from '@/store/useProfileStates'
import { useTour } from '@reactour/tour'

interface DialogUnallocatedTasksProps {
  open: boolean
  onClose: () => void
}

export function DialogUnallocatedTasks({
  open,
  onClose,
}: DialogUnallocatedTasksProps) {
  const [openSuggestionSchedule, setOpenSuggestionSchedule] = useState(false)
  const { setSchedulesSuggestions } = useSchedulesSuggestionsStates()
  const { unallocatedTasks, countUnallocatedTasks } = useUnallocatedTaskStates()
  const { schedules } = useSchedulesStates()
  const { profile } = useProfileStates()

  const { setIsOpen, currentStep, setCurrentStep, isOpen } = useTour()

  const handleGenerateScheduleSuggestion = useCallback(() => {
    onClose()
    if (isOpen) {
      setIsOpen(false)
      setCurrentStep(currentStep + 1)
    }
    const data = createScheduleSuggestion(unallocatedTasks, schedules, {
      dates: [],
      intervals: profile?.sleepHours ? [profile?.sleepHours] : [],
      weekDays: [],
    })
    if (data) {
      setSchedulesSuggestions(data)
    }
    setOpenSuggestionSchedule(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unallocatedTasks,
    schedules,
    setSchedulesSuggestions,
    onClose,
    profile,
    isOpen,
  ])

  const handleRegenerateScheduleSuggestion = useCallback(() => {
    const data = createScheduleSuggestion(unallocatedTasks, schedules, {
      dates: [],
      intervals: profile?.sleepHours ? [profile?.sleepHours] : [],
      weekDays: [],
    })
    if (data) {
      setSchedulesSuggestions(data)
    }
  }, [schedules, unallocatedTasks, setSchedulesSuggestions, profile])

  const handleCloseSuggestionSchedule = useCallback(() => {
    setOpenSuggestionSchedule(false)
  }, [])

  useEffect(() => {
    if (!countUnallocatedTasks) {
      onClose()
    }
    if (currentStep === 2) {
      setIsOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countUnallocatedTasks, onClose, currentStep])

  return (
    <>
      <DialogSuggestionSchedule
        open={openSuggestionSchedule}
        onClose={handleCloseSuggestionSchedule}
        onReschedule={handleRegenerateScheduleSuggestion}
      />
      <Dialog
        open={open}
        onClose={onClose}
        sx={(theme) => ({
          '& .MuiDialog-paper': {
            width: '80%',
            maxWidth: 820,
            [theme.breakpoints.down('sm')]: {
              minWidth: '100%',
              minHeight: '100%',
              borderRadius: 0,
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
              className="allocate-tasks-button"
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
