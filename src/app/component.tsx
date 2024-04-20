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
import { loginFetch } from '../api/login'
import { useAppStates } from '@/store/useAppStates'
import Alert from '@mui/material/Alert'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useProfileStates } from '@/store/useProfileStates'
import {
  EyeSlash as EyeClosedIcon,
  Eye as EyeOpenIcon,
} from '@phosphor-icons/react'

export default function FormLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [visibility, setVisibility] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const { setAuthToken, onboarding, setOnboarding } = useAppStates()
  const { setProfile } = useProfileStates()

  const router = useRouter()

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
      setOpenAlert(false)
      setIsLoading(true)
      setOnboarding({ openAlert: false, alertMessage: '' })
      const { data, status } = await loginFetch(values)

      if (status === 200 && data?.token) {
        setAuthToken(data.token)
        setOnboarding({
          completed: Boolean(data?.onboardingCompleted),
        })

        if (data?.profile) {
          setProfile({
            name: data.profile.name,
            avatarUrl: data.profile?.avatar_image_url,
            sleepHours: data.profile?.sleepHours,
          })
        }
        router.push('/home')
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
      {onboarding.openAlert && (
        <Alert
          severity="success"
          onClose={() => {
            setOnboarding({ openAlert: false })
          }}
        >
          {onboarding.alertMessage}
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
          type={visibility ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
        Ainda não é cadastrado? <Link to="/signup">Criar conta.</Link>
      </Typography>
    </FormContainer>
  )
}
