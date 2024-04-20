'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Alert, CircularProgress } from '@mui/material'
import { passwordRecoverySendCodeFetch } from '../../api/password-recovery'
import { useRouter } from 'next/navigation'

import * as yup from 'yup'
import { useAppStates } from '@/store/useAppStates'

export default function PasswordRecoverySendCode() {
  const { onboarding, setOnboarding } = useAppStates()

  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const validationSchema = yup.object({
    email: yup.string().email().required('Email é obrigatório.'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const { status } = await passwordRecoverySendCodeFetch(values)

      if (status === 200) {
        setOnboarding({
          email: values.email,
          openAlert: false,
          alertMessage: '',
        })
        router.push('/password-recovery/confirm')
        formik.resetForm()
      } else if (status === 404) {
        setIsLoading(false)
        formik.setErrors({
          email: 'Email não encontrado. Verifique se digitou corretamente.',
        })
      } else if (status === 500) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Erro interno no servidor.')
      }
    },
  })

  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Recuperar Conta</FormTitle>
        {openAlert && (
          <Alert
            severity="error"
            onClose={() => {
              setOpenAlert(false)
            }}
          >
            {alertMessage}
          </Alert>
        )}
        {onboarding.openAlert && (
          <Alert
            severity="error"
            onClose={() => {
              setOnboarding({
                openAlert: false,
                alertMessage: '',
              })
            }}
          >
            {onboarding.alertMessage}
          </Alert>
        )}
        <Typography>
          Insira seu email para receber um código de confirmação e recuperar sua
          conta.
        </Typography>
        <FormGroup>
          <FormGroup>
            <TextField
              name="email"
              label="E-mail"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormGroup>
        </FormGroup>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          disabled={isLoading}
          sx={{
            height: 43,
          }}
        >
          {isLoading ? <CircularProgress size={16} /> : 'Enviar Código'}
        </Button>
      </FormContainer>
    </OnboardingLayout>
  )
}
