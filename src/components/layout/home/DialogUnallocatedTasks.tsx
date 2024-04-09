import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'

import './styles.css'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import Typography from '@mui/material/Typography'

interface DialogUnallocatedTasksProps {
  open: boolean
  onClose: () => void
}

export function DialogUnallocatedTasks({
  open,
  onClose,
}: DialogUnallocatedTasksProps) {
  const { unallocatedTasks } = useUnallocatedTaskStates()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 500,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Tarefas Não Alocadas</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Divider />
      <DialogContent>
        {unallocatedTasks.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Não há tarefas para serem alocadas.
          </Typography>
        ) : (
          'CRIE AQUI...'
        )}
      </DialogContent>
      {unallocatedTasks.length > 0 && (
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            sx={{
              py: '10px',
            }}
          >
            Alocar Tarefas no Calendário
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
