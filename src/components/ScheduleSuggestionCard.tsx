import { PriorityTag } from '@/components/PriorityTag'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface ScheduleSuggestionCardProps {
  title: string
  priority: 'high' | 'medium' | 'low' | 'routine' | 'event'
  startTime: string
  endTime: string
}

export const ScheduleSuggestionCard = ({
  title,
  priority,
  startTime,
  endTime,
}: ScheduleSuggestionCardProps) => {
  return (
    <Card
      sx={{
        width: '180px',
        '&.MuiCard-root': {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'grey.200',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
          minWidth: 140,
          p: 1,
          height: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.875rem',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <PriorityTag variant="little" priority={priority} />
          <Box
            sx={{
              borderTopWidth: '1px',
              borderTopStyle: 'solid',
              borderTopColor: 'divider',
              mt: 1,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                pt: 0.5,
                display: 'block',
                textAlign: 'right',
              }}
            >
              {startTime} - {endTime}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
