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

import './styles.css'
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
import React from 'react'

interface DialogAddTaskProps {
  open: boolean
  onClose: () => void
}

export function DialogAddTask({ open, onClose }: DialogAddTaskProps) {
  const [priority, setPriority] = React.useState('')

  const handleChangePriority = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value as string)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 400,
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
        <Stack direction="column" spacing={3}>
          <TextField
            label="Título"
            type="tittle"
            variant="outlined"
            size="small"
          />
          <TextField
            id="outlined-multiline-flexible"
            multiline
            rows={4}
            label="Notas"
            type="note"
            variant="outlined"
          />
          <FormControl size="small">
            <InputLabel id="priority-select-label">Prioridade</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={priority}
              label="Prioridade"
              onChange={handleChangePriority}
            >
              <MenuItem value="baixa">Baixa</MenuItem>
              <MenuItem value="média">Média</MenuItem>
              <MenuItem value="alta">Alta</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <TimePicker
              name="limitDateToSell"
              label="Duração"
              ampm={false}
              slotProps={{
                textField: {
                  name: 'limitDateToSell',
                  size: 'small',
                  type: 'text',
                  variant: 'outlined',
                },
              }}
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
                    label="Data"
                    slotProps={{
                      textField: {
                        name: 'limitDateToSell',
                        size: 'small',
                        type: 'text',
                        variant: 'outlined',
                      },
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <TimePicker
                    label="Hora"
                    ampm={false}
                    slotProps={{
                      textField: {
                        name: 'limitDateToSell',
                        size: 'small',
                        type: 'text',
                        variant: 'outlined',
                      },
                    }}
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
        <Button variant="contained" fullWidth>
          Adicionar Tarefa
        </Button>
      </DialogActions>
    </Dialog>
  )
}
