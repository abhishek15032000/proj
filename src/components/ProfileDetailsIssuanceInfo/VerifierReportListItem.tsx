// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Menu, Paper, Stack, Typography } from '@mui/material'
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
  setConfirmVerifier: any
  setSelectedVerifier: any
  selectedVerifier: string
}

const VerifierReportListItemListItem: FC<
  VerifierReportListItemListItemProps
> = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [showVerifierDetails, setShowVerifierDetails] = useState<boolean>(false)

  const open = Boolean(anchorEl)

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  console.log('showVerifierDetails: ', showVerifierDetails)
  return (
    <>
      {/*<Grid container>*/}
      <Box sx={{ background: '#E8F3EF', py: 3, pl: 1, borderRadius: 2 }}>
        <Grid container alignItems={'center'}>
          <Grid
            item
            xs={5}
            onMouseEnter={() => setShowVerifierDetails(true)}
            onMouseLeave={() => setShowVerifierDetails(false)}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {props?.data?.title}
            </Typography>
            {showVerifierDetails && (
              <Paper
                sx={{
                  width: '25vw',
                  ml: 3,
                  p: 1,
                  position: 'absolute',
                  zIndex: '1000',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {props?.data?.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <LanguageIcon
                    sx={{
                      color: '#006B5E',
                      mr: 1,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#25BBD2',
                      textDecoration: 'underline',
                    }}
                  >
                    {props.data?.website}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <PermIdentityOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {props.data?.director}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {props.data?.contact}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#25BBD2',
                      textDecoration: 'underline',
                    }}
                  >
                    {props.data?.mail}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontSie: 16, fontWeight: 500 }}>
              {props?.data?.place}
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex' }}>
            {/*<CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />*/}
            {/*{props?.data?.status ? <typogr}*/}
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {props?.data?.status
                ? 'Verifier Confirmed'
                : 'Waiting for Verifier’s Confirmation'}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ pl: 5 }}>
            {props?.data?.status ? (
              props?.selectedVerifier ? (
                <Stack flexDirection={'row'}>
                  <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    Verifier confirmed
                  </Typography>
                </Stack>
              ) : (
                <CCButton
                  onClick={() => {
                    setShowModal(true)
                    props.setSelectedVerifier(props.data.title)
                  }}
                  sx={{
                    backgroundColor: '#006B5E',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: 10,
                    fontSize: 14,
                    '&:hover': { background: '#006B5E' },
                  }}
                >
                  {props?.data?.verfierOption}
                </CCButton>
              )
            ) : (
              <Typography
                textAlign="center"
                sx={{ pr: 5, color: '#667080', fontSize: 14, fontWeight: 500 }}
              >
                2 days left
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <FinaliseSelectedVerifiersModal
        title="Finalise selected Verifiers?"
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
        setConfirmVerifier={props.setConfirmVerifier}
      />
    </>
  )
}

export default VerifierReportListItemListItem
{
  /*<Grid
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
      </Grid>*/
}
