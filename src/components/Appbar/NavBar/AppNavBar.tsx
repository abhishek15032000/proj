import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
// import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
// import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
// import SettingsIcon from '@mui/icons-material/Settings'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Button, Grid } from '@mui/material'
// import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { pathNames } from '../../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setLoadWallet } from '../../../redux/Slices/walletSlice'
import { Colors } from '../../../theme'
import NotificationList from '../../../atoms/NotificationList'
import NotificationIcon from './NotificationIcon'
import Help from './Help/Help'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}))

export default function AppNavBar({ handleDrawerToggle }: any) {
  const dispatch = useAppDispatch()
  const openWallet = () => {
    console.log('load wallet')
    dispatch(setLoadWallet(true))
    console.log('done')
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const walletConnected = useAppSelector((state) => state.wallet.isConnected)
  const navigate = useNavigate()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const logout = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    navigate(pathNames.LOGOUT, { replace: true })
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge
            // badgeContent={17}
            color="error"
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  )

  return (
    <>
      {/* <AppBar position="static" elevation={0}> */}
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search> */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative' }}>
          {/* <SelectDropdown /> */}

          <Box
            sx={{
              flexGrow: 1,
              // mx: ,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Button
              onClick={() => openWallet()}
              color="primary"
              sx={{
                flexDirection: 'row',
                alignItems: 'center',

                display: 'flex',

                textTransform: 'none',
              }}
            >
              <CreditCardRoundedIcon />
              {walletConnected && (
                <CheckCircleIcon
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 17,
                    fontSize: 6,
                    color: Colors.success,
                  }}
                />
              )}
              <Typography sx={{ mx: 1, fontWeight: 500 }}>Wallet</Typography>
            </Button>
          </Box>
          <Help />
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="primary"
          >
            <Badge color="error">
              <SettingsOutlinedIcon />
            </Badge>
          </IconButton>

          <NotificationIcon />

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="primary"
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="primary"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {/* </AppBar> */}
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
