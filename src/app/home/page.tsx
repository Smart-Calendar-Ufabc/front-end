'use client'

import Box from '@mui/material/Box'
import HomeLayout from '@/components/layout/home/HomeLayout'
import { Schedule } from '@/entities/Schedule'
import { initialSchedules } from '@/seed/schedules'
import { WeekSchedulesCard } from '@/components/WeekSchedulesCard'

type SchedulesList = {
  [startDate: string]: Schedule[]
}

export default function Settings() {
  const list: SchedulesList = initialSchedules

  return (
    <HomeLayout>
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
    </HomeLayout>
  )
}
