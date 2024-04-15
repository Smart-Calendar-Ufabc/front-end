import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

import './styles.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface DialogAddRoutineProps {
  open: boolean
  onClose: () => void
}

function BasicSelect() {
  const [repeat, setRepeat] = React.useState('')

  const handleChange = (event: any) => {
    setRepeat(event.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="repeat-select-label">Repetir</InputLabel>
      <Select
        labelId="repeat-select-label"
        id="repeat-select"
        value={repeat}
        label="Repeat"
        onChange={handleChange}
      >
        <MenuItem value="daily">Diariamente</MenuItem>
        <MenuItem value="weekly">Semanalmente</MenuItem>
        <MenuItem value="monthly">Mensalmente</MenuItem>
      </Select>
    </FormControl>
  )
}

export function DialogAddRoutine({ open, onClose }: DialogAddRoutineProps) {
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
      <DialogTitle sx={{ m: 0, p: 2 }}>Adicionar Rotina</DialogTitle>
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
        <Stack direction='column' spacing={3}>
          <TextField id="outlined-basic" label="Título" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <TimePicker name="startTime" label="Inicia às" />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <TimePicker name="duration" label="Duração" ampm={false} />
          </LocalizationProvider>
          <BasicSelect></BasicSelect>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: '10px',
          }}
        >
          Adicionar Rotina
        </Button>
      </DialogActions>
    </Dialog>
  )
}
