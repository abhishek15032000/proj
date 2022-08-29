// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { VerifierDashboardProps } from './VerifierDashboard.interface'
import { Colors } from '../../theme'
import TextButton from '../../atoms/TextButton/TextButton'
import VerifierDashboardIllustration from '../../assets/Images/illustrations/VerifierDashboard.png'

interface WelcomeIllustrationProps {}

const WelcomeIllustration: FC<WelcomeIllustrationProps> = (props) => {
  return (
    <Grid item xs={9} sx={{ pr: 1 }}>
      <Paper
        sx={{
          height: '600px',
          width: '100%',
          borderRadius: '8px',
          // border: '2px solid',
          backgroundColor: Colors.white,
          p: 2,
          position: 'relative'
        }}
      >
        <Typography
          sx={{ fontSize: 22, fontWeight: 400, color: Colors.darkPrimary1 }}
        >
          Welcome!
        </Typography>

        <Typography sx={{ fontSize: 16, fontWeight: 400, mt: 1 }}>
          Ready to go? Start filling the following forms to complete the
          onboarding process
        </Typography>

        <Box
          sx={{
            height: '180px',
            width: '430px',
            borderRadius: '8px',
            backgroundColor: Colors.lightGreenBackground2,
            p: 1.5,
            mt: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 400,
              color: Colors.darkPrimary1,
            }}
          >
            Profile Setup
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: Colors.darkPrimary1,
              pt: 2,
            }}
          >
            Complete your profile info to get started
          </Typography>

          <TextButton sx={{ mt: 3 }} title="start" />
        </Box>
        <Box
          component="img"
          sx={{ width: '100%', position: 'absolute', bottom: 0, right: 0 }}
          src={VerifierDashboardIllustration}
        />
      </Paper>
    </Grid>
  )
}

export default WelcomeIllustration
