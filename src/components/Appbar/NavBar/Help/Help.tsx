import { Button, Menu, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HelpContent from './HelpContent'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../../../routes/pathNames'

const Help = () => {
  const location = useLocation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (location.pathname === pathNames.ISSUANCE_DATA_COLLECTION)
      setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <Button
        color="primary"
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
          textTransform: 'none',
        }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <HelpOutlineOutlinedIcon />
        <Typography sx={{ mx: 1, fontWeight: 500 }}>Help</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          boxShadow: 'none',
          '.MuiMenu-paper': {
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
            borderRadius: '16px',
            py: 2,
            px: 2,
            height: '100%',
          },
        }}
      >
        <Box sx={{ width: '400px', borderRadius: '16px' }}>
          <HelpContent closeMenu={handleClose} />
        </Box>
      </Menu>
    </Box>
  )
}

export default Help
