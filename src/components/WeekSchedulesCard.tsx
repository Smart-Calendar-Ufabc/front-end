import { useState } from 'react'

import { Schedule } from '@/entities/Schedule'
import Card from '@mui/material/Card'
import { ScheduleCard } from './ScheduleCard'
import { Box, Button, Typography } from '@mui/material'
import { Plus as PlusIcon } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { getDuration } from '@/helpers/schedule/getDuration'
import { DialogAddScheduledTask } from './dialogs/DialogAddScheduledTask'

dayjs.extend(utc)

interface WeekSchedulesCardProps {
  date: string
  schedules: Schedule[]
}

export const WeekSchedulesCard = ({
  date,
  schedules,
}: WeekSchedulesCardProps) => {
  const [openDialogAddTask, setOpenDialogAddTask] = useState(false)

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const weekUTCDay = dayjs(date).get('day')
  const weekDay = days[weekUTCDay]

  const day = dayjs(date).get('date')

  const areInToday = () => {
    const thisDate = dayjs.utc(date)
    const today = dayjs.utc()
    return thisDate.isSame(today, 'day')
  }

  return (
    <Box>
      <DialogAddScheduledTask
        open={openDialogAddTask}
        onClose={() => setOpenDialogAddTask(false)}
        date={dayjs(date)}
        schedulesInThisDate={schedules}
      />
      <Card
        variant="outlined"
        sx={(theme) => ({
          backgroundColor: 'grey.100',
          borderRadius: 2,
          borderColor: 'grey.300',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.5,
          pt: 1.5,
          // pb: 1.5,
          minWidth: 166,
          minHeight: 400,
          [theme.breakpoints.down('sm')]: {
            minHeight: 300,
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.25,
            mb: 2,
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{
              fontWeight: '600',
              textAlign: 'center',
              width: '100%',
              color: areInToday() ? 'primary.main' : 'grey.800',
            }}
          >
            {weekDay} {day}
          </Typography>
          {schedules
            .sort(
              (a, b) =>
                new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
            )
            .map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                id={schedule.id}
                title={schedule.title}
                status={schedule.status}
                priority={schedule.priority}
                startTime={getDuration(schedule.startAt)}
                endTime={getDuration(schedule.endAt)}
              />
            ))}
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: 'divider',
          }}
        >
          <Button
            startIcon={<PlusIcon size={16} weight="bold" />}
            sx={{
              fontSize: '.875rem',
              color: 'grey.600',
              px: 0,
            }}
            onClick={() => setOpenDialogAddTask(true)}
          >
            Adicionar Tarefa
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
