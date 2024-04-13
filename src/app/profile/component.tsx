'use client'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormTitle from '@/components/form/FormTitleProfile'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { useProfileStates } from '@/store/useProfileStates'
import { useEffect, useState } from 'react'
import { profile as initialProfile } from '@/seed/profile'
import { TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { BlockedTimeType } from '@/seed/blockedTimes'
import dayjs, { Dayjs } from 'dayjs'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'

export default function SettingsMain() {
  const { profile, setProfile } = useProfileStates()
  const [saved, setSaved] = useState(false)

  const validationSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    sleepPeriodStart: yup.date(),
    sleepPeriodEnd: yup.date(),
  })

  const getDayjsDateFromHoursAndMinutes = (hour?: number, minutes?: number) => {
    if (!hour || !minutes) {
      return dayjs().hour(0).minute(0)
    }

    return dayjs().hour(hour).minute(minutes)
  }

  const formik = useFormik({
    initialValues: {
      name: profile?.name,
      sleepPeriodStart: getDayjsDateFromHoursAndMinutes(
        profile?.blockedTimes?.intervals[0].start.hour,
        profile?.blockedTimes?.intervals[0].start.minutes,
      ),
      sleepPeriodEnd: getDayjsDateFromHoursAndMinutes(
        profile?.blockedTimes?.intervals[0].end.hour,
        profile?.blockedTimes?.intervals[0].end.minutes,
      ),
    } as {
      name: string
      sleepPeriodStart: Dayjs | null
      sleepPeriodEnd: Dayjs | null
    },
    validationSchema,
    onSubmit: (values) => {
      setProfile({
        name: values.name,
        blockedTimes: {
          ...(profile?.blockedTimes as BlockedTimeType),
          intervals: [
            {
              start: {
                hour: values?.sleepPeriodStart?.hour() || 0,
                minutes: values?.sleepPeriodStart?.minute() || 0,
              },
              end: {
                hour: values?.sleepPeriodEnd?.hour() || 0,
                minutes: values?.sleepPeriodEnd?.minute() || 0,
              },
            },
          ],
        },
      })
      setSaved(true)
    },
  })

  useEffect(() => {
    setProfile(initialProfile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <FormTitle>Editar Perfil</FormTitle>
      <FormGroup
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          flexDirection: 'row',
          justifyContent: 'center',
          borderTop: '1px solid lightgray',
          borderBottom: '1px solid lightgray',
          p: 3,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: 80,
            height: 80,
            borderRadius: 80,
            backgroundImage: 'url(/images/blank-profile-picture.png)',
            backgroundSize: '170%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></Button>
        <Button
          variant="outlined"
          sx={{
            width: '126px',
            height: '40px',
            fontSize: '18px',
            flex: 'none',
          }}
        >
          Alterar Foto
        </Button>
      </FormGroup>
      <Stack
        sx={(theme) => ({
          minWidth: 500,
          mt: 5,
          [theme.breakpoints.down('md')]: {
            minWidth: '100%',
          },
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        })}
      >
        <TextField
          label="Nome"
          type="name"
          value={formik.values.name}
          onChange={(e) => {
            formik.handleChange(e)
            setSaved(false)
          }}
        />
        <FormControl
          sx={{
            mt: 4,
          }}
        >
          <FormLabel component="legend" sx={{ mb: 3 }}>
            Período de Sono
          </FormLabel>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <Box
              sx={(theme) => ({
                display: 'flex',
                gap: 4,
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  gap: 0,
                  mb: 4,
                },
              })}
            >
              <FormGroup sx={{ mb: 4 }}>
                <TimePicker
                  name="sleepPeriodStart"
                  label="Hora Inicial do Sono"
                  ampm={false}
                  slotProps={{
                    textField: {
                      name: 'duration',
                      type: 'text',
                      variant: 'outlined',
                      error:
                        formik.touched.sleepPeriodStart &&
                        Boolean(formik.errors.sleepPeriodStart),
                    },
                  }}
                  value={formik.values.sleepPeriodStart}
                  onChange={(newValue) => {
                    formik.setFieldValue('sleepPeriodStart', newValue)
                    setSaved(false)
                  }}
                />
                <FormHelperText
                  error={
                    formik.touched.sleepPeriodStart &&
                    Boolean(formik.errors.sleepPeriodStart)
                  }
                >
                  {formik.touched.sleepPeriodStart &&
                    formik.errors.sleepPeriodStart}
                </FormHelperText>
              </FormGroup>
              <FormGroup>
                <TimePicker
                  name="sleepPeriodEnd"
                  label="Hora Final do Sono"
                  ampm={false}
                  slotProps={{
                    textField: {
                      name: 'duration',
                      type: 'text',
                      variant: 'outlined',
                      error:
                        formik.touched.sleepPeriodEnd &&
                        Boolean(formik.errors.sleepPeriodEnd),
                    },
                  }}
                  value={formik.values.sleepPeriodEnd}
                  onChange={(newValue) => {
                    formik.setFieldValue('sleepPeriodEnd', newValue)
                    setSaved(false)
                  }}
                />
                <FormHelperText
                  error={
                    formik.touched.sleepPeriodEnd &&
                    Boolean(formik.errors.sleepPeriodEnd)
                  }
                >
                  {formik.touched.sleepPeriodEnd &&
                    formik.errors.sleepPeriodEnd}
                </FormHelperText>
              </FormGroup>
            </Box>
          </LocalizationProvider>
        </FormControl>
      </Stack>
      <Button
        variant="contained"
        sx={{
          backgroundColor: saved ? 'success.main' : 'primary.main',
        }}
        onClick={formik.submitForm}
      >
        {saved ? 'Alterações Salvas' : 'Salvar Alterações'}
      </Button>
    </Box>
  )
}
