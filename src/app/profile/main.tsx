'use client'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormTitle from '@/components/form/FormTitleProfile'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'

export default function SettingsMain() {
  return (
    <Box
      sx={{
        display: 'flex',
        marginLeft: '219',
        marginTop: '153',
        flexDirection: 'column',
        alignContent: 'center',
        gap: '32px',
        width: '400px',
        height: '281px',
        alignItems: 'stretch',
      }}
    >
      <FormTitle>Editar Perfil</FormTitle>
      <FormGroup
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flexDirection: 'row',
          justifyContent: 'center',
          borderTop: '1px solid lightgray',
          borderBottom: '1px solid lightgray',
        }}
      >
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
            fontSize: '18px',
          }}
        >
          Alterar Foto
        </Button>
      </FormGroup>
      <FormGroup
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 3, // 24px
          width: '100%',
        }}
      >
        <TextField label="Nome" type="name" />
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            fontSize: '20px',
          }}
        >
          Salvar Alterações
        </Button>
      </FormGroup>
    </Box>
  )
}
