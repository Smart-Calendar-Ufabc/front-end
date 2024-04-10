import { PriorityTag } from '@/components/PriorityTag'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { useState } from 'react'

interface ScheduleCardProps {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  done: boolean
  startTime: string
  endTime: string
}

export const ScheduleCard = ({
  title,
  done,
  priority,
  startTime,
  endTime,
}: ScheduleCardProps) => {
  const [completed, setCompleted] = useState(done)

  return (
    <Card
      sx={{
        opacity: completed ? 0.6 : 1,
        '&.MuiCard-root': {
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
          minWidth: 140,
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
            }}
          >
            {title}
          </Typography>
          <Checkbox
            checked={completed}
            onChange={() => setCompleted(!completed)}
            sx={{
              '&.MuiCheckbox-root': {
                p: 0,
                color: 'grey.200',
              },
              '&.Mui-checked': {
                color: 'primary.light',
              },
            }}
          />
        </Box>
        <PriorityTag variant="little" priority={priority} />
        <Box
          sx={{
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'divider',
            width: '100%',
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              textAlign: 'right',
              pt: '4px',
            }}
          >
            {startTime} - {endTime}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox
      disableRipple
      color="primary"
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  )
}
