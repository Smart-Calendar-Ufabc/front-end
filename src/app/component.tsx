import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import Link from '@/components/typography/Link'
import { loginFetch } from './api/login'
import { useAppStates } from '@/store/useAppStates'
import Alert from '@mui/material/Alert'
import { CircularProgress } from '@mui/material'

export default function FormLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { setAuthToken } = useAppStates()

  const validationSchema = yup.object({
    email: yup.string().required('Informe o email').email('Email inválido'),
    password: yup.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      const { data, status } = await loginFetch(values)
      if (status === 200 && data?.token) {
        setAuthToken(data.token)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('authToken', data.token)
          window.location.href = '/home'
        }
      } else if (data?.errors) {
        setIsLoading(false)
        formik.setErrors({
          email: data.errors.email?.join(', '),
          password: data.errors.password?.join(', '),
        })
      } else if (status === 401) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Credenciais inválidas')
      } else if (status === 500) {
        setIsLoading(false)
        setOpenAlert(true)
        setAlertMessage('Erro interno no servidor')
      }
    },
  })

  return (
    <FormContainer>
      <FormTitle>Entrar</FormTitle>
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
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="password"
          label="Senha"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Link to="/password-recovery">Esqueceu a senha?</Link>
      </FormGroup>
      <Button
        variant="contained"
        onClick={formik.submitForm}
        disabled={isLoading}
        sx={{
          height: 40,
        }}
      >
        {isLoading ? <CircularProgress size={16} /> : 'Entrar'}
      </Button>
      <Typography>
        Ainda não é cadastrado? <Link to="/sign-up">Criar conta.</Link>
      </Typography>
    </FormContainer>
  )
}
