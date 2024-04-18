'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ActionToolbar from '@/components/ActionToolbar'
import { WeekSchedulesCard } from '@/components/WeekSchedulesCard'
import { Schedule } from '@/entities/Schedule'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import { Button, Card, Skeleton } from '@mui/material'
import {
  CloudArrowDown as BackupIcon,
  CloudArrowUp as RestoreIcon,
  Trash as DeleteIcon,
} from '@phosphor-icons/react'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { downloadJSON, uploadJSON } from '@/helpers/file'
import { UnallocatedTask } from '@/entities/UnallocatedTask'
import AlertDialog from '@/components/dialogs/AlertDialog'
import { useTour } from '@reactour/tour'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'
import { DialogOnboarding } from '@/components/dialogs/DialogOnboarding'
import { useAppStates } from '@/store/useAppStates'

dayjs.locale('pt-br')
dayjs.extend(utc)

export default function HomeMain() {
  const [list, setList] = useState<Record<string, Schedule[]>>({})
  const [firstLoad, setFirstLoad] = useState(true)
  const { schedules } = useSchedulesStates()
  const [openOnboardingDialog, setOpenOnboardingDialog] =
    useState<boolean>(false)
  const { onboarding } = useAppStates()

  const { setIsOpen } = useTour()

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false)
    }
  }, [firstLoad])

  useEffect(() => {
    // const firsScheduleDate = schedules.reduce((acc, schedule) => {
    //   if (!acc) {
    //     return new Date(schedule.startAt)
    //   }
    //   return new Date(acc) < new Date(schedule.startAt)
    //     ? new Date(acc)
    //     : new Date(schedule.startAt)
    // }, new Date())

    // const startDate =
    //   dayjs(firsScheduleDate).get('day') < dayjs().get('day')
    //     ? dayjs(firsScheduleDate).startOf('day')
    //     : dayjs().startOf('day')

    const startDate = dayjs().startOf('day')
    const endDate = dayjs().add(30, 'day').startOf('day')
    const diffDays = endDate.diff(startDate, 'day')

    const days = Array.from({
      length: diffDays,
    }).map((_, index) => {
      return startDate.add(index, 'day')
    })

    const grouped: Record<string, Schedule[]> = {}

    schedules.forEach((schedule) => {
      const key = dayjs(schedule.startAt).startOf('day').toISOString()
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(schedule)
    })

    const newGrouped: Record<string, Schedule[]> = {}

    days.forEach((day) => {
      const key = day.startOf('day').toISOString()
      newGrouped[key] = grouped[key] || []
    })

    setList(newGrouped)
  }, [schedules])

  useEffect(() => {
    if (!onboarding.completed) {
      setOpenOnboardingDialog(true)
    }
  }, [onboarding.completed])

  return (
    <>
      <DialogOnboarding
        open={openOnboardingDialog}
        onClose={() => {
          setOpenOnboardingDialog(false)
          setIsOpen(true)
        }}
      />
      <ActionToolbar />
      <Box
        sx={{
          display: 'grid',
          maxWidth: '100%',
          overflowX: 'auto',
          pb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            mt: 3,
          }}
        >
          {firstLoad
            ? Array.from({ length: 9 }).map((key, index) => (
                <Skeleton
                  variant="rounded"
                  key={`skeleton-week-card-${index}`}
                  sx={(theme) => ({
                    width: 166,
                    height: 400,
                    borderRadius: 2,
                    [theme.breakpoints.down('sm')]: {
                      minHeight: 300,
                    },
                  })}
                />
              ))
            : Object.entries(list).map(([startDate, schedules]) => (
                <WeekSchedulesCard
                  key={startDate}
                  date={startDate}
                  schedules={schedules}
                />
              ))}
        </Box>
      </Box>
      <StorageManager />
    </>
  )
}

const StorageManager = () => {
  const { schedules, setSchedules } = useSchedulesStates()
  const { unallocatedTasks, setUnallocatedTasks } = useUnallocatedTaskStates()

  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] =
    useState<boolean>(false)
  const [openRestoreAlertDialog, setOpenRestoreAlertDialog] =
    useState<boolean>(false)
  const [openAlertErrorDialog, setOpenAlertErrorDialog] =
    useState<boolean>(false)
  const [alertErrorMessage, setOpenAlertErrorMessage] = useState('')
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { isOpen, setIsOpen } = useTour()

  const handleBackup = useCallback(() => {
    const date = dayjs().utc().format('YYYY-MM-DD')

    downloadJSON({
      data: {
        schedules,
        unallocatedTasks,
      },
      fileName: `ease-calendar-${date}.json`,
    })
  }, [schedules, unallocatedTasks])

  const handleDeletePermanently = useCallback(() => {
    setSchedules([])
    setUnallocatedTasks([])
  }, [setSchedules, setUnallocatedTasks])

  const handleRestore = useCallback(
    async (file: File) => {
      try {
        const restore = await uploadJSON<{
          schedules: Schedule[]
          unallocatedTasks: UnallocatedTask[]
        }>(file)

        if (restore) {
          const parsedSchedules: Schedule[] = restore.schedules.map(
            (schedule) => {
              const startHour = dayjs.utc(schedule.startAt).get('hour')
              const startMinutes = dayjs.utc(schedule.startAt).get('minute')
              const endHour = dayjs.utc(schedule.endAt).get('hour')
              const endMinutes = dayjs.utc(schedule.endAt).get('minute')

              const newStartAt = dayjs
                .utc(schedule.startAt)
                .set('hour', startHour)
                .set('minute', startMinutes)
                .toDate()

              const newEndAt = dayjs
                .utc(schedule.endAt)
                .set('hour', endHour)
                .set('minute', endMinutes)
                .toDate()

              const newDeadline =
                schedule?.deadline && dayjs.utc(schedule?.deadline).toDate()

              return {
                ...schedule,
                startAt: newStartAt,
                endAt: newEndAt,
                deadline: newDeadline,
              }
            },
          )
          setSchedules(parsedSchedules)
          setUnallocatedTasks(restore.unallocatedTasks)
        }
      } catch (error) {
        console.error(error)
        setOpenAlertErrorMessage(
          'Ops... Ocorreu um erro inesperado ao restaurar o backup. Verifique se os dados do arquivo correspondem ao formato esperado.',
        )
      }
    },
    [setSchedules, setUnallocatedTasks],
  )

  return (
    <>
      <AlertDialog
        open={openAlertErrorDialog}
        onClose={() => setOpenAlertErrorDialog(false)}
        onConfirm={() => setOpenAlertErrorDialog(false)}
        title={alertErrorMessage}
        confirmText="Ok"
      />
      <AlertDialog
        open={openDeleteAlertDialog}
        onClose={() => setOpenDeleteAlertDialog(false)}
        onConfirm={handleDeletePermanently}
        title="Apagar todos os agendamentos e tarefas não alocadas"
        message="Você pode fazer o backup antes de deletar clicando no botão abaixo. Deseja continuar?"
        confirmText="Apagar Tudo"
        cancelText="Cancelar"
      >
        <Button
          variant="contained"
          startIcon={<BackupIcon />}
          onClick={handleBackup}
          sx={{ mt: 2 }}
        >
          Fazer Backup
        </Button>
      </AlertDialog>
      <AlertDialog
        open={openRestoreAlertDialog}
        onClose={() => setOpenRestoreAlertDialog(false)}
        onConfirm={() => inputFileRef.current?.click()}
        title="Restaurar Backup"
        message="Ao restaurar o backup você perderá todas as informações atuais. Deseja continuar?"
        confirmText="Restaurar"
        cancelText="Cancelar"
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <input
          ref={inputFileRef}
          type="file"
          accept=".json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) {
              handleRestore(file)
            }
          }}
        />
        <Card
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            borderRadius: 2,
            p: 1,
            columnGap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Button
            startIcon={<BackupIcon />}
            onClick={handleBackup}
            sx={(theme) => ({
              '&:after': {
                content: '"Fazer Backup"',
              },
              [theme.breakpoints.down('sm')]: {
                '&:after': {
                  content: '"Backup"',
                },
              },
            })}
          />
          <Button
            startIcon={<RestoreIcon />}
            onClick={() => setOpenRestoreAlertDialog(true)}
            sx={(theme) => ({
              '&:after': {
                content: '"Restaurar Backup"',
              },
              [theme.breakpoints.down('sm')]: {
                '&:after': {
                  content: '"Restaurar"',
                },
              },
            })}
          />
        </Card>
        <Button
          className="delete-all-button"
          startIcon={<DeleteIcon />}
          onClick={() => {
            setOpenDeleteAlertDialog(true)
            if (isOpen) {
              setIsOpen(false)
            }
          }}
          sx={(theme) => ({
            color: 'grey.500',
            '&:hover': {
              color: 'error.main',
            },
            '&:after': {
              content: '"Apagar Tudo"',
            },
            [theme.breakpoints.down('sm')]: {
              '&:after': {
                content: '"Apagar Tudo"',
              },
            },
          })}
        />
      </Box>
    </>
  )
}
