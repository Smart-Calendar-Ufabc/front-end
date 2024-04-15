import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { Dialog } from '@mui/material'

interface LoadingDialogProps {
  open: boolean
  message: string
}

export const LoadingDialog = ({ open, message }: LoadingDialogProps) => {
  return (
    <Dialog open={open}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
          p: 2,
        }}
      >
        <CircularProgress color="inherit" size={25} />
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Dialog>
  )
}
