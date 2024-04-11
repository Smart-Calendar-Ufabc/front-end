import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { X as CloseIcon, Trash as TrashIcon } from '@phosphor-icons/react'
import { useTagStates } from '@/store/useTagStates'

import { Tooltip } from '@/components/typography/Tooltip'
import { initialTags } from '@/seed/tags'
import AlertDialog from './AlertDialog'

interface DialogManageTagsProps {
  open: boolean
  onClose: () => void
}

export function DialogManageTags({ open, onClose }: DialogManageTagsProps) {
  const theme = useTheme()
  const defaultColor = theme.palette.grey[200]

  const [color, setColor] = useState<string>(defaultColor)
  const [title, setTitle] = useState<string>('')

  const { tags, setTags, addTag, deleteTag } = useTagStates()

  const handleAddTag = () => {
    if (title.trim() === '') return // Prevent empty tags

    addTag({
      id: crypto.randomUUID(),
      title,
      color,
    })

    setTitle('')
    setColor(defaultColor)
  }

  const handleDeleteTag = (id: string) => {
    deleteTag(id)
  }

  useEffect(() => {
    setTags(initialTags)
  }, [setTags])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          width: 500,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Gerenciar Tags</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {tags.length === 0 ? (
          <Typography color="text.secondary">
            Adicionar tags às suas tarefas é uma ótima maneira de categorizá-las
            e organizá-las de acordo com diferentes projetos, prioridades ou
            temas. Ao atribuir tags relevantes, você pode facilmente filtrar e
            encontrar suas tarefas quando necessário.
          </Typography>
        ) : (
          <Box>
            {tags.map((tag) => (
              <TagManager
                key={tag.id}
                id={tag.id}
                title={tag.title}
                color={tag.color}
                onDelete={handleDeleteTag}
              />
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          px: 2.5,
        }}
      >
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            width: '100%',
          }}
        >
          <Tooltip title="Adicionar Cor" placement="top">
            <input
              className="color-picker-input"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Tooltip>
          <TextField
            name="title"
            type="text"
            label="Título"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            sx={{
              py: '10px',
            }}
            onClick={handleAddTag}
          >
            Adicionar
          </Button>
        </FormGroup>
      </DialogActions>
    </Dialog>
  )
}

interface TagManagerProps {
  id: string
  title: string
  color: string
  onDelete: (id: string) => void
}

function TagManager({ id, color, title, onDelete }: TagManagerProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleDelete = () => {
    onDelete(id)
    setOpenDeleteDialog(false)
  }

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  return (
    <>
      <AlertDialog
        open={openDeleteDialog}
        title="Deseja realmente excluir esta tag?"
        message="Esta ação não poderá ser desfeita. Ao excluir esta tag, ela será removida de todas os agendamentos associadas a ela."
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 1,
              height: 20,
              width: 20,
            }}
          />
          <Typography>{title}</Typography>
        </Box>
        <Box>
          <Tooltip title="Remover tag" arrow placement="left">
            <IconButton
              onClick={handleOpenDeleteDialog}
              title="Remover tag"
              aria-label="Remover tag"
              sx={{
                color: 'grey.600',
                '&:hover': {
                  color: 'error.main',
                  backgroundColor: 'grey.100',
                },
              }}
            >
              <TrashIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  )
}
