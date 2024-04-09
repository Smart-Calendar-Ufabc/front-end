'use client'

import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Link from '@/components/typography/Link'
import { Button, TextField, Typography } from '@mui/material'

export default function SignUp() {
  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Cadastre-se agora</FormTitle>
        <FormGroup>
          <FormGroup>
            <TextField label="E-mail" type="email"></TextField>
          </FormGroup>
          <FormGroup>
            <TextField
              label="Senha"
              type="password"
              helperText="A senha deve conter ao menos uma letra, um número e pelo menos um caractere especial."
            ></TextField>
          </FormGroup>
        </FormGroup>
        <Button variant="contained">Cadastrar</Button>
        <Typography>
          Já tem uma conta? <Link to="/">Entrar</Link>
        </Typography>
      </FormContainer>
    </OnboardingLayout>
  )
}
