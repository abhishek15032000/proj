// React Imports
import React, { FC } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Chip,
  LinearProgress,
} from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import CheckIcon from '@mui/icons-material/Check'

// Local Imports

interface ProfileCompletionProps {}

const ProfileCompletion: FC<ProfileCompletionProps> = (props) => {
  return (
    <Box
      sx={{
        width: '260px',
        // height: '330px',
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
          color: '#F15D5F',
          marginTop: 0.5,
          marginBottom: 0.5,
        }}
      >
        Incomplete!
      </Typography>

      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: 8, height: 8 }}
        value={40}
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
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#388E81' }}>
            100% Complete
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
            backgroundColor: '#388E81',
          }}
        >
          <ArrowRightAltIcon style={{ color: '#FFF' }} />
        </IconButton>
      </Box>

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
          <CheckIcon style={{ color: '#388E81' }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ProfileCompletion
