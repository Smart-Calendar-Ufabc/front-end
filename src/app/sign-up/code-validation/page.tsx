'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Link from '@/components/typography/Link'
import { useAppStates } from '@/store/useAppStates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { signUpCodeValidationFetch } from '@/app/api/sign-up'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

export default function SignUpCodeValidation() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { onboarding, setAuthToken } = useAppStates()

  const validationSchema = yup.object({
    code: yup
      .string()
      .required('Informe o código')
      .length(6, 'Código inválido')
      .matches(/^\d+$/, 'Código inválido'),
  })

  const formik = useFormik({
    initialValues: {
      code: onboarding.code,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const { status, data } = await signUpCodeValidationFetch({
        email: onboarding.email,
        code: values.code,
      })

      if (status === 200 && data?.token) {
        setAuthToken(data.token)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('authToken', data.token)
          window.location.href = '/home'
        }
      } else if (data?.errors?.code) {
        setIsLoading(false)
        formik.setErrors({
          code: data.errors.code?.join(', '),
        })
      } else if (status === 500) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Erro interno no servidor')
      }
    },
  })

  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Confirme seu e-mail</FormTitle>
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
        <FormGroup>
          <Typography>
            Confirme o código abaixo para finalizar o cadastro do e-mail{' '}
            <b>{onboarding.email}</b>. (<Link to="/sign-up">não é você?</Link>)
          </Typography>
          <Typography>
            Insira-o código abaixo para confirmar o seu e-mail.
          </Typography>
          <FormGroup>
            <TextField
              label="Código"
              type="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={
                formik.touched.code && Boolean(formik.errors.code)
                  ? formik.errors.code
                  : 'O código deve conter 6 dígitos.'
              }
            ></TextField>
          </FormGroup>
        </FormGroup>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={16} /> : 'Verificar'}
        </Button>
      </FormContainer>
    </OnboardingLayout>
  )
}
