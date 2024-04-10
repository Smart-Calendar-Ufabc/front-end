import { useState } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Providers from '@/providers/Providers'
import Footer from '../../template/Footer'
import Header from '../UserHeader'
import Container from '@mui/material/Container'
import { Theme } from '@mui/material/styles'
import { Button, Typography } from '@mui/material'
import { SystemStyleObject } from '@mui/system/styleFunctionSx'
import { Tag as TagIcon } from '@phosphor-icons/react'
import { DialogManageTags } from '@/components/layout/home/DialogManageTags'
import { DialogAddTask } from './DialogAddTask'
import { DialogAddRoutine } from './DialogAddRoutine'
import { DialogUnallocatedTasks } from './DialogUnallocatedTasks'

const getBrazilianDate = () => {
  const date = new Date()

  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const FullSection = ({
  children,
  sx,
}: {
  children: React.ReactNode
  sx?: SystemStyleObject<Theme>
}) => {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        minHeight: 'calc(100vh - 80px)',
        width: '100vw',
        p: 0,
        m: 0,
        ...sx,
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
  const [openDialogManageTags, setOpenDialogManageTags] =
    useState<boolean>(false)
  const [openDialogAddTask, setOpenDialogAddTask] = useState<boolean>(false)
  const [openDialogAddRoutine, setOpenDialogAddRoutine] =
    useState<boolean>(false)
  const [openDialogUnallocatedTasks, setOpenDialogUnallocatedTasks] =
    useState<boolean>(false)

  const date = getBrazilianDate()

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
        <FullSection>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">{date}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setOpenDialogUnallocatedTasks(true)}
              >
                Tarefas Não Alocadas
              </Button>
              <Button
                variant="outlined"
                endIcon={<TagIcon />}
                onClick={() => setOpenDialogManageTags(true)}
              >
                Gerenciar Tags
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenDialogAddRoutine(true)}
              >
                Adicionar Rotina
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenDialogAddTask(true)}
              >
                Adicionar Tarefa
              </Button>
            </Box>
          </Box>
          <DialogManageTags
            open={openDialogManageTags}
            onClose={() => setOpenDialogManageTags(false)}
          />
          <DialogAddTask
            open={openDialogAddTask}
            onClose={() => setOpenDialogAddTask(false)}
          />
          <DialogAddRoutine
            open={openDialogAddRoutine}
            onClose={() => setOpenDialogAddRoutine(false)}
          />
          <DialogUnallocatedTasks
            open={openDialogUnallocatedTasks}
            onClose={() => setOpenDialogUnallocatedTasks(false)}
          />
          {children}
        </FullSection>
      </Box>
      <Footer />
    </Providers>
  )
}

export default HomeLayout
