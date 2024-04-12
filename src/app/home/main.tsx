'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { WeekSchedulesCard } from '@/components/WeekSchedulesCard'
import { schedules as schedulesSeed } from '@/seed/schedules'
import ActionToolbar from '@/components/ActionToolbar'
import { Schedule } from '@/entities/Schedule'
import { useSchedulesStates } from '@/store/useSchedulesStates'

export default function HomeMain() {
  const [list, setList] = useState<Record<string, Schedule[]>>({})
  const { schedules, setSchedules } = useSchedulesStates()

  useEffect(() => {
    setSchedules(schedulesSeed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setList(
      schedules.reduce(
        (grouped, schedule) => {
          const key =
            schedule.startAt.toISOString().split('T')[0] + 'T00:00:00Z'
          if (!grouped[key]) {
            grouped[key] = []
          }
          grouped[key].push(schedule)
          return grouped
        },
        {} as Record<string, Schedule[]>,
      ),
    )
  }, [schedules])

  return (
    <>
      <ActionToolbar />
      <Box
        sx={{
          display: 'grid',
          maxWidth: '100%',
          overflowX: 'auto',
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
          {Object.entries(list).map(([startDate, schedules]) => (
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
