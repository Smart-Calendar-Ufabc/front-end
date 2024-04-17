import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import {
  User as UserIcon,
  CaretDown as MenuIcon,
  CloudArrowDown as BackupIcon,
  BellRinging as NotificationIcon,
} from '@phosphor-icons/react'
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
import Button from '@mui/material/Button'
import dayjs from 'dayjs'
import { downloadJSON } from '@/helpers/file'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'

export default function ProfileMenu() {
  const { setAuthToken } = useAppStates()
  const { profile, setProfile } = useProfileStates()
  const { schedules, setSchedules } = useSchedulesStates()
  const { unallocatedTasks, setUnallocatedTasks } = useUnallocatedTaskStates()

  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] =
    React.useState<boolean>(false)
  const [openAlertDialog, setOpenAlertDialog] = React.useState<boolean>(false)
  const [alertDialogMessage, setAlertDialogMessage] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const [anchorElInfoPopover, setAnchorElInfoPopover] =
    React.useState<null | HTMLElement>(null)
  const openInfoPopover = Boolean(anchorElInfoPopover)

  const handleOpenInfoPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElInfoPopover(event.currentTarget)
  }

  const handleCloseInfoPopover = () => {
    setAnchorElInfoPopover(null)
  }

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

    const { status } = await logoutFetch()

    if (status === 200) {
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

  const handleBackup = React.useCallback(() => {
    const date = dayjs().utc().format('YYYY-MM-DD')

    downloadJSON({
      data: {
        schedules,
        unallocatedTasks,
      },
      fileName: `ease-calendar-${date}.json`,
    })
  }, [schedules, unallocatedTasks])

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
      <AlertDialog
        open={openLogoutAlertDialog}
        onClose={() => setOpenLogoutAlertDialog(false)}
        onConfirm={handleLogout}
        title="Deseja realmente sair?"
        message="Estamos empenhados em garantir a segurança dos seus agendamentos. Enquanto o sistema está em desenvolvimento, os dados não estão sendo permanentemente armazenados. Para preservar seus agendamentos, recomendamos fazer o backup clicando no botão abaixo antes de sair. Assim, ao retornar, você poderá restaurar facilmente esses dados e continuar de onde parou."
        confirmText="Sair"
        cancelText="Cancelar"
      >
        <Button
          variant="contained"
          startIcon={<BackupIcon />}
          onClick={handleBackup}
          sx={{ mt: 2 }}
        >
          Fazer Backup
        </Button>
      </AlertDialog>
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
              right: 26,
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
        <MenuItem
          onClick={() => {
            handleClose()
            setOpenLogoutAlertDialog(true)
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Box>
          <IconButton
            id="fade-button"
            aria-owns={openInfoPopover ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handleOpenInfoPopover}
            onMouseLeave={handleCloseInfoPopover}
            sx={{
              color: openInfoPopover ? 'error.main' : 'grey.500',
              pr: 0,
              pb: 0,
              pt: 0.25,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <NotificationIcon size={24} weight="duotone" />
          </IconButton>
          <Popover
            open={openInfoPopover}
            anchorEl={anchorElInfoPopover}
            onClose={handleCloseInfoPopover}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 36, vertical: 24 }}
            sx={{
              pointerEvents: 'none',
            }}
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
            <Typography
              sx={{
                p: 1.5,
                maxWidth: 300,
                color: 'text.secondary',
              }}
            >
              Estamos empenhados em garantir a segurança dos seus agendamentos.
              Enquanto o sistema está em desenvolvimento, os dados não estão
              sendo permanentemente armazenados. Recomendamos sempre fazer o
              backup antes de sair
            </Typography>
          </Popover>
        </Box>
        <Box
          sx={{
            color: open ? 'primary.main' : 'grey.500',
            cursor: 'pointer',
            borderColor: open ? 'primary.main' : 'grey.200',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              borderColor: 'primary.main',
              color: 'primary.main',
            },
          }}
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Icon
            sx={{
              borderRadius: '50%',
              backgroundColor: 'grey.200',
              p: profile?.avatarUrl && 0,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'inherit',
              height: 40,
              width: 40,
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
          </Icon>
          <Icon
            sx={{
              color: 'inherit',
              fontSize: 16,
            }}
          >
            <MenuIcon size={16} weight="bold" />
          </Icon>
        </Box>
      </Box>
    </Box>
  )
}
