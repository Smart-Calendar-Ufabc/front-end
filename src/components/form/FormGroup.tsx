import MuiFormGroup from '@mui/material/FormGroup'

export default function FormGroup({ children }: { children: React.ReactNode }) {
  return (
    <MuiFormGroup
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 3, // 24px
        width: '100%',
      }}
    >
      {children}
    </MuiFormGroup>
  )
}
