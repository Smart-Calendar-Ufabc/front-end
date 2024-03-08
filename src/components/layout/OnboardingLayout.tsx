import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Providers from '@/providers/Providers'
import LogoType from '../LogoType'
import Footer from '../template/Footer'

const Header = () => {
	return (
		<AppBar
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				height: 120,
				p: 2
			}}
		>
			<LogoType />
		</AppBar>
	)
}

const OnboardingLayout = ({children}: {children: React.ReactNode}) => {
	return (
		<Providers>
			<CssBaseline />
			<Header />
			<Box component="main" sx={{marginTop: '120px'}}>
				{children}
			</Box>
			<Footer />
		</Providers>
	)
}

export default OnboardingLayout
