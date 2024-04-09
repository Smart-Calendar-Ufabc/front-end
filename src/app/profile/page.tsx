'use client'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SettingsLayout from '@/components/layout/SettingsLayout'
import FormContainer from '@/components/form/FormContainerProfile'
import FormTitle from '@/components/form/FormTitleProfile'
import FormGroup from '@/components/form/FormGroup'
import FormGroupProfile from '@/components/form/FormGroupProfile'

export default function Settings() {
  return (
    <SettingsLayout>
      <FormContainer>
        <FormTitle>Editar Perfil</FormTitle>
        <FormGroupProfile>
          <Button
            variant="outlined"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 80,
              margin: '24px',
              backgroundImage: 'url(/images/blank-profile-picture.png)',
              backgroundSize: '170%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></Button>
          <Button
            variant="outlined"
            sx={{
              width: '126px',
              height: '40px',
              alignSelf: 'center',
              textTransform: 'none',
              fontSize: '18px',
            }}
          >
            Alterar Foto
          </Button>
        </FormGroupProfile>
        <FormGroup>
          <TextField label="Nome" type="name" />
        </FormGroup>
        <Button variant="contained">Salvar Alterações</Button>
      </FormContainer>
    </SettingsLayout>
  )
}
