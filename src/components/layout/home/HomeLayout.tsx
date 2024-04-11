'use client'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Providers from '@/providers/Providers'
import Footer from '../../template/Footer'
import Header from '../UserHeader'
import Container from '@mui/material/Container'

const FullSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        minHeight: 'calc(100vh - 80px)',
        width: '100vw',
        p: 0,
        m: 0,
        [theme.breakpoints.down('md')]: {
          minHeight: 'auto',
        },
      })}
    >
      <Container
        sx={{
          py: 7.5,
          px: 3,
          height: '100%',
          '&.MuiContainer-root': {
            maxWidth: '1308px',
          },
        }}
      >
        {children}
      </Container>
    </Box>
  )
}

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          marginTop: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <FullSection>{children}</FullSection>
      </Box>
      <Footer />
    </Providers>
  )
}

export default HomeLayout
