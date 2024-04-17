import AppBar from '@mui/material/AppBar'
import LogoType from '../LogoType'
import ProfileMenu from '../ProfileMenu'
import Box from '@mui/material/Box'

export const headerHeight = '78px'

export default function Header() {
  return (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: headerHeight,
        px: 3,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1260px',
        }}
      >
        <LogoType />
        <ProfileMenu />
      </Box>
    </AppBar>
  )
}
