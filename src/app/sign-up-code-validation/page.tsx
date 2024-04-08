'use client'

import FormContainer from '@/components/form/FormContainer'
import FormGroup from '@/components/form/FormGroup'
import FormTitle from '@/components/form/FormTitle'
import OnboardingLayout from '@/components/layout/OnboardingLayout'
import Link from '@/components/typography/Link'
import { Button, FormHelperText, TextField, Typography } from '@mui/material'

export default function SignUpCodeValidation() {
  return (
    <OnboardingLayout>
      <FormContainer>
        <FormTitle>Confirme seu e-mail</FormTitle>
        <FormGroup>
        <Typography>
        Enviamos um e-mail com um código de verificação para "e-mail". (<Link to=''>não é você?</Link>)
        </Typography>
        <Typography>Insira-o código abaixo para confirmar o seu e-mail.</Typography>
        <FormGroup>
        <TextField label="Código" type="code" helperText="O código deve conter 6 dígitos."></TextField>
        </FormGroup>
        </FormGroup>
        <Button variant="contained">Verificar</Button>
      </FormContainer>
    </OnboardingLayout>
  )
}
