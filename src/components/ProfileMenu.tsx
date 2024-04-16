import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import { User as UserIcon, CaretDown as MenuIcon } from '@phosphor-icons/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { useAppStates } from '@/store/useAppStates'

export default function ProfileMenu() {
  let profile: {
    avatar_image_url: string
  } | null = null

  if (typeof window !== 'undefined') {
    profile = JSON.parse(localStorage.getItem('profile') || 'null') as {
      avatar_image_url: string
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { setAuthToken } = useAppStates()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    setAuthToken(null)

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('authToken')
      window.location.href = '/'
    }
  }

  return (
    <Box>
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
            p: profile?.avatar_image_url && 0,
          }}
        >
          {profile?.avatar_image_url ? (
            <Box
              sx={{
                backgroundImage: `url(${profile.avatar_image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50%',
                backgroundRepeat: 'no-repeat',
                width: '40px',
                height: '40px',
              }}
            />
          ) : (
            <UserIcon size={24} weight="bold" />
          )}
        </IconButton>
        <IconButton
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            color: 'grey.500',
            pr: 0,
            pb: 1.25,
            pt: 1.25,
          }}
        >
          <MenuIcon size={16} weight="bold" />
        </IconButton>
      </Box>
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
        <Link href="/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
