import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import { User as UserIcon, CaretDown as MenuIcon } from '@phosphor-icons/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { useAppStates } from '@/store/useAppStates'
import { useProfileStates } from '@/store/useProfileStates'
import { logoutFetch } from '@/app/api/logout'
import { LoadingDialog } from './dialogs/LoadingDialog'
import AlertDialog from './dialogs/AlertDialog'
import { useRouter } from 'next/navigation'
import { useSchedulesStates } from '@/store/useSchedulesStates'
import { useUnallocatedTaskStates } from '@/store/useUnallocatedTaskStates'

export default function ProfileMenu() {
  const { setAuthToken } = useAppStates()
  const { profile, setProfile } = useProfileStates()
  const { setSchedules } = useSchedulesStates()
  const { setUnallocatedTasks } = useUnallocatedTaskStates()

  const [openAlertDialog, setOpenAlertDialog] = React.useState<boolean>(false)
  const [alertDialogMessage, setAlertDialogMessage] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = React.useCallback(async () => {
    setIsLoading(true)
    handleClose()
    setAuthToken(null)

    const { status } = await logoutFetch()

    if (status === 204) {
      setAuthToken(null)
      setProfile(null)
      setSchedules([])
      setUnallocatedTasks([])
      setAuthToken(null)
      router.push('/')
    } else {
      setIsLoading(false)
      setOpenAlertDialog(true)
      setAlertDialogMessage(
        'Ops... Ocorreu um erro ao encerrar a sessão. Verifique a sua conexão com a internet e tente novamente!',
      )
    }
  }, [setAuthToken, setProfile, setSchedules, setUnallocatedTasks, router])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const profileStorage = localStorage.getItem('profile')

      if (profileStorage) {
        const newProfile = JSON.parse(profileStorage) as {
          name: string
          avatar_image_url?: string
          sleepHours?: {
            start: {
              hour: number
              minutes: number
            }
            end: {
              hour: number
              minutes: number
            }
          }
        }

        setProfile({
          name: newProfile.name,
          avatarUrl:
            newProfile?.avatar_image_url && newProfile.avatar_image_url,
          sleepHours: newProfile?.sleepHours && {
            start: {
              hour: newProfile.sleepHours.start.hour,
              minutes: newProfile.sleepHours.start.minutes,
            },
            end: {
              hour: newProfile.sleepHours.end.hour,
              minutes: newProfile.sleepHours.end.minutes,
            },
          },
        })
      }
    }
  }, [setProfile])

  return (
    <Box>
      <LoadingDialog open={isLoading} message="Encerrando a sessão..." />
      <AlertDialog
        open={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}
        onConfirm={() => setOpenAlertDialog(false)}
        title={alertDialogMessage}
        confirmText="Ok"
      />

      <Box
        sx={{
          color: open ? 'primary.main' : 'grey.500',
          borderColor: open ? 'primary.main' : 'grey.200',
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main',
          },
        }}
      >
        <IconButton
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            borderRadius: '50%',
            backgroundColor: 'grey.200',
            p: profile?.avatarUrl && 0,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'inherit',
          }}
        >
          {profile?.avatarUrl ? (
            <Box
              sx={{
                backgroundImage: `url(${profile.avatarUrl})`,
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
            pr: 0,
            pb: 1.25,
            pt: 1.25,
            color: 'inherit',
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
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
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
