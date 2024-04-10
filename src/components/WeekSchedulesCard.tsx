import { CalendarSchedule } from '@/entities/CalendarSchedule'
import Card from '@mui/material/Card'
import { ScheduleCard } from './ScheduleCard'
import { Typography } from '@mui/material'

interface WeekSchedulesCardProps {
  date: string
  schedules: CalendarSchedule[]
}

export const WeekSchedulesCard = ({
  date,
  schedules,
}: WeekSchedulesCardProps) => {
  const newDate = new Date(date)
  const weekDay =
    newDate
      .toLocaleDateString('pt-BR', { weekday: 'short' })
      .replace('.', '')
      .charAt(0)
      .toUpperCase() +
    newDate
      .toLocaleDateString('pt-BR', { weekday: 'short' })
      .replace('.', '')
      .slice(1)
  const day = newDate.toLocaleDateString('pt-BR', { day: '2-digit' })

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
          color: 'grey.800',
          fontWeight: '600',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {weekDay} {day}
      </Typography>
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          id={schedule.id}
          title={schedule.title}
          done={schedule.done}
          priority={schedule.priority}
          startTime={schedule.startTime}
          endTime={schedule.endTime}
        />
      ))}
    </Card>
  )
}
