import React from 'react'
import { Typography, LinearProgress, Paper } from '@mui/material'
import { Colors } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { getLocalItem } from '../../utils/Storage'
import ProfileCompletionStep from './ProfileCompletionStep'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { setLoadWallet } from '../../redux/Slices/walletSlice'

const ProfileCompletion = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { wallet_added } = getLocalItem('userDetails2')

  const profileCompletionPercent = useAppSelector(
    ({ verifier }) => verifier.profileCompletionPercent,
    shallowEqual
  )
  const profileUpdated = useAppSelector(
    ({ verifier }) => verifier.profileUpdated,
    shallowEqual
  )

  return (
    <Paper
      sx={{
        width: '260px',
        backgroundColor: '#FFF',
        borderRadius: '8px',
        padding: 1.5,
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
        Profile Completion
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color:
            profileCompletionPercent !== 100
              ? Colors.secondary
              : Colors.textColorDarkGreen,
          marginTop: 2,
          marginBottom: 0.5,
        }}
      >
        {profileCompletionPercent !== 100 ? 'Incomplete' : 'Complete'}!
      </Typography>

      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: 8, height: 8 }}
        value={profileCompletionPercent}
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
        stepCompleted={profileUpdated}
        onClickWhenIncomplete={() => {
          navigate(pathNames.VERIFIER_PROFILE_SETUP)
        }}
      />
      <ProfileCompletionStep
        stepTitle="Wallet Added"
        stepCompleted={wallet_added}
        onClickWhenIncomplete={() => {
          dispatch(setLoadWallet(true))
        }}
      />
    </Paper>
  )
}

export default ProfileCompletion
