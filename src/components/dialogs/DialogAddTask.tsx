import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'

import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormGroup,
  Stack,
  FormLabel,
} from '@mui/material'
import { Dayjs } from 'dayjs'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'

interface DialogAddTaskProps {
  open: boolean
  onClose: () => void
}

export function DialogAddTask({ open, onClose }: DialogAddTaskProps) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
  const [duration, setDuration] = useState<Dayjs | null>(null)
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)
  const [dueTime, setDueTime] = useState<Dayjs | null>(null)

  const { addUnallocatedTask } = useUnallocatedTaskStates()

  const handleChangePriority = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value as 'low' | 'medium' | 'high')
  }

  const handleAddTask = () => {
    const deadline = dueDate?.set('hour', dueTime?.hour() || 0).toDate() as Date

    addUnallocatedTask({
      id: crypto.randomUUID(),
      title,
      notes,
      priority,
      duration: duration?.format('HH:mm:ss') || '',
      deadline,
    })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={(theme) => ({
        '& .MuiDialog-paper': {
          width: 400,
          [theme.breakpoints.down('sm')]: {
            width: '85%',
          },
        },
      })}
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
        <Stack direction="column" spacing={3}>
          <TextField
            name="title"
            label="Título"
            type="tittle"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="notes"
            multiline
            rows={4}
            label="Notas"
            type="note"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <FormControl size="small">
            <InputLabel id="priority-select-label">Prioridade</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              name="priority"
              label="Prioridade"
              value={priority}
              onChange={handleChangePriority}
            >
              <MenuItem value="low">Baixa</MenuItem>
              <MenuItem value="medium">Média</MenuItem>
              <MenuItem value="high">Alta</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <TimePicker
              name="duration"
              label="Duração"
              ampm={false}
              slotProps={{
                textField: {
                  name: 'duration',
                  size: 'small',
                  type: 'text',
                  variant: 'outlined',
                },
              }}
              value={duration}
              onChange={(date) => setDuration(date)}
            />
          </LocalizationProvider>
          <FormControl>
            <FormLabel component="legend">Data Limite de Entrega</FormLabel>
            <FormGroup>
              <Stack direction="row" spacing={2} mt={2}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    name="dueDate"
                    label="Data"
                    slotProps={{
                      textField: {
                        name: 'dueDate',
                        size: 'small',
                        type: 'text',
                        variant: 'outlined',
                      },
                    }}
                    value={dueDate}
                    onChange={(date) => setDueDate(date)}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <TimePicker
                    name="dueTime"
                    label="Hora"
                    ampm={false}
                    slotProps={{
                      textField: {
                        name: 'dueTime',
                        size: 'small',
                        type: 'text',
                        variant: 'outlined',
                      },
                    }}
                    value={dueTime}
                    onChange={(date) => setDueTime(date)}
                  />
                </LocalizationProvider>
              </Stack>
            </FormGroup>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
        }}
      >
        <Button variant="contained" fullWidth onClick={handleAddTask}>
          Adicionar Tarefa
        </Button>
      </DialogActions>
    </Dialog>
  )
}
