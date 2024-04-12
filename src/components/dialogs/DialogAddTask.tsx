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
  FormGroup,
  Stack,
  FormLabel,
  FormHelperText,
} from '@mui/material'
import { Dayjs } from 'dayjs'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FormHelperTag } from '../typography/FormHelperTag'

interface DialogAddTaskProps {
  open: boolean
  onClose: () => void
}

export function DialogAddTask({ open, onClose }: DialogAddTaskProps) {
  const { addUnallocatedTask } = useUnallocatedTaskStates()

  const validationSchema = yup.object({
    title: yup.string().required('Título é obrigatório'),
    notes: yup.string(),
    priority: yup.string().required('Prioridade é obrigatória'),
    duration: yup.string().required('Duração é obrigatória'),
    dueDate: yup.date().required('Data é obrigatória'),
    dueTime: yup.date().required('Hora é obrigatória'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      notes: '',
      priority: '',
      duration: null,
      dueDate: null,
      dueTime: null,
    } as {
      title: string
      notes: string
      priority: 'low' | 'medium' | 'high' | ''
      duration: Dayjs | null
      dueDate: Dayjs | null
      dueTime: Dayjs | null
    },
    validationSchema,
    onSubmit: (values) => {
      const dueDate = values.dueDate
      let deadline: Date = new Date()
      if (dueDate) {
        deadline = dueDate.set('hour', dueDate.hour()).toDate()
      }

      let duration = values.duration || null
      if (duration) {
        duration = duration
          .set('hour', duration.hour())
          .set('minute', duration.minute())
          .set('second', duration.second())
      }

      addUnallocatedTask({
        id: crypto.randomUUID(),
        title: values.title,
        notes: values.notes,
        priority: values.priority as 'low' | 'medium' | 'high',
        duration: values.duration
          ? values.duration.get('hour') + ':' + values.duration.get('minute')
          : '00:00',
        deadline,
      })

      formik.resetForm()

      onClose()
    },
  })

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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            name="notes"
            multiline
            rows={4}
            label="Notas"
            type="note"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.notes && Boolean(formik.errors.notes)}
            helperText={
              formik.touched.notes && Boolean(formik.errors.notes) ? (
                formik.touched.notes && formik.errors.notes
              ) : (
                <FormHelperTag>Opcional</FormHelperTag>
              )
            }
          />
          <FormControl size="small">
            <InputLabel id="priority-select-label">Prioridade</InputLabel>
            <Select
              name="priority"
              labelId="priority-select-label"
              id="priority-select"
              label="Prioridade"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              <MenuItem value="low">Baixa</MenuItem>
              <MenuItem value="medium">Média</MenuItem>
              <MenuItem value="high">Alta</MenuItem>
            </Select>
            <FormHelperText
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              {formik.touched.priority && formik.errors.priority}
            </FormHelperText>
          </FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <FormControl size="small">
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
                    error:
                      formik.touched.duration &&
                      Boolean(formik.errors.duration),
                  },
                }}
                value={formik.values.duration}
                onChange={(newValue) => {
                  formik.setFieldValue('duration', newValue)
                }}
              />
              <FormHelperText
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
              >
                {formik.touched.duration && formik.errors.duration}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>
          <FormControl>
            <FormLabel component="legend">Data Limite de Entrega</FormLabel>
            <FormGroup>
              <Stack direction="row" spacing={2} mt={2}>
                <FormControl sx={{ flex: 1 }}>
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
                          error:
                            formik.touched.dueDate &&
                            Boolean(formik.errors.dueDate),
                        },
                      }}
                      value={formik.values.dueDate}
                      onChange={(newValue) => {
                        formik.setFieldValue('dueDate', newValue)
                      }}
                    />
                    <FormHelperText
                      error={
                        formik.touched.dueDate && Boolean(formik.errors.dueDate)
                      }
                    >
                      {formik.touched.dueDate && formik.errors.dueDate}
                    </FormHelperText>
                  </LocalizationProvider>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
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
                          error:
                            formik.touched.dueTime &&
                            Boolean(formik.errors.dueTime),
                        },
                      }}
                      value={formik.values.dueTime}
                      onChange={(newValue) => {
                        formik.setFieldValue('dueTime', newValue)
                      }}
                    />
                    <FormHelperText
                      error={
                        formik.touched.dueTime && Boolean(formik.errors.dueTime)
                      }
                    >
                      {formik.touched.dueTime && formik.errors.dueTime}
                    </FormHelperText>
                  </LocalizationProvider>
                </FormControl>
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
        <Button variant="contained" fullWidth onClick={formik.submitForm}>
          Adicionar Tarefa
        </Button>
      </DialogActions>
    </Dialog>
  )
}
