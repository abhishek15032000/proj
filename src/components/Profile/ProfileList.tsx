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
import { AccountBalance } from '@mui/icons-material'
import TitleValue from './TitleValue'
interface ProfileListProps {
  profileDetails?: any
  updateProfile?: any
  openProfilePopup?: any
  removeProfile?: any
  setOpenModal?: any
  accountBalance?: any
  accountAddress?: any
  editProfileVisible?: any
  setEditProfileVisible?: any
}

const ProfileList: FC<ProfileListProps> = (props) => {
  const {
    profileDetails,
    updateProfile,
    setOpenModal,
    accountAddress,
    accountBalance,
    editProfileVisible,
    setEditProfileVisible,
  } = props
  const scrollRef = useHorizontalScroll()
  return (
    <Paper
      sx={{
        width: editProfileVisible ? '50%' : '100%',
        borderRadius: '8px',

        mt: 2,
        height: '98%',
      }}
    >
      <Box
        sx={{
          // width: '50%',
          paddingY: 1,
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            width: '10%',
            flexDirection: 'row',
            flex: 'display',
            justifyContent: 'center',
            alignItems: 'center',

            ml: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: '100px',
            }}
            src={require('../../assets/Images/Icons/userProfile.png')}
          />
          <img
            src={Edit}
            style={{
              right: 0,
              // marginLeft: '100%',
              cursor: 'pointer',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Box
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
              <TitleValue
                title="First Name :"
                value={profileDetails?.firstname}
              />
              <TitleValue
                title="Last Name :"
                value={profileDetails?.lastname}
              />
              <TitleValue
                title="Work Email ID:"
                value={profileDetails?.email}
              />
              <TitleValue
                title="Participant Type :"
                value={profileDetails?.projectType}
              />
              <TitleValue
                title="Mobile Number :"
                value={profileDetails?.mobile}
              />
              {accountAddress ? (
                <TitleValue title="Account Address :" value={accountAddress} />
              ) : null}
              {accountBalance ? (
                <TitleValue title="Account Balance :" value={accountBalance} />
              ) : null}
            </Box>
            <Box
              onClick={() => setEditProfileVisible(true)}
              sx={{ cursor: 'pointer' }}
            >
              <EditIcon color="primary" />
            </Box>
          </Box>
          {!editProfileVisible ? (
            <Box
              component="img"
              sx={{
                width: '90%',
                ml: '20%',
              }}
              src={require('../../assets/Images/illustrations/profile.png')}
            />
          ) : null}
        </Box>
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
      </Box>
    </Paper>
  )
}

export default ProfileList
