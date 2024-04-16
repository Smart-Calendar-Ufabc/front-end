import { Schedule } from '@/entities/Schedule'
import Card from '@mui/material/Card'
import { ScheduleCard } from './ScheduleCard'
import { Box, Button, Typography } from '@mui/material'
import { Plus as PlusIcon } from '@phosphor-icons/react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface WeekSchedulesCardProps {
  date: string
  schedules: Schedule[]
}

export const WeekSchedulesCard = ({
  date,
  schedules,
}: WeekSchedulesCardProps) => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const weekUTCDay = dayjs(date).utc().get('day')
  const weekDay = days[weekUTCDay]

  const day = dayjs(date).utc().get('date')

  const isToday = (date: Dayjs) => {
    const today = dayjs().utc()
    return date.isSame(today, 'day')
  }

  return (
    <Card
      variant="outlined"
      sx={{
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
        minHeight: 500,
      }}
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
            color: isToday(dayjs(date).utc()) ? 'primary.main' : 'grey.800',
          }}
        >
          {weekDay} {day}
        </Typography>
        {schedules
          .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
          .map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              id={schedule.id}
              title={schedule.title}
              status={schedule.status}
              priority={schedule.priority}
              startTime={`${schedule.startAt.getUTCHours().toString().padStart(2, '0')}:${schedule.startAt.getUTCMinutes().toString().padStart(2, '0')}`}
              endTime={`${schedule.endAt.getUTCHours().toString().padStart(2, '0')}:${schedule.endAt.getUTCMinutes().toString().padStart(2, '0')}`}
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
        >
          Adicionar Tarefa
        </Button>
      </Box>
    </Card>
  )
}
