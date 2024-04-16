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
  children?: React.ReactNode
  confirmText?: string
  cancelText?: string | false
  onConfirm: () => void
  onClose: () => void
}

export default function AlertDialog({
  open,
  title,
  message,
  children,
  cancelText,
  confirmText,
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
          {children && children}
        </DialogContent>
      )}

      <DialogActions>
        {cancelText !== false && (
          <Button onClick={handleClose}>{cancelText || 'Cancelar'}</Button>
        )}
        <Button onClick={handleConfirm} autoFocus>
          {confirmText || 'Sim'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
