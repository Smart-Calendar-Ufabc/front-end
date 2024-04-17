'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
// import { useAppStates } from '@/store/useAppStates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// import { signUpFetch } from '../api/sign-up'
import { CircularProgress } from '@mui/material'

export default function SignUp() {
  // const [openAlert, setOpenAlert] = useState(false)
  // const [alertMessage, setAlertMessage] = useState('')
  // const { setOnboarding } = useAppStates()
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async () => {
      setIsLoading(true)
      // const { data, status } = await signUpFetch(values)

      // if (status === 200) {
      //   setOpenAlert(true)
      //   setAlertMessage(
      //     'Um link para redefinição de senha foi enviado para o seu e-mail.',
      //   )
      //   formik.resetForm()
      // } else if (status === 404) {
      //   setIsLoading(false)
      //   formik.setErrors({
      //     email: 'Email não encontrado. Verifique se digitou corretamente.',
      //   })
      // } else if (status === 500) {
      //   setIsLoading(false)
      //   setOpenAlert(true)
      //   setAlertMessage('Erro interno no servidor.')
      // }
    },
  })

  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Recuperar Conta</FormTitle>
        {/* {openAlert && (
          <Alert
            severity="error"
            onClose={() => {
              setOpenAlert(false)
            }}
          >
            {alertMessage}
          </Alert>
        )} */}
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
        >
          {isLoading ? <CircularProgress size={16} /> : 'Enviar Código'}
        </Button>
      </FormContainer>
    </OnboardingLayout>
  )
}
