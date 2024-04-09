import MuiFormGroup from '@mui/material/FormGroup'

export default function FormGroup({ children }: { children: React.ReactNode }) {
    return (
        <MuiFormGroup
            sx={{
                display: 'flex',
                alignItemspx: 'center',
                gap: '5px',
                flexDirection: 'row',
                justifyContent: 'center',
                borderTop: '1px solid lightgray',
                borderBottom: '1px solid lightgray',
            }}
        >
            {children}
        </MuiFormGroup>
    )
}
