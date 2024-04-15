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
  FormHelperText,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'

import './styles.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

interface DialogAddRoutineProps {
  open: boolean
  onClose: () => void
}

export function DialogAddRoutine({ open, onClose }: DialogAddRoutineProps) {
  const validationSchema = yup.object({
    title: yup.string().required('Informe um título'),
    startTime: yup.string().required('Informe o horário de início'),
    duration: yup.string().required('Informe a duração'),
    repeat: yup.string().required('Informe o período de repetição'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      startTime: null,
      duration: null,
      repeat: '',
    } as {
      title: string
      startTime: Dayjs | null
      repeat: string
      duration: Dayjs | null
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      formik.resetForm()

      onClose()
    },
  })

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
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
              >
                {formik.touched.duration && formik.errors.duration}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>
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
          <FormControl fullWidth>
            <InputLabel id="repeat-select-label">Repetir</InputLabel>
            <Select
              name="repeat"
              labelId="repeat-select-label"
              id="repeat-select"
              label="Repetir"
              value={formik.values.repeat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.repeat && Boolean(formik.errors.repeat)}
            >
              <MenuItem value="daily">Diariamente</MenuItem>
              <MenuItem value="weekly">Semanalmente</MenuItem>
              <MenuItem value="monthly">Mensalmente</MenuItem>
            </Select>
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
          Adicionar Rotina
        </Button>
      </DialogActions>
    </Dialog>
  )
}
