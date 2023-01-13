import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const sections = [
  'Section A',
  'Section B',
  'Section C',
  'Section D',
  'Section E',
]
export default function SelectSections() {
  const [selectedSection, setSelectedSection] = React.useState('Section A')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = (section: string) => {
    setSelectedSection(section)
    handleClose()
  }

  return (
    <Box
      sx={{
        p: 2,
        background: '#fff',
        borderBottom: '1px solid #899390',
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ p: 0 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
          {selectedSection}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {sections.map((section, index: number) => (
          <MenuItem key={index} onClick={() => handleMenuClick(section)}>
            {section}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
