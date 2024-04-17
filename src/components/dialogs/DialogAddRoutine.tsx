import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox'
import { X as CloseIcon } from '@phosphor-icons/react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormHelperText,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Box,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import 'dayjs/locale/pt-br'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import './styles.css'
import { Schedule } from '@/entities/Schedule'
import AlertDialog from './AlertDialog'
import { FormHelperTag } from '../typography/FormHelperTag'

dayjs.extend(utc)
dayjs.extend(isBetween)

interface DialogAddRoutineProps {
  open: boolean
  onClose: () => void
}

const isThereConflict = (schedule: Schedule, newSchedule: Schedule) => {
  const scheduleStartDate = dayjs(schedule.startAt).second(0)
  const scheduleEndDate = dayjs(schedule.endAt).second(0)

  const newScheduleStartDate = dayjs(newSchedule.startAt)
  const newScheduleEndDate = dayjs(newSchedule.endAt)

  const newScheduleStartDateIsBetween = newScheduleStartDate.isBetween(
    scheduleStartDate,
    scheduleEndDate,
    null,
    '[]',
  )

  const newScheduleEndDateIsBetween = newScheduleEndDate.isBetween(
    scheduleStartDate,
    scheduleEndDate,
    null,
    '[]',
  )

  const newScheduleInSame =
    newScheduleStartDate.isSame(scheduleStartDate) ||
    newScheduleStartDate.isSame(scheduleEndDate) ||
    newScheduleEndDate.isSame(scheduleStartDate) ||
    newScheduleEndDate.isSame(scheduleEndDate)

  return (
    newScheduleStartDateIsBetween ||
    newScheduleEndDateIsBetween ||
    newScheduleInSame
  )
}

export function DialogAddRoutine({ open, onClose }: DialogAddRoutineProps) {
  const [repeatWeekdays, setRepeatWeekdays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  })

  const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } =
    repeatWeekdays

  const { schedules, addSchedule } = useSchedulesStates()
  const [datesConflict, setDatesConflict] = useState<string[]>([])
  const [openAlertDialog, setOpenAlertDialog] = useState(false)
  const [alertDialogTitle, setAlertDialogTitle] = useState('')
  const [alertDialogMessage, setAlertDialogMessage] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatWeekdays((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }))
  }

  const validationSchema = yup.object({
    title: yup.string().required('Informe um título'),
    startTime: yup.string().required('Informe o horário de início'),
    endTime: yup.string().required('Informe o horário de término'),
    repeatAs: yup.string().required('Informe o período de repetição'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      startTime: null,
      endTime: null,
      repeatAs: '',
    } as {
      title: string
      startTime: Dayjs | null
      endTime: Dayjs | null
      repeatAs: string
    },
    validationSchema,
    onSubmit: ({ endTime, repeatAs, startTime, title }) => {
      let newSchedules: Schedule[] = []
      const datesConflicting: string[] = []

      if (repeatAs === 'daily') {
        newSchedules = Array.from({ length: 30 }).map((_, index) => {
          const routineStartDate = dayjs()
            .utc()
            .add(index, 'day')
            .hour(startTime?.hour() || 0)
            .minute(startTime?.minute() || 0)
            .second(0)

          const routineEndDate = dayjs()
            .utc()
            .add(index, 'day')
            .hour(endTime?.hour() || 0)
            .minute(endTime?.minute() || 0)
            .second(0)

          return {
            id: crypto.randomUUID(),
            title,
            status: 'pending',
            priority: 'routine',
            startAt: routineStartDate.toDate(),
            endAt: routineEndDate.toDate(),
          }
        })

        newSchedules.map((newSchedule) => {
          const isConflicting = schedules.some((schedule) =>
            isThereConflict(schedule, newSchedule),
          )

          if (!isConflicting) {
            addSchedule(newSchedule)
          } else {
            datesConflicting.push(newSchedule.startAt.toString())
          }

          return newSchedule
        })
      }

      if (repeatAs === 'weekly') {
        for (let week = 0; week < 4; week++) {
          Object.values(repeatWeekdays).forEach((isRepeat, index) => {
            if (isRepeat) {
              index -= 2
              const routineStartDate = dayjs()
                .utc()
                .add(index + week * 7 - 1, 'day')
                .hour(startTime?.hour() || 0)
                .minute(startTime?.minute() || 0)
                .second(0)

              const routineEndDate = dayjs()
                .utc()
                .add(index + week * 7 - 1, 'day')
                .hour(endTime?.hour() || 0)
                .minute(endTime?.minute() || 0)
                .second(0)

              if (routineStartDate.isAfter(dayjs().utc())) {
                newSchedules.push({
                  id: crypto.randomUUID(),
                  title,
                  status: 'pending',
                  priority: 'routine',
                  startAt: routineStartDate.toDate(),
                  endAt: routineEndDate.toDate(),
                })
              }
            }
          })
        }

        newSchedules.map((newSchedule) => {
          const isConflicting = schedules.some((schedule) =>
            isThereConflict(schedule, newSchedule),
          )

          if (!isConflicting) {
            addSchedule(newSchedule)
          } else {
            datesConflicting.push(newSchedule.startAt.toString())
          }

          return newSchedule
        })
      }

      if (datesConflicting.length) {
        setDatesConflict(datesConflicting)
        handleNotifyConflict()
      }

      formik.resetForm()
      setRepeatWeekdays({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      })

      onClose()
    },
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  const handleNotifyConflict = () => {
    setAlertDialogTitle('Conflito de horário.')
    setAlertDialogMessage(
      `Não foi possível adicionar esta rotina nos dias listados abaixo pois há conflito de horário com outro agendamento.`,
    )
    setOpenAlertDialog(true)
  }

  return (
    <>
      <AlertDialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        onConfirm={() => setOpenAlertDialog(false)}
        title={alertDialogTitle}
        message={alertDialogMessage}
        confirmText="Ok"
        cancelText={false}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 2,
          }}
        >
          {datesConflict.map((date) => (
            <FormHelperTag key={date}>
              {dayjs(date).utc().format('DD/MM/YYYY')}
            </FormHelperTag>
          ))}
        </Box>
      </AlertDialog>
      <Dialog
        open={open}
        onClose={handleClose}
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
        <DialogTitle sx={{ m: 0, p: 2 }}>Adicionar Rotina</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <FormControl size="small">
                <TimePicker
                  name="startTime"
                  label="Inicia às"
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
                    formik.touched.startTime && Boolean(formik.errors.startTime)
                  }
                >
                  {formik.touched.startTime && formik.errors.startTime}
                </FormHelperText>
              </FormControl>
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <FormControl size="small">
                <TimePicker
                  name="endTime"
                  label="Termina às"
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
                    formik.touched.endTime && Boolean(formik.errors.endTime)
                  }
                >
                  {formik.touched.endTime && formik.errors.endTime}
                </FormHelperText>
              </FormControl>
            </LocalizationProvider>
            <FormControl fullWidth size="small">
              <InputLabel id="repeat-select-label">Repetir</InputLabel>
              <Select
                name="repeatAs"
                labelId="repeat-select-label"
                id="repeat-select"
                label="Repetir"
                value={formik.values.repeatAs}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.repeatAs && Boolean(formik.errors.repeatAs)
                }
              >
                <MenuItem value="daily">Diariamente</MenuItem>
                <MenuItem value="weekly">Semanalmente</MenuItem>
              </Select>
            </FormControl>
            {formik.values.repeatAs === 'weekly' && (
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Repetir nos dias da semana
                </FormLabel>
                <FormGroup
                  sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="sunday"
                        checked={sunday}
                        onChange={handleChange}
                      />
                    }
                    label="Dom"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="monday"
                        checked={monday}
                        onChange={handleChange}
                      />
                    }
                    label="Seg"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="tuesday"
                        checked={tuesday}
                        onChange={handleChange}
                      />
                    }
                    label="Ter"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="wednesday"
                        checked={wednesday}
                        onChange={handleChange}
                      />
                    }
                    label="Qua"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="thursday"
                        checked={thursday}
                        onChange={handleChange}
                      />
                    }
                    label="Qui"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="friday"
                        checked={friday}
                        onChange={handleChange}
                      />
                    }
                    label="Sex"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="saturday"
                        checked={saturday}
                        onChange={handleChange}
                      />
                    }
                    label="Sáb"
                  />
                </FormGroup>
              </FormControl>
            )}
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
          }}
        >
          <Button variant="contained" fullWidth onClick={formik.submitForm}>
            Adicionar Rotina
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function Checkbox(props: CheckboxProps) {
  return (
    <MuiCheckbox
      disableRipple
      color="primary"
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  )
}
