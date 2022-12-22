// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Typography, IconButton, LinearProgress } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

// Functional Imports
import { shallowEqual, useDispatch } from 'react-redux'

// Local Imports
import { getLocalItem } from '../../utils/Storage'
import { Colors } from '../../theme'
import { useAppSelector } from '../../hooks/reduxHooks'
import { setLoadWallet, setWalletAdded } from '../../redux/Slices/walletSlice'

// Local Imports

const ProfileCompletion = () => {
  const dispatch = useDispatch()

  const isConnected = useAppSelector(
    ({ wallet }) => wallet.isConnected,
    shallowEqual
  )
  const walletAdded = useAppSelector(
    ({ wallet }) => wallet.walletAdded,
    shallowEqual
  )

  const [isShineKeyAdded, setIsShineKeyAdded] = useState(false)

  useEffect(() => {
    const shineKey = getLocalItem('userDetails2')?.shineKey
    if (shineKey) dispatch(setWalletAdded(true))
  }, [])

  useEffect(() => {
    if (walletAdded && isConnected) {
      setIsShineKeyAdded(true)
    } else {
      setIsShineKeyAdded(false)
    }
  }, [walletAdded, isConnected])

  // useEffect(() => {
  //   const completionPercent = walletAdded ? 100 : 0
  //   setProfileCompletion(completionPercent)
  // }, [walletAdded])

  return (
    <Box
      sx={{
        width: '260px',
        backgroundColor: '#FFF',
        boxShadow: '1px 1px 2px 2px #CCC',
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
          color: isShineKeyAdded ? Colors.lightPrimary1 : Colors.secondary,
          marginTop: 0.5,
          marginBottom: 0.5,
        }}
      >
        {isShineKeyAdded ? 'Complete!' : 'Incomplete!'}
      </Typography>

      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: 8, height: 8 }}
        value={isShineKeyAdded === true ? 100 : 0}
      />

      <Typography
        sx={{ fontSize: 14, fontWeight: 400, marginTop: 1, marginBottom: 2 }}
      >
        {!isShineKeyAdded ? 'Go back & complete your profile setup!' : null}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px',
          width: '240px',
          backgroundColor: '#DAF7F0',
          padding: 1,
          borderRadius: '12px',
          marginBottom: 1,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Wallet</Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: isShineKeyAdded ? Colors.lightPrimary1 : '#BA1B1B',
            }}
          >
            {`${isShineKeyAdded ? '100' : '0'}% Complete`}
          </Typography>
        </Box>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{
            height: '40px',
            width: '40px',
            borderRadius: '20px',
            backgroundColor: isShineKeyAdded
              ? Colors.white
              : Colors.lightPrimary1,
          }}
        >
          {isShineKeyAdded ? (
            <CheckIcon style={{ color: Colors.lightPrimary1 }} />
          ) : (
            <ArrowRightAltIcon
              style={{ color: '#FFF' }}
              onClick={() => dispatch(setLoadWallet(true))}
            />
          )}
        </IconButton>
      </Box>

      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px',
          width: '240px',
          backgroundColor: '#DAF7F0',
          padding: 1,
          borderRadius: '12px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
            KYB/KYC
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#BA1B1B' }}>
            60% Complete
          </Typography>
        </Box>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{
            height: '40px',
            width: '40px',
            borderRadius: '20px',
            backgroundColor: '#FFF',
          }}
        >
          <CheckIcon style={{ color: Colors.lightPrimary1 }} />
        </IconButton>
      </Box> */}
    </Box>
  )
}

export default ProfileCompletion
