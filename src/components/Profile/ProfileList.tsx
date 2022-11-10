// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll'
import Edit from '../../assets/Images/Icons/edit.png'
import CCButton from '../../atoms/CCButton'
interface ProfileListProps {
  profileDetails?: any
  updateProfile?: any
  openProfilePopup?: any
  removeProfile?: any
  setOpenModal?: any
}

const ProfileList: FC<ProfileListProps> = (props) => {
  const { profileDetails, updateProfile, setOpenModal } = props
  const scrollRef = useHorizontalScroll()
  return (
    <Paper
      sx={{
        width: '100%',

        borderRadius: '8px',
        minWidth: '520px',
        mt: 2,
      }}
    >
      <Grid
        sx={{
          width: '100%',
          p: 1,
        }}
      >
        <Box>
          <Box
            component="img"
            sx={{
              mr: 4,
              width: '100px',
              display: {
                xs: 'none',
                lg: 'block',
              },
            }}
            src={require('../../assets/Images/Icons/userProfile.png')}
          />
          <img src={Edit} style={{}} />
        </Box>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',

            mt: 1,
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#FAFDFA',
              border: '1px solid #B1CCC6',
              borderRadius: '12px',
              padding: '10px',

              minWidth: '500px',

              marginLeft: '20px',
              marginBottom: '10px',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <THTile title="First Name :" value={profileDetails?.firstname} />
              <THTile title="Last Name :" value={profileDetails?.lastname} />
              <THTile title="Work Email ID:" value={profileDetails?.email} />
              <THTile
                title="Participant Type :"
                value={profileDetails?.projectType}
              />
              <THTile title="Mobile Number :" value={profileDetails?.mobile} />
            </Box>
            <Box
              // onClick={() => openProfilePopup(item)}
              sx={{ cursor: 'pointer' }}
            >
              <EditIcon color="primary" />
            </Box>
          </Grid>
        </Grid>
        <CCButton
          onClick={() => setOpenModal(true)}
          rounded
          style={{
            height: '40px',
            fontSize: 14,
            fontWeight: 500,
            marginLeft: '10px',
            color: '#005046',
            cursor: 'pointer',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          Change Password
        </CCButton>
      </Grid>
      <Box
        component="img"
        sx={{
          mr: 4,
          width: '35%',
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
        src={require('../../assets/Images/illustrations/profile.png')}
      />
    </Paper>
  )
}

export default ProfileList
