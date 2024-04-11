import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'
import { TimePicker, DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

import './styles.css'
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import FormGroupAddTask from '@/components/form/FormGroupAddTask'
import FormGroupAddTaskTime from '@/components/form/FormGroupAddTaskTime'
import React from 'react'

interface DialogAddTaskProps {
  open: boolean
  onClose: () => void
}

function BasicSelect() {
  const [priority, setPriority] = React.useState('')

  const handleChange = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="priority-select-label">Prioridade</InputLabel>
      <Select
        labelId="priority-select-label"
        id="priority-select"
        value={priority}
        label="Priority"
        onChange={handleChange}
      >
        <MenuItem value="baixa">Baixa</MenuItem>
        <MenuItem value="média">Média</MenuItem>
        <MenuItem value="alta">Alta</MenuItem>
      </Select>
    </FormControl>
  )
}

export function DialogAddTask({ open, onClose }: DialogAddTaskProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 500,
          minHeight: 650,
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
      <DialogContent>
        <FormGroupAddTask>
          <TextField
            label="Título"
            type="tittle"
            variant="outlined"
            sx={{
              height: '51px',
              width: '452px',
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            multiline
            rows={4}
            label="Notas"
            type="note"
            variant="outlined"
            sx={{
              height: '96px',
              width: '452px',
            }}
          />
          <Typography variant="subtitle2" color={'#666666'}>
            Opcional
          </Typography>
        </FormGroupAddTask>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="Duração"
              sx={{
                width: '452px',
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Typography variant="h6" sx={{ marginTop: '16px' }}>
          Data limite de entrega
        </Typography>
        <FormGroupAddTaskTime>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="mm/dd/aa" />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker label="23:59" />
            </DemoContainer>
          </LocalizationProvider>
        </FormGroupAddTaskTime>
        <FormGroupAddTask>
          <BasicSelect />
        </FormGroupAddTask>
      </DialogContent>
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
