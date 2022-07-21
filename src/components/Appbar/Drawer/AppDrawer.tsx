import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import _ from 'lodash'
import * as React from 'react'
import { shallowEqual } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { ROLES } from '../../../config/roles.config'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { linkLabels, pathNames } from '../../../routes/pathNames'
import { privateRouteComponents } from '../../../routes/routeComponents'
import RouteController from '../../../routes/RouteController'
import { Colors } from '../../../theme'
import AppNavBar from '../NavBar/AppNavBar'
import MENUS from './MenuList'
const drawerWidth = 240

export default function ResponsiveDrawer(props: any) {
  const location = useLocation()

  const userDataRoles = useAppSelector(
    (state) => state.auth.data.roles,
    shallowEqual
  )

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const linkRenderer = (text: string) => {
    const item = privateRouteComponents.find((i) => i.sidebarName === text)
    if (item) {
      return item.path
    } else {
      return ''
    }
  }

  const activeRoute = (path: string, location: any) => {
    const routeName =
      privateRouteComponents.find((i) => i.sidebarName === path)?.path || ''
    return location?.pathname === routeName ? true : false
  }

  const iconRenderer = (text: string, location: string) => {
    let IconComponent
    switch (text) {
      case linkLabels.Projects:
        IconComponent = InboxIcon
        break

      default:
        IconComponent = null
    }
    if (IconComponent) {
      return (
        <IconComponent
          style={{
            color: Colors.black,
            opacity: activeRoute(text, location) ? 1 : 0.5,
          }}
        />
      )
    } else {
      return null
    }
  }

  const midMenu = React.useCallback(() => {
    if (
      _.intersectionWith(userDataRoles, [ROLES.ISSUER], _.isEqual).length > 0
    ) {
      return MENUS.issuer_menus
    } else {
      return []
    }
  }, [userDataRoles])

  const NavListItem = ({
    linkLabels,
    active,
    location,
  }: {
    linkLabels: string
    active: boolean
    location: any
  }) => {
    return (
      <ListItemButton>
        {iconRenderer(linkLabels, location) ? (
          <ListItemIcon style={{ minWidth: 30 }}>
            {iconRenderer(linkLabels, location)}
          </ListItemIcon>
        ) : (
          <div className="pb-2"></div>
        )}
        <ListItemText
          primary={
            <Typography
              style={{
                fontWeight: active ? '500' : '400',
                opacity: active ? 1 : 0.5,
                fontSize: 14,
                // paddingLeft: !iconRenderer(linkLabels, location) ? 5 : 5,
                paddingLeft: 5,
              }}
            >
              {linkLabels}
            </Typography>
          }
          disableTypography
        />
      </ListItemButton>
    )
  }

  const drawer = (
    <Box
      component={'div'}
      // sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Toolbar />
      <div style={{ height: '25%' }}></div>

      <List sx={{ mt: 1 }}>
        {midMenu().map((text, index) => (
          <NavLink
            key={index.toString()}
            to={linkRenderer(text)}
            style={{
              textDecoration: 'none',
              color: Colors.black,
              fontWeight: activeRoute(text, location) ? '700' : '500',
              padding: '10px 0',
            }}
          >
            <ListItem key={linkLabels.Projects}>
              <NavListItem
                linkLabels={text}
                active={activeRoute(text, location)}
                location={location}
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <List sx={{ marginTop: screen.height / 3.5 - midMenu().length + 'px' }}>
        <NavLink
          to={pathNames.LOGOUT}
          style={{ textDecoration: 'none', color: Colors.secondary }}
        >
          {' '}
          <ListItem key={linkLabels.Projects}>
            <NavListItem
              linkLabels={'Logout'}
              active={true}
              location={location}
            />
          </ListItem>
        </NavLink>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <AppNavBar handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}
