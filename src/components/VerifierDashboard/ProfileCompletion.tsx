// Import React
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Typography, LinearProgress, Paper } from '@mui/material'

// Functional Imports
import { shallowEqual } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

// Local Imports
import { Colors } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getLocalItem } from '../../utils/Storage'
import ProfileCompletionStep from './ProfileCompletionStep'
import { pathNames } from '../../routes/pathNames'
import { setLoadWallet } from '../../redux/Slices/walletSlice'
import { USER } from '../../api/user.api'
import BlockchainCalls from '../../blockchain/Blockchain'

const ProfileCompletion = () => {
  const navigate = useNavigate()

  const [profileCompletion, setProfileCompletion] = useState(0)
  const [linearProgressValue, setLinearProgressValue] = useState(0)
  console.log('linearProgressValue', linearProgressValue)
  const isConnected = useAppSelector(
    ({ wallet }) => wallet.isConnected,
    shallowEqual
  )

  useEffect(() => {
    USER.getUserInfo(getLocalItem('userDetails')?.uuid).then((response) => {
      let count = 0

      if (
        response?.data?.data?.fullName !== '' &&
        response?.data?.data?.fullName !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.phone !== '' &&
        response?.data?.data?.phone !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.address !== '' &&
        response?.data?.data?.address !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.designation !== '' &&
        response?.data?.data?.designation !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.organisationName !== '' &&
        response?.data?.data?.organisationName !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.website !== '' &&
        response?.data?.data?.website !== undefined
      ) {
        count++
      }
      if (
        response?.data?.data?.email !== '' &&
        response?.data?.data?.email !== undefined
      ) {
        count++
      }

      setProfileCompletion(Math.round((count / 7) * 100))

      // Linear Progress
      let lpValue = (count / 7) * 50

      BlockchainCalls.getConnectionStatusAndAddress().then((response) => {
        if (response.connected) {
          lpValue = lpValue + 50
        }
        setLinearProgressValue(lpValue)
        if (response.connected && count === 7) {
          navigate(pathNames.DASHBOARD)
        }
      })
      console.log('lpValue', lpValue)
      setLinearProgressValue(lpValue)
    })
  }, [isConnected])

  return (
    <Paper
      sx={{
        width: '260px',
        backgroundColor: '#FFF',
        borderRadius: '8px',
        padding: 1.5,
      }}
    >
      <Typography
        sx={{ fontSize: 18, fontWeight: 400, color: Colors.darkPrimary1 }}
      >
        Profile Completion
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color:
            linearProgressValue !== 100
              ? Colors.secondary
              : Colors.textColorDarkGreen,
          marginTop: 2,
          marginBottom: 0.5,
        }}
      >
        {profileCompletion === 100 && isConnected ? 'Complete' : 'Incomplete'}!
      </Typography>

      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: 8, height: 8 }}
        value={linearProgressValue}
      />

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          marginTop: 1,
          marginBottom: 2,
          mt: 2,
        }}
      >
        Complete your profile setup!
      </Typography>

      <ProfileCompletionStep
        stepTitle="Profile Updated"
        stepCompleted={profileCompletion}
        onClickWhenIncomplete={() => navigate(pathNames.VERIFIER_PROFILE_SETUP)}
      />
      <ProfileCompletionStep
        stepTitle="Wallet Added"
        stepCompleted={isConnected ? 100 : 0}
        onClickWhenIncomplete={() => undefined}
      />
    </Paper>
  )
}

export default ProfileCompletion
