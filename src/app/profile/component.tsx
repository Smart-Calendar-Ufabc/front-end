'use client'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormTitle from '@/components/form/FormTitleProfile'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import { useProfileStates } from '@/store/useProfileStates'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'

import { useFormik } from 'formik'
import * as yup from 'yup'
import dayjs, { Dayjs } from 'dayjs'
import FormLabel from '@mui/material/FormLabel'
import Stack from '@mui/material/Stack'
import {
  createProfileFetch,
  getProfileFetch,
  updateProfileFetch,
} from '../api/profile'
import Alert from '@mui/material/Alert'
import { CircularProgress, Skeleton } from '@mui/material'
import BackNavigation from '@/components/BackNavigation'

export default function SettingsMain() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { profile, setProfile } = useProfileStates()
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputImageRef = useRef<HTMLInputElement>(null)
  const [imageUploadedUrl, setImageUploadedUrl] = useState<string | null>(
    '/images/blank-profile-picture.png',
  )
  const [isFetchingProfile, setIsFetchingProfile] = useState(false)

  const validationSchema = yup.object({
    name: yup.string().required('Informe o seu nome'),
    sleepPeriodStart: yup.date().required('Informe o período inicial do sono'),
    sleepPeriodEnd: yup.date().required('Informe o período final do sono'),
    avatar: yup
      .mixed()
      .test('fileFormat', 'Formato de imagem inválido', (value: unknown) => {
        if (value instanceof Blob) {
          return (
            value.type === 'image/png' ||
            value.type === 'image/jpeg' ||
            value.type === 'image/jpg' ||
            value.type === 'image/heic'
          )
        }
        return true
      })
      .notRequired(),
  })

  const getDayjsDateFromHoursAndMinutes = (hour?: number, minutes?: number) => {
    if (hour !== undefined && minutes !== undefined) {
      return dayjs().hour(hour).minute(minutes)
    }

    return dayjs().hour(0).minute(0)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: null,
      sleepPeriodStart: null,
      sleepPeriodEnd: null,
    } as {
      name: string
      avatar: File | null
      sleepPeriodStart: Dayjs | null
      sleepPeriodEnd: Dayjs | null
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      if (!profile) {
        const { status, data } = await createProfileFetch({
          name: values.name,
          avatar: values?.avatar || undefined,
          sleepHours: {
            start: {
              hour: values?.sleepPeriodStart?.hour() || 0,
              minutes: values?.sleepPeriodStart?.minute() || 0,
            },
            end: {
              hour: values?.sleepPeriodEnd?.hour() || 0,
              minutes: values?.sleepPeriodEnd?.minute() || 0,
            },
          },
        })

        if (status === 201 && data?.profile) {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('profile', JSON.stringify(data.profile))
          }
          setIsLoading(false)
          setProfile({
            name: values.name,
            avatarUrl: data.profile.avatar_image_url,
            sleepHours: {
              start: {
                hour: values?.sleepPeriodStart?.hour() || 0,
                minutes: values?.sleepPeriodStart?.minute() || 0,
              },
              end: {
                hour: values?.sleepPeriodEnd?.hour() || 0,
                minutes: values?.sleepPeriodEnd?.minute() || 0,
              },
            },
          })
          setSaved(true)
        } else {
          setIsLoading(false)
          setOpenAlert(true)
          setAlertMessage('Erro interno no servidor')
        }
      } else {
        const { status, data } = await updateProfileFetch({
          name: values.name,
          avatar: values?.avatar || undefined,
          sleepHours: {
            start: {
              hour: values?.sleepPeriodStart?.hour() || 0,
              minutes: values?.sleepPeriodStart?.minute() || 0,
            },
            end: {
              hour: values?.sleepPeriodEnd?.hour() || 0,
              minutes: values?.sleepPeriodEnd?.minute() || 0,
            },
          },
        })

        if (status === 200 && data?.profile) {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('profile', JSON.stringify(data.profile))
          }
          setIsLoading(false)
          setProfile({
            name: values.name,
            avatarUrl: data.profile.avatar_image_url,
            sleepHours: {
              start: {
                hour: values?.sleepPeriodStart?.hour() || 0,
                minutes: values?.sleepPeriodStart?.minute() || 0,
              },
              end: {
                hour: values?.sleepPeriodEnd?.hour() || 0,
                minutes: values?.sleepPeriodEnd?.minute() || 0,
              },
            },
          })
          setSaved(true)
        } else {
          setIsLoading(false)
          setOpenAlert(true)
          setAlertMessage('Erro interno no servidor')
        }
      }
    },
  })

  const getProfile = useCallback(async () => {
    try {
      const { status, data } = await getProfileFetch()

      if (status === 200 && data?.profile) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('profile', JSON.stringify(data.profile))
        }
        setProfile(data.profile)
        formik.setFieldValue('name', data.profile.name)
        formik.setFieldValue(
          'sleepPeriodStart',
          getDayjsDateFromHoursAndMinutes(
            data.profile?.sleepHours?.start.hour,
            data.profile?.sleepHours?.start.minutes,
          ),
        )
        formik.setFieldValue(
          'sleepPeriodEnd',
          getDayjsDateFromHoursAndMinutes(
            data.profile?.sleepHours?.end.hour,
            data.profile?.sleepHours?.end.minutes,
          ),
        )
        if (data.profile.avatar) {
          setImageUploadedUrl(data.profile.avatar)
        }
      } else if (status === 200 && !data?.profile) {
        setProfile(null)
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('profile')
        }
      } else if (status !== 200) {
        setOpenAlert(true)
        setAlertMessage('Erro interno no servidor')
      }
    } catch (error) {
      console.error(error)
    }
    setIsFetchingProfile(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProfile])

  useEffect(() => {
    setIsFetchingProfile(true)
    getProfile()
  }, [getProfile])

  return (
    <Box>
      <BackNavigation to="/home" title="Home" />
      <FormTitle>Editar Perfil</FormTitle>
      {openAlert && (
        <Alert
          severity="error"
          onClose={() => {
            setOpenAlert(false)
          }}
          sx={{ mt: 2 }}
        >
          {alertMessage}
        </Alert>
      )}
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
        <input
          ref={inputImageRef}
          type="file"
          hidden
          accept="image/png, image/jpeg, image/jpg, image/heic"
          onChange={(e) => {
            if (e.target.files) {
              formik.setFieldValue('avatar', e.target.files[0])
              setSaved(false)
              setImageUploadedUrl(URL.createObjectURL(e.target.files[0]))
            }
          }}
        />
        {isFetchingProfile ? (
          <Skeleton
            variant="rounded"
            sx={{ width: 80, height: 80, borderRadius: 80 }}
          />
        ) : (
          <Button
            variant="outlined"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 80,
              backgroundImage: `url(${imageUploadedUrl})`,
              objectFit: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize:
                imageUploadedUrl === '/images/blank-profile-picture.png'
                  ? '170%'
                  : 'cover',
            }}
            onClick={() => {
              if (inputImageRef.current) {
                inputImageRef.current.click()
              }
            }}
          />
        )}

        {isFetchingProfile ? (
          <Skeleton
            variant="rounded"
            sx={{ width: '140px', height: '40px', mb: 3 }}
          />
        ) : (
          <Box>
            <Button
              variant="outlined"
              sx={{
                width: '140px',
                height: '40px',
                fontSize: '18px',
                flex: 'none',
              }}
              onClick={() => {
                if (inputImageRef.current) {
                  inputImageRef.current.click()
                }
              }}
            >
              Alterar Foto
            </Button>
            <FormHelperText
              sx={{ mt: 1, maxWidth: 131 }}
              error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            >
              {formik.touched.avatar && Boolean(formik.errors.avatar)
                ? formik.touched.avatar && formik.errors.avatar
                : 'Tamanho: 80x80 pixels'}
            </FormHelperText>
          </Box>
        )}
      </FormGroup>
      <Stack
        sx={(theme) => ({
          width: 500,
          mt: 5,
          [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        })}
      >
        {isFetchingProfile ? (
          <Skeleton variant="rounded" height={56} />
        ) : (
          <TextField
            name="name"
            label="Nome"
            type="text"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e)
              setSaved(false)
            }}
          />
        )}

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
              {isFetchingProfile ? (
                <Skeleton
                  variant="rounded"
                  height={56}
                  sx={{ mb: 4, flex: 1 }}
                />
              ) : (
                <FormGroup sx={{ mb: 4, flex: 1 }}>
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
              )}
              {isFetchingProfile ? (
                <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
              ) : (
                <FormGroup sx={{ flex: 1 }}>
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
              )}
            </Box>
          </LocalizationProvider>
        </FormControl>
      </Stack>
      {isFetchingProfile ? (
        <Skeleton variant="rounded" sx={{ width: 180, height: 40 }} />
      ) : (
        <Button
          variant="contained"
          sx={{
            backgroundColor: saved ? 'success.main' : 'primary.main',
            width: 180,
            height: 40,
          }}
          onClick={formik.submitForm}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={16} />
          ) : saved ? (
            'Alterações Salvas'
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      )}
    </Box>
  )
}
