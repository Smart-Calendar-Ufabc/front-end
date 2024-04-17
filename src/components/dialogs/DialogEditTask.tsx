import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { X as CloseIcon } from '@phosphor-icons/react'
import {
  FormGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FormHelperTag } from '../typography/FormHelperTag'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'

interface DialogEditTaskProps {
  open: boolean
  onClose: () => void
}

export function DialogEditTask({ open, onClose }: DialogEditTaskProps) {
  const validationSchema = yup.object({
    title: yup.string().required('Título é obrigatório'),
    notes: yup.string(),
    priority: yup.string().required('Prioridade é obrigatória'),
    duration: yup.string().required('Duração é obrigatória'),
    dueDate: yup.date().required('Data é obrigatória'),
    dueTime: yup.date().required('Hora é obrigatória'),
    startDate: yup.date().nullable(),
    startTime: yup.date().nullable(),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      notes: '',
      priority: '',
      duration: null,
      dueDate: null,
      dueTime: null,
      startDate: null,
      startTime: null,
    } as {
      title: string
      notes: string
      priority: 'low' | 'medium' | 'high' | ''
      duration: Dayjs | null
      dueDate: Dayjs | null
      dueTime: Dayjs | null
      startDate: Dayjs | null
      startTime: Dayjs | null
    },
    validationSchema,
    onSubmit: () => {
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
            width: '100%',
            minWidth: '100%',
            minHeight: '100%',
            borderRadius: 0,
          },
        },
      })}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Editar Tarefa</DialogTitle>
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
          {/* Título */}
          <TextField
            name="title"
            label="Título"
            type="text"
            size="small"
            id="outlined-start-adornment"
            sx={{ m: 1, width: 'Fill' }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          {/* Notas */}
          <TextField
            name="notes"
            multiline
            rows={4}
            label="Notas"
            type="text"
            id="outlined-multiline-static"
            sx={{ m: 1, width: 'Fill' }}
            defaultValue="Default Value"
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
          {/* Duração */}
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
          {/* Data de inicio */}
          <FormGroup>
            <FormControl>
              <FormLabel component="legend">Data de início</FormLabel>
              <FormGroup>
                <Stack direction="row" spacing={2} mt={2}>
                  <FormControl sx={{ flex: 1 }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pt-br"
                    >
                      <DatePicker
                        name="startDate"
                        label="Data"
                        slotProps={{
                          textField: {
                            name: 'startDate',
                            size: 'small',
                            type: 'text',
                            variant: 'outlined',
                            error:
                              formik.touched.startDate &&
                              Boolean(formik.errors.startDate),
                          },
                        }}
                        value={formik.values.startDate}
                        onChange={(newValue) => {
                          formik.setFieldValue('startDate', newValue)
                        }}
                      />
                      <FormHelperText
                        error={
                          formik.touched.startDate &&
                          Boolean(formik.errors.startDate)
                        }
                      >
                        {formik.touched.startDate && formik.errors.startDate}
                      </FormHelperText>
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pt-br"
                    >
                      <TimePicker
                        name="startTime"
                        label="Hora"
                        ampm={false}
                        slotProps={{
                          textField: {
                            name: 'startTime',
                            size: 'small',
                            type: 'text',
                            variant: 'outlined',
                            error:
                              formik.touched.startTime &&
                              Boolean(formik.errors.startTime),
                          },
                        }}
                        value={formik.values.startTime}
                        onChange={(newValue) => {
                          formik.setFieldValue('startTime', newValue)
                        }}
                      />
                      <FormHelperText
                        error={
                          formik.touched.startTime &&
                          Boolean(formik.errors.startTime)
                        }
                      >
                        {formik.touched.startTime && formik.errors.startTime}
                      </FormHelperText>
                    </LocalizationProvider>
                  </FormControl>
                </Stack>
              </FormGroup>
            </FormControl>
          </FormGroup>
          {/* Data limite de entrega */}
          <FormGroup>
            <FormControl>
              <FormLabel component="legend">Data limite de entrega</FormLabel>
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
                          formik.touched.dueDate &&
                          Boolean(formik.errors.dueDate)
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
                          formik.touched.dueTime &&
                          Boolean(formik.errors.dueTime)
                        }
                      >
                        {formik.touched.dueTime && formik.errors.dueTime}
                      </FormHelperText>
                    </LocalizationProvider>
                  </FormControl>
                </Stack>
              </FormGroup>
            </FormControl>
          </FormGroup>
          {/* Prioridade */}
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

          {/* <Stack
            direction="row"
            spacing={2}
            sx={{
              bgcolor: 'grey.100',
              width: 'Fill',
              placeContent: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            
            <Button
              sx={(theme) => ({
                py: '10px',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
                color: 'grey.600',
                '&:hover': {
                  color: 'error.main',
                  backgroundColor: 'grey.100',
                },
                flexDirection: 'column',
              })}
            >
              <SvgIcon
                sx={{
                  marginBottom: '12px',
                }}
              >
                <TrashIcon />
              </SvgIcon>
              Excluir
            </Button>
            
            <Button
              sx={(theme) => ({
                py: '10px',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
                color: 'grey.600',
                '&:hover': {
                  color: 'primary.main',
                },
                flexDirection: 'column',
              })}
            >
              <SvgIcon
                sx={{
                  marginBottom: '12px',
                }}
              >
                <ClockIcon />
              </SvgIcon>
              Reagendar
            </Button>
          </Stack> */}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
        }}
      >
        <Button variant="contained" fullWidth onClick={formik.submitForm}>
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  )
}
