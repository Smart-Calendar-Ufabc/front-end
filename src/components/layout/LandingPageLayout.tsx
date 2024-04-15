import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Footer from '../template/Footer'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Providers from '@/providers/Providers'
import LogoType from '../LogoType'
import MobileUp from './responsive/MobileUp'
import Mobile from './responsive/Mobile'
import { User as UserIcon, List as ListIcon } from '@phosphor-icons/react'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => {
    setOpenMenu(true)
  }

  return (
    <AppBar
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 7.5,
        py: 2,
        height: '80px',
        [theme.breakpoints.down('md')]: {
          px: 2.5,
        },
      })}
    >
      <Box>
        <LogoType />
      </Box>
      <MobileUp>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => window.open('/sign-up', '_self')}
          >
            {'Cadastre-se'}
          </Button>
          <Button
            startIcon={<UserIcon />}
            onClick={() => window.open('/login', '_self')}
          >
            {'Entrar'}
          </Button>
        </Box>
      </MobileUp>
      <Mobile>
        <IconButton sx={{ p: 1 }} onClick={handleOpenMenu}>
          <Icon>
            <ListIcon />
          </Icon>
        </IconButton>
        <Drawer
          anchor="right"
          open={openMenu}
          onClose={() => setOpenMenu(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  typeof window !== 'undefined'
                    ? window.open('/sign-up', '_self')
                    : {}
                }
              >
                <ListItemText primary={'Cadastre-se'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  typeof window !== 'undefined'
                    ? window.open('/login', '_self')
                    : {}
                }
              >
                <ListItemText primary={'Entrar'} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </Mobile>
    </AppBar>
  )
}

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ marginTop: '80px' }}>
        {children}
      </Box>
      <Footer />
    </Providers>
  )
}

export default LandingPageLayout
