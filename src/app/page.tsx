'use client'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Link from '@/components/typography/Link'

export default function Login() {
  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Entrar</FormTitle>
        <FormGroup>
          <TextField label="Email" type="email"/>
          <TextField label="Senha" type="password"/>
          <Link to="/password-recovery">Esqueceu a senha?</Link>
        </FormGroup>
        <Button variant="contained">Entrar</Button>
        <Typography>Ainda não é cadastrado? <Link to="/sign-up">Criar conta.</Link></Typography>
      </FormContainer>
    </OnboardingLayout>
  )
}
