import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Providers from '@/providers/Providers'
import Footer from '../template/Footer'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Header, { headerHeight } from './UserHeader'

const drawerWidth = 180

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: headerHeight,
        }}
      >
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              mt: headerHeight,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            {[
              {
                key: 'profile',
                name: 'Perfil',
              },
            ].map(({ key, name }) => (
              <ListItem
                key={'settings-' + key}
                disablePadding
                sx={{
                  bgcolor: 'secondary.main',
                  borderRight: 3,
                  borderRightColor: 'primary.main',
                }}
              >
                <ListItemButton>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            p: 4,
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Providers>
  )
}

export default SettingsLayout
