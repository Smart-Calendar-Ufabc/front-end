import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import { User as UserIcon } from '@phosphor-icons/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

interface ScheduleCardMenuProps {
  id: string
  done: boolean
  open: boolean
  anchorEl: HTMLElement | null
  setAnchorEl: (value: HTMLElement | null) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function ScheduleCardMenu({
  id,
  onEdit,
  onDelete,
}: ScheduleCardMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit(id)
    handleClose()
  }

  const handleDelete = () => {
    onDelete(id)
    handleClose()
  }

  return (
    <Box>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: '50%',
          backgroundColor: 'grey.200',
        }}
      >
        <UserIcon size={24} weight="bold" />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          top: '4px',
        }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>
    </Box>
  )
}
