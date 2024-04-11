'use client'

import Box from '@mui/material/Box'
import { WeekSchedulesCard } from '@/components/WeekSchedulesCard'
import { Schedule } from '@/entities/Schedule'
import { initialSchedules } from '@/seed/schedules'
import ActionToolbar from '@/components/ActionToolbar'

type SchedulesList = {
  [startDate: string]: Schedule[]
}

export default function HomeMain() {
  const list: SchedulesList = initialSchedules

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
