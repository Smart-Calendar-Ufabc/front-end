import { useState } from 'react'
import { Box, Button, Icon, Stack, Typography } from '@mui/material'
import { Tag as TagIcon, Plus as PlusIcon } from '@phosphor-icons/react'
import { DialogManageTags } from '@/components/dialogs/DialogManageTags'
import { DialogAddTask } from './dialogs/DialogAddTask'
import { DialogAddRoutine } from './dialogs/DialogAddRoutine'
import { DialogUnallocatedTasks } from './dialogs/DialogUnallocatedTasks'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'
import { getBrazilianDate } from '@/helpers/date'
import { Tooltip } from './typography/Tooltip'

export default function ActionToolbar() {
  const [openDialogManageTags, setOpenDialogManageTags] =
    useState<boolean>(false)
  const [openDialogAddTask, setOpenDialogAddTask] = useState<boolean>(false)
  const [openDialogAddRoutine, setOpenDialogAddRoutine] =
    useState<boolean>(false)
  const [openDialogUnallocatedTasks, setOpenDialogUnallocatedTasks] =
    useState<boolean>(false)

  const { countUnallocatedTasks } = useUnallocatedTaskStates()

  const date = getBrazilianDate()

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          [theme.breakpoints.down('sm')]: {
            alignItems: 'flex-start',
            flexDirection: 'column',
          },
        })}
      >
        <Typography variant="h6">{date}</Typography>
        <Box display="grid">
          <Stack
            direction="row"
            spacing={1}
            sx={{
              overflowX: 'auto',
              pb: 2,
            }}
          >
            <Tooltip
              title={'Não existem tarefas para serem alocadas'}
              disableHoverListener={Boolean(countUnallocatedTasks)}
            >
              <Button
                variant="outlined"
                disabled={!countUnallocatedTasks}
                onClick={() => setOpenDialogUnallocatedTasks(true)}
                endIcon={
                  countUnallocatedTasks ? (
                    <Icon
                      sx={{
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      <span style={{ fontSize: '.875rem' }}>
                        {countUnallocatedTasks}
                      </span>
                    </Icon>
                  ) : undefined
                }
                sx={(theme) => ({
                  '&::before': {
                    content: '"Tarefas Não Alocadas"',
                  },
                  '&.Mui-disabled': {
                    pointerEvents: 'auto',
                  },
                  [theme.breakpoints.down('md')]: {
                    flex: 'none',
                    '&::before': {
                      content: '"Não Alocadas"',
                    },
                  },
                })}
              />
            </Tooltip>
            <Button
              variant="outlined"
              endIcon={<TagIcon />}
              onClick={() => setOpenDialogManageTags(true)}
              sx={(theme) => ({
                flex: 'none',
                '&::before': {
                  content: '"Gerenciar Tags"',
                },
                [theme.breakpoints.down('sm')]: {
                  '&::before': {
                    content: '"Tags"',
                  },
                },
              })}
            ></Button>
            <Button
              variant="outlined"
              endIcon={<PlusIcon />}
              onClick={() => setOpenDialogAddRoutine(true)}
              sx={(theme) => ({
                flex: 'none',
                '&::before': {
                  content: '" Adicionar Rotina"',
                },
                [theme.breakpoints.down('sm')]: {
                  '&::before': {
                    content: '"Rotina"',
                  },
                },
              })}
            ></Button>
            <Button
              variant="contained"
              endIcon={<PlusIcon />}
              onClick={() => setOpenDialogAddTask(true)}
              sx={(theme) => ({
                flex: 'none',
                '&::before': {
                  content: '" Adicionar Tarefa"',
                },
                [theme.breakpoints.down('sm')]: {
                  '&::before': {
                    content: '"Tarefa"',
                  },
                },
              })}
            ></Button>
          </Stack>
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
