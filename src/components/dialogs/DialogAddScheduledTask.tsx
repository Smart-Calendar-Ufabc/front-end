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
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

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
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FormHelperTag } from '../typography/FormHelperTag'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import { Schedule } from '@/entities/Schedule'
import AlertDialog from './AlertDialog'

dayjs.extend(utc)
dayjs.extend(timezone)

interface DialogAddTaskProps {
  date: Dayjs
  open: boolean
  schedulesInThisDate: Schedule[]
  onClose: () => void
}

export function DialogAddScheduledTask({
  date,
  open,
  schedulesInThisDate,
  onClose,
}: DialogAddTaskProps) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false)

  const { addSchedule } = useSchedulesStates()

  const validationSchema = yup.object({
    title: yup.string().required('Título é obrigatório'),
    notes: yup.string(),
    priority: yup.string().required('Prioridade é obrigatória'),
    startTime: yup.date().required('Hora de início é obrigatória'),
    endTime: yup.date().required('Hora de início é obrigatória'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      notes: '',
      priority: '',
      startTime: null,
      endTime: null,
    } as {
      title: string
      notes: string
      priority: 'low' | 'medium' | 'high' | ''
      startTime: Dayjs | null
      endTime: Dayjs | null
    },
    validationSchema,
    onSubmit: (values) => {
      const isThereAnyConflict = schedulesInThisDate.some((schedule) => {
        const startAt = dayjs(schedule.startAt)
        const endAt = dayjs(schedule.endAt)

        const startTimeHour = values.startTime?.hour() || 0
        const startTimeMinutes = values.startTime?.minute() || 0

        const newStartAt = dayjs
          .utc(date)
          .set('hour', startTimeHour)
          .set('minute', startTimeMinutes)

        const endTimeHour = values.endTime?.hour() || 0
        const endTimeMinutes = values.endTime?.minute() || 0

        const newEndAt = dayjs
          .utc(date)
          .set('hour', endTimeHour)
          .set('minute', endTimeMinutes)

        return (
          (newStartAt.isAfter(startAt) && newStartAt.isBefore(endAt)) ||
          (newEndAt.isAfter(startAt) && newEndAt.isBefore(endAt)) ||
          (newStartAt.isBefore(startAt) && newEndAt.isAfter(endAt))
        )
      })

      if (isThereAnyConflict) {
        setOpenAlertDialog(true)
      } else {
        addSchedule({
          id: crypto.randomUUID(),
          status: 'pending',
          title: values.title,
          notes: values.notes,
          priority: values.priority as 'low' | 'medium' | 'high',
          startAt: dayjs
            .utc(date)
            .set('hour', values.startTime?.hour() || 0)
            .set('minute', values.startTime?.minute() || 0)
            .toDate(),
          endAt: dayjs
            .utc(date)
            .set('hour', values.endTime?.hour() || 0)
            .set('minute', values.endTime?.minute() || 0)
            .toDate(),
        })

        formik.resetForm()

        onClose()
      }
    },
  })

  return (
    <>
      <AlertDialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        title="Conflito de Horários"
        message="Já existe uma tarefa agendada para este horário. Por favor, selecione outro horário."
        onConfirm={() => setOpenAlertDialog(false)}
        confirmText="Ok"
      />
      <Dialog
        open={open}
        onClose={onClose}
        sx={(theme) => ({
          '& .MuiDialog-paper': {
            width: 400,
            [theme.breakpoints.down('sm')]: {
              minWidth: '100%',
              minHeight: '100%',
              borderRadius: 0,
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
              type="text"
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
              type="text"
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
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
              >
                <MenuItem value="low">Baixa</MenuItem>
                <MenuItem value="medium">Média</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
              </Select>
              <FormHelperText
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
              >
                {formik.touched.priority && formik.errors.priority}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel component="legend">Data de Início</FormLabel>
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
                        value={date}
                        disabled
                        slotProps={{
                          textField: {
                            name: 'startDate',
                            size: 'small',
                            type: 'text',
                            variant: 'outlined',
                            disabled: true,
                          },
                        }}
                      />
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
            <FormControl>
              <FormLabel component="legend">Data de Término</FormLabel>
              <FormGroup>
                <Stack direction="row" spacing={2} mt={2}>
                  <FormControl sx={{ flex: 1 }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pt-br"
                    >
                      <DatePicker
                        name="endDate"
                        label="Data"
                        value={date}
                        disabled
                        slotProps={{
                          textField: {
                            name: 'startDate',
                            size: 'small',
                            type: 'text',
                            variant: 'outlined',
                            disabled: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl sx={{ flex: 1 }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pt-br"
                    >
                      <TimePicker
                        name="endTime"
                        label="Hora"
                        ampm={false}
                        slotProps={{
                          textField: {
                            name: 'endTime',
                            size: 'small',
                            type: 'text',
                            variant: 'outlined',
                            error:
                              formik.touched.endTime &&
                              Boolean(formik.errors.endTime),
                          },
                        }}
                        value={formik.values.endTime}
                        onChange={(newValue) => {
                          formik.setFieldValue('endTime', newValue)
                        }}
                      />
                      <FormHelperText
                        error={
                          formik.touched.endTime &&
                          Boolean(formik.errors.endTime)
                        }
                      >
                        {formik.touched.endTime && formik.errors.endTime}
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
            Adicionar Tarefa na Agenda
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
