import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'

import './styles.css'

interface DialogAddTaskProps {
  open: boolean
  onClose: () => void
}

export function DialogAddTask({ open, onClose }: DialogAddTaskProps) {
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
      <DialogTitle sx={{ m: 0, p: 2 }}>Adicionar Tarefa</DialogTitle>
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
      <DialogContent>CRIE AQUI...</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: '10px',
          }}
        >
          Adicionar Tarefa
        </Button>
      </DialogActions>
    </Dialog>
  )
}
