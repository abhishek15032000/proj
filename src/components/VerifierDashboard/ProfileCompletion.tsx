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
  Paper,
} from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import CheckIcon from '@mui/icons-material/Check'
import { Colors } from '../../theme'

// Local Imports

interface ProfileCompletionProps {
  value?: any
}

const ProfileCompletion: FC<ProfileCompletionProps> = (props) => {
  return (
    <Paper
      sx={{
        width: '260px',
        // height: '330px',
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
          color: props.value !== 100 ? '#F15D5F' : Colors.textColorDarkGreen,
          marginTop: 2,
          marginBottom: 0.5,
        }}
      >
        {props.value !== 100 ? 'Incomplete!' : 'Complete'}
      </Typography>

      <LinearProgress
        variant="determinate"
        sx={{ borderRadius: 8, height: 8 }}
        value={props.value}
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
            Profile
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color:
                props.value !== 100 ? '#BA1B1B' : Colors.textColorDarkGreen,
            }}
          >
            {props.value}% Complete
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default ProfileCompletion
