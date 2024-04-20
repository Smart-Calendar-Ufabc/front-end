'use client'

import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Alert, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { passwordRecoveryConfirmCodeFetch } from '@/api/password-recovery'
import Link from '@/components/typography/Link'
import { useAppStates } from '@/store/useAppStates'

import * as yup from 'yup'

export default function PasswordRecoveryConfirm() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { onboarding, setOnboarding } = useAppStates()

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
      const { status, data } = await passwordRecoveryConfirmCodeFetch({
        email: onboarding?.email as string,
        code: values.code,
      })

      if (status === 200 && data?.token) {
        setOnboarding({ token: data.token })
        router.push('/password-recovery/update')
        formik.resetForm()
      } else if (status === 404) {
        setIsLoading(false)
        formik.setErrors({
          code: 'Seu código expirou. Solicite um novo código.',
        })
      } else if (status === 400) {
        setIsLoading(false)
        formik.setErrors({
          code: 'Código inválido. Verifique se digitou corretamente.',
        })
      } else if (status === 500) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Erro interno no servidor.')
      }
    },
  })

  useEffect(() => {
    if (!onboarding?.email) {
      setOnboarding({
        openAlert: true,
        alertMessage: 'Seu código expirou. Solicite um novo código.',
      })
      router.push('/password-recovery')
    }
  }, [onboarding.email, router, setOnboarding])

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
            <b>{onboarding.email}</b>. (
            <Link to="/password-recovery">não é você?</Link>)
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
