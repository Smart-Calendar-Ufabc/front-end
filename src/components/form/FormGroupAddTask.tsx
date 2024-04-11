import MuiFormGroup from '@mui/material/FormGroup'

export default function FormGroup({ children }: { children: React.ReactNode }) {
  return (
    <MuiFormGroup
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: '8px',
        gap: '32px',
        width: '100%',
      }}
    >
      {children}
    </MuiFormGroup>
  )
}
