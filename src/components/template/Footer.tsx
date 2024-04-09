import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LogoType from '../LogoType'

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={theme => ({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 2,
				bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[100] : '#1B1B1B',
				height: 250,
				width: '100%',
				marginTop: 15,
			})}
		>
			<LogoType component="footer" />
			<Box>
				<Typography
					variant="body2"
					sx={theme => ({ color: '#8b8b8b', textAlign: 'center' })}
				>
					Calendário de Organização Pessoal
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: '#8b8b8b', mt: 1, textAlign: 'center' }}
				>
					© 2024 Todos os direitos reservados
				</Typography>
			</Box>
		</Box>
	)
}

export default Footer
