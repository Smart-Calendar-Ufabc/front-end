'use client'

import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Alert, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { passwordRecoveryUpdatePasswordFetch } from '@/api/password-recovery'
import { useAppStates } from '@/store/useAppStates'
import {
  EyeSlash as EyeClosedIcon,
  Eye as EyeOpenIcon,
} from '@phosphor-icons/react'

import * as yup from 'yup'

export default function PasswordRecoveryUpdate() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visibility1, setVisibility1] = useState(false)
  const [visibility2, setVisibility2] = useState(false)

  const { onboarding, setOnboarding } = useAppStates()

  const router = useRouter()

  const validationSchema = yup.object({
    newPassword: yup.string().required('Nova senha é obrigatória.'),
    confirmPassword: yup
      .string()
      .required('Confirmação de senha é obrigatória.')
      .oneOf([yup.ref('newPassword'), ''], 'As senhas não coincidem.'),
  })

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const { status } = await passwordRecoveryUpdatePasswordFetch({
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        token: onboarding?.token as string,
      })

      if (status === 200) {
        setOnboarding({
          alertMessage: 'Senha atualizada com sucesso. Faça login.',
          openAlert: true,
        })
        router.push('/')
        formik.resetForm()
      } else if (status === 404) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Seu código expirou. Solicite um novo código.')
      } else if (status === 400) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('As senhas não conferem.')
      } else if (status === 500) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Erro interno no servidor.')
      }
    },
  })

  useEffect(() => {
    if (!onboarding?.email || !onboarding?.token) {
      setOnboarding({
        openAlert: true,
        alertMessage: 'Seu código expirou. Solicite um novo código.',
      })
      router.push('/password-recovery')
    }
  }, [onboarding.email, onboarding.token, router, setOnboarding])

  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Redefina sua Senha</FormTitle>
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
          <TextField
            name="newPassword"
            label="Nova Senha"
            type={visibility1 ? 'text' : 'password'}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
                ? formik.errors.newPassword
                : 'A senha deve conter ao menos 6 caracteres.'
            }
            InputProps={{
              endAdornment: visibility1 ? (
                <EyeOpenIcon
                  onClick={() => setVisibility1(false)}
                  size={24}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <EyeClosedIcon
                  onClick={() => setVisibility1(true)}
                  size={24}
                  style={{ cursor: 'pointer' }}
                />
              ),
            }}
          />
          <TextField
            name="confirmPassword"
            label="Confirmar Senha"
            type={visibility2 ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
                ? formik.errors.confirmPassword
                : 'Confirmar senha.'
            }
            InputProps={{
              endAdornment: visibility2 ? (
                <EyeOpenIcon
                  onClick={() => setVisibility2(false)}
                  size={24}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <EyeClosedIcon
                  onClick={() => setVisibility2(true)}
                  size={24}
                  style={{ cursor: 'pointer' }}
                />
              ),
            }}
          />
        </FormGroup>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          disabled={isLoading}
          sx={{
            height: 43,
          }}
        >
          {isLoading ? <CircularProgress size={16} /> : 'Atualizar Senha'}
        </Button>
      </FormContainer>
    </OnboardingLayout>
  )
}
