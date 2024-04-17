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
import { signUpFetch } from '../api/sign-up'
import { Alert, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import {
  EyeSlash as EyeClosedIcon,
  Eye as EyeOpenIcon,
} from '@phosphor-icons/react'

export default function SignUp() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { setOnboarding } = useAppStates()
  const [isLoading, setIsLoading] = useState(false)
  const [visibility, setVisibility] = useState(false)

  const router = useRouter()

  const validationSchema = yup.object({
    email: yup.string().required('Informe o email').email('Email inválido'),
    password: yup
      .string()
      .required('Informe a senha')
      .min(6, 'Senha deve ter ao menos 6 caracteres'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const { data, status } = await signUpFetch(values)

      if (status === 200) {
        setOnboarding({ email: values.email })
        router.push('/sign-up/code-validation')
      } else if (status === 409) {
        setIsLoading(false)
        formik.setErrors({
          email: 'Usuário já cadastrado com este email',
        })
      } else if (data?.errors) {
        setIsLoading(false)
        formik.setErrors({
          email: data.errors.email?.join(', '),
          password: data.errors.password?.join(', '),
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
        <FormTitle>Cadastre-se agora</FormTitle>
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
          <FormGroup>
            <TextField
              name="password"
              label="Senha"
              type={visibility ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && Boolean(formik.errors.password)
                  ? formik.errors.password
                  : 'A senha deve conter ao menos 6 caracteres.'
              }
              InputProps={{
                endAdornment: visibility ? (
                  <EyeOpenIcon
                    onClick={() => setVisibility(false)}
                    size={24}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <EyeClosedIcon
                    onClick={() => setVisibility(true)}
                    size={24}
                    style={{ cursor: 'pointer' }}
                  />
                ),
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
          {isLoading ? <CircularProgress size={16} /> : 'Cadastrar'}
        </Button>
        <Typography>
          Já tem uma conta? <Link to="/">Entrar</Link>
        </Typography>
      </FormContainer>
    </OnboardingLayout>
  )
}
