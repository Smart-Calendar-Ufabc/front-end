import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Providers from '@/providers/Providers'
import LogoType from '../LogoType'
import Footer from '../template/Footer'
import Container from '@mui/material/Container'

const Header = () => {
  return (
    <AppBar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 120,
        p: 2,
      }}
    >
      <LogoType />
    </AppBar>
  )
}

const FullSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: 'calc(100vh - 120px)',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 0,
        m: 0,
      }}
    >
      <Container
        sx={{
          py: 7.5,
          px: 3,
          height: '100%',
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          marginTop: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FullSection>{children}</FullSection>
      </Box>
      <Footer />
    </Providers>
  )
}

export default OnboardingLayout
