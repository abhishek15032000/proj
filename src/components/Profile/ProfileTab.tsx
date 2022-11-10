// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'
import moment from 'moment'
import THTile from '../TransactionHistory/THTile'
import CCButton from '../../atoms/CCButton'

interface ProfileTabProps {}

const ProfileTab: FC<ProfileTabProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '350px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        minWidth: '400px',
        mt: 2,
        ml: 2,
      }}
    >
      <Box
        sx={{
          height: '100%',
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: Colors.textColorDarkGreen,
            mt: 1,
          }}
        >
          Tokens
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <THTile title="Number of VCOT on sale :" value={'10 VCOT'} />
            <THTile title="Number VCOT Available for Sale :" value="05 VCOT" />
            <THTile title="Balance on exchange :" value="05 VCOT" />
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ProfileTab
