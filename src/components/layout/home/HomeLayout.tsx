'use client'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Providers from '@/providers/Providers'
import Footer from '../../template/Footer'
import Header from '../UserHeader'
import Container from '@mui/material/Container'
import { TourProvider } from '@reactour/tour'

import './styles.css'

const FullSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        minHeight: 'calc(100vh - 200px)',
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
  const steps = [
    {
      selector: '.add-task-button',
      content:
        'Vamos começar! Clique neste botão para simular uma criação de adicionar tarefa',
    },
    {
      selector: '.unallocated-tasks-button',
      content:
        'Todas as tarefas recém adicionadas pela navegação principal são movidas para esta área de "Tarefas Não Alocadas". Clique neste botão para conferir as tarefas não alocadas.',
    },
    {
      selector: '.allocate-tasks-button',
      content:
        'Agora você já pode realizar um agendamento automatizado. Clique neste botão e inicie uma simulação.',
    },
    {
      selector: '.suggestion-schedule-button',
      content: 'Clique neste botão para aprovar o agendamento.',
    },
    {
      selector: '.delete-all-button',
      content: 'Clique neste botão para apagar a tarefa teste agendada.',
    },
  ]

  return (
    <TourProvider
      steps={steps}
      className="ease-calendar-tour"
      disableDotsNavigation
    >
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
    </TourProvider>
  )
}

export default HomeLayout
