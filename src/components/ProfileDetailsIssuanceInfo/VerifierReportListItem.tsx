// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Menu, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CCButton from '../../atoms/CCButton'
import FinaliseSelectedVerifiersModal from '../../atoms/FinaliseSelectedVerifiers/FinaliseSelectedVerifiersModal'

// Local Imports

interface VerifierReportListItemListItemProps {
  data: any
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#E8F3EF',
          mt: 1,
          p: 2,
        }}
      >
        <Grid item xs={6} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{ fontSize: 16, fontWeight: 500, cursor: 'pointer' }}
            onClick={handleClickListItem}
          >
            {props.data.title}
          </Typography>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}
          >
            <Box sx={{ p: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.location || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <LanguageIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.website || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <PermIdentityOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.director || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.contact || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
                <Typography>{props.data?.mail || '-'}</Typography>
              </Box>
            </Box>
          </Menu>
        </Grid>
        <Grid item xs={2}>
          <Typography>{props?.data?.place}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {props?.data?.status ? (
              <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
            ) : (
              <CircleIcon sx={{ color: '#F7CA56', mr: 1 }} />
            )}
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {props?.data?.status
                ? 'Verifier Confirmed'
                : 'Waiting for Verifier’s Confirmation'}
            </Typography>
          </Box>
        </Grid>
        <Grid item container xs={2} justifyContent="center">
          <Box sx={{ marginRight: 5, display: 'flex', alignItems: 'end' }}>
            {props?.data?.status ? (
              <CCButton
                sx={{
                  backgroundColor: '#006B5E',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: 10,
                  fontSize: 14,
                }}
                onClick={() => setShowModal(true)}
              >
                Finalise Verifier
              </CCButton>
            ) : (
              <Typography>2 days left</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <FinaliseSelectedVerifiersModal
        title="Finalise selected Verifiers?"
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </>
  )
}

export default VerifierReportListItemListItem
