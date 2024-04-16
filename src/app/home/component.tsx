'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ActionToolbar from '@/components/ActionToolbar'
import { WeekSchedulesCard } from '@/components/WeekSchedulesCard'
import { Schedule } from '@/entities/Schedule'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import { Skeleton } from '@mui/material'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

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

  // useEffect(() => {
  //   setSchedules(schedulesSeed)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    const startDate = dayjs().utc().startOf('day')
    const endDate = dayjs().utc().add(30, 'day').startOf('day')
    const diffDays = endDate.diff(startDate, 'day')

    const days = Array.from({
      length: diffDays,
    }).map((_, index) => {
      return startDate.add(index, 'day')
    })

    const grouped: Record<string, Schedule[]> = {}

    schedules.forEach((schedule) => {
      const key = dayjs(schedule.startAt).utc().startOf('day').toISOString()
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(schedule)
    })

    const newGrouped: Record<string, Schedule[]> = {}

    days.forEach((day) => {
      const key = day.utc().startOf('day').toISOString()
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
                  sx={{ width: 166, height: 500, borderRadius: 2 }}
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
    </>
  )
}
