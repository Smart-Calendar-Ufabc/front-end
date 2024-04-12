import { Schedule } from '@/entities/Schedule'
import Card from '@mui/material/Card'
import { ScheduleCard } from './ScheduleCard'
import { Typography } from '@mui/material'

interface WeekSchedulesCardProps {
  date: string
  schedules: Schedule[]
}

export const WeekSchedulesCard = ({
  date,
  schedules,
}: WeekSchedulesCardProps) => {
  const newDate = new Date(date)

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const weekUTCDay = newDate.getUTCDay()
  const weekDay = days[weekUTCDay]

  const day = newDate.getUTCDate()

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getUTCDate() === today.getUTCDate() &&
      date.getUTCMonth() === today.getUTCMonth() &&
      date.getUTCFullYear() === today.getUTCFullYear()
    )
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
        alignItems: 'flex-start',
        px: 1.5,
        pt: 1.5,
        pb: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: '600',
          textAlign: 'center',
          width: '100%',
          color: isToday(newDate) ? 'primary.main' : 'grey.800',
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
            done={schedule.done}
            priority={schedule.priority}
            startTime={`${schedule.startAt.getUTCHours().toString().padStart(2, '0')}:${schedule.startAt.getUTCMinutes().toString().padStart(2, '0')}`}
            endTime={`${schedule.endAt.getUTCHours().toString().padStart(2, '0')}:${schedule.endAt.getUTCMinutes().toString().padStart(2, '0')}`}
          />
        ))}
    </Card>
  )
}
