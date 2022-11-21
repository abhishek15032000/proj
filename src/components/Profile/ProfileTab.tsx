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
import TitleValue from './TitleValue'
import { ROLES } from '../../config/constants.config'

interface ProfileTabProps {
  stats?: any
  userType?: any
}

const ProfileTab: FC<ProfileTabProps> = (props) => {
  const { stats, userType } = props
  console.log('stat>>>>>>>>>.', stats)
  return (
    <Paper
      sx={{
        height: '480px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',

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
            width: '100%',
          }}
        >
          <Box sx={{ width: '100%' }}>
            {stats &&
              stats.length &&
              stats?.map((stat: any, index: any) => (
                <TitleValue
                  title={stat?.title}
                  value={
                    stat?.value ? stat?.value : stat?.value === 0 ? 0 : '-'
                  }
                  key={index}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ProfileTab
