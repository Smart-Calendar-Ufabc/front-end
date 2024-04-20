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
import { signUpCodeValidationFetch } from '@/api/sign-up'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/navigation'

export default function SignUpCodeValidation() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { onboarding, setOnboarding, setAuthToken } = useAppStates()

  const router = useRouter()

  const validationSchema = yup.object({
    code: yup
      .string()
      .required('Informe o código')
      .length(6, 'Código inválido')
      .matches(/^\d+$/, 'Código inválido'),
  })

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const { status, data } = await signUpCodeValidationFetch({
        email: onboarding?.email as string,
        code: values.code,
      })

      if (status === 200 && data?.token) {
        setOnboarding({
          email: null,
        })
        setAuthToken(data.token)
        router.push('/home')
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
            Enviamos um e-mail com um código de verificação para{' '}
            <b>{onboarding.email}</b>. (<Link to="/signup">não é você?</Link>)
          </Typography>
          <Typography>
            Insira-o código abaixo para confirmar o seu e-mail.
          </Typography>
          <FormGroup>
            <TextField
              name="code"
              label="Código"
              type="text"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={
                formik.touched.code && Boolean(formik.errors.code)
                  ? formik.errors.code
                  : 'O código deve conter 6 dígitos.'
              }
              InputProps={{
                inputMode: 'numeric',
              }}
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
          {isLoading ? <CircularProgress size={16} /> : 'Verificar'}
        </Button>
      </FormContainer>
    </OnboardingLayout>
  )
}
