// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Typography, IconButton, LinearProgress } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { getLocalItem } from '../../utils/Storage'
import { Colors } from '../../theme'

// Local Imports

const ProfileCompletion = () => {
  const [profileCompletion, setProfileCompletion] = useState<number>()
  const { wallet_added = false } = getLocalItem('userDetails2')

  useEffect(() => {
    const completionPercent = wallet_added ? 100 : 0
    setProfileCompletion(completionPercent)
  }, [])

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
      <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
        Profile Completion
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color:
            profileCompletion === 100 ? Colors.lightPrimary1 : Colors.secondary,
          marginTop: 0.5,
          marginBottom: 0.5,
        }}
      >
        {profileCompletion === 100 ? 'Complete!' : 'Incomplete!qq'}
      </Typography>

      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: 8, height: 8 }}
        value={profileCompletion || 0}
      />

      <Typography
        sx={{ fontSize: 14, fontWeight: 400, marginTop: 1, marginBottom: 2 }}
      >
        Go back & complete your profile setup!
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
              color:
                profileCompletion === 100 ? Colors.lightPrimary1 : '#BA1B1B',
            }}
          >
            {`${profileCompletion === 100 ? '100' : '0'}% Complete`}
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
            backgroundColor: wallet_added ? Colors.white : Colors.lightPrimary1,
          }}
        >
          {wallet_added ? (
            <CheckIcon style={{ color: Colors.lightPrimary1 }} />
          ) : (
            <ArrowRightAltIcon style={{ color: '#FFF' }} />
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
