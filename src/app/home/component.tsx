'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ActionToolbar from '@/components/ActionToolbar'
import { WeekSchedulesCard } from '@/components/WeekSchedulesCard'
import { Schedule } from '@/entities/Schedule'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import { Button, Skeleton } from '@mui/material'
import {
  CloudArrowDown as BackupIcon,
  CloudArrowUp as RestoreIcon,
} from '@phosphor-icons/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/pt-br'
import MobileUp from '@/components/layout/responsive/MobileUp'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { downloadJSON, uploadJSON } from '@/helpers/file'
import { UnallocatedTask } from '@/entities/UnallocatedTask'
import AlertDialog from '@/components/dialogs/AlertDialog'

dayjs.locale('pt-br')
dayjs.extend(utc)

export default function HomeMain() {
  const [list, setList] = useState<Record<string, Schedule[]>>({})
  const [firstLoad, setFirstLoad] = useState(true)
  const { schedules } = useSchedulesStates()

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

  return (
    <>
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

  const [openRestoreAlertDialog, setOpenRestoreAlertDialog] =
    useState<boolean>(false)
  const [openAlertErrorDialog, setOpenAlertErrorDialog] =
    useState<boolean>(false)
  const [alertErrorMessage, setOpenAlertErrorMessage] = useState('')
  const inputFileRef = useRef<HTMLInputElement>(null)

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
              return {
                ...schedule,
                startAt: new Date(schedule.startAt),
                endAt: new Date(schedule.endAt),
                deadline: schedule?.deadline && new Date(schedule?.deadline),
              }
            },
          )
          console.log('parsedSchedules', parsedSchedules)
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
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          gap: 3,
          width: '100%',
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
        <Button startIcon={<BackupIcon />} onClick={handleBackup}>
          Fazer Backup
        </Button>
        <MobileUp>
          <Button
            startIcon={<RestoreIcon />}
            onClick={() => setOpenRestoreAlertDialog(true)}
          >
            Restaurar Backup
          </Button>
        </MobileUp>
      </Box>
    </>
  )
}
