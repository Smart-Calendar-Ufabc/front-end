import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps {
  open: boolean
  title: string
  message?: string
  onConfirm: () => void
  onClose: () => void
}

export default function AlertDialog({
  open,
  title,
  message,
  onConfirm,
  onClose,
}: AlertDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {message && (
        <DialogContent sx={{ pb: 1 }}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  )
}
