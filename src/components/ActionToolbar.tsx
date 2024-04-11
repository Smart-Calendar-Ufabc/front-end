import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Tag as TagIcon } from '@phosphor-icons/react'
import { DialogManageTags } from '@/components/dialogs/DialogManageTags'
import { DialogAddTask } from './dialogs/DialogAddTask'
import { DialogAddRoutine } from './layout/home/DialogAddRoutine'
import { DialogUnallocatedTasks } from './dialogs/DialogUnallocatedTasks'

const getBrazilianDate = () => {
  const date = new Date()

  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ActionToolbar() {
  const [openDialogManageTags, setOpenDialogManageTags] =
    useState<boolean>(false)
  const [openDialogAddTask, setOpenDialogAddTask] = useState<boolean>(false)
  const [openDialogAddRoutine, setOpenDialogAddRoutine] =
    useState<boolean>(false)
  const [openDialogUnallocatedTasks, setOpenDialogUnallocatedTasks] =
    useState<boolean>(false)

  const date = getBrazilianDate()

  return (
    <>
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
    </>
  )
}
