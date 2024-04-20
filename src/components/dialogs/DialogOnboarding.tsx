import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { X as CloseIcon } from '@phosphor-icons/react'
import { TimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useProfileStates } from '@/store/useProfileStates'
import { createProfileFetch, updateProfileFetch } from '@/api/profile'
import { useCallback, useState } from 'react'
import { useAppStates } from '@/store/useAppStates'

interface DialogOnboardingProps {
  open: boolean
  onClose: () => void
}

export const DialogOnboarding = ({ open, onClose }: DialogOnboardingProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { profile, setProfile } = useProfileStates()
  const { setOnboarding } = useAppStates()

  const validationSchema = yup.object({
    sleepPeriodStart: yup.date().required('Informe o período inicial do sono'),
    sleepPeriodEnd: yup.date().required('Informe o período final do sono'),
  })

  const formik = useFormik({
    initialValues: {
      sleepPeriodStart: null,
      sleepPeriodEnd: null,
    } as {
      sleepPeriodStart: Dayjs | null
      sleepPeriodEnd: Dayjs | null
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      if (!profile) {
        const { status, data } = await createProfileFetch({
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
          setIsLoading(false)
          setProfile({
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
          handleClose()
        } else {
          setIsLoading(false)
          setOpenAlert(true)
          setAlertMessage('Erro interno no servidor')
        }
      } else {
        const { status, data } = await updateProfileFetch({
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
          setIsLoading(false)
          setProfile({
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
          handleClose()
        } else {
          setIsLoading(false)
          setOpenAlert(true)
          setAlertMessage('Erro interno no servidor')
        }
      }
    },
  })

  const handleClose = useCallback(() => {
    setOnboarding({
      completed: true,
    })
    onClose()
  }, [setOnboarding, onClose])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={(theme) => ({
        '& .MuiDialog-paper': {
          minWidth: 400,
          [theme.breakpoints.down('sm')]: {
            minWidth: '100%',
            minHeight: '100%',
            borderRadius: 0,
          },
        },
      })}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h3" textAlign="center">
          🎉
        </Typography>
        <Typography variant="h5" textAlign="center">
          Seja muito bem-vindo(a)!
        </Typography>
      </DialogTitle>
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
      <DialogContent
        dividers
        sx={{
          pt: 3,
        }}
      >
        <Typography>
          Para otimizar o agendamento das suas tarefas e garantir que elas não
          interfiram no seu descanso, por favor, nos informe o seu período de
          sono abaixo.
        </Typography>
        <Stack>
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
                <FormGroup sx={{ mb: 2, flex: 1 }}>
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
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Button
          variant="contained"
          sx={(theme) => ({
            py: '10px',
            height: 43,
            minWidth: 220,
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          })}
          onClick={formik.submitForm}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={16} />
          ) : (
            'Adicionar Período de Sono'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
