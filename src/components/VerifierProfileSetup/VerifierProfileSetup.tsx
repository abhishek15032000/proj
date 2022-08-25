// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProfileSetupProps } from './VerifierProfileSetup.interface'
import VerifierProfileIllustration from '../../assets/Images/illustrations/VerifierProfile.png'
import CCInputField from '../../atoms/CCInputField'
import TextButton from '../../atoms/TextButton/TextButton'

const VerifierProfileSetup = (props: VerifierProfileSetupProps) => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={9} sx={{ pr: 1 }}>
          <Paper
            sx={{
              height: '750px',
              width: '100%',
              borderRadius: '8px',
              // border: '2px solid',
              backgroundColor: Colors.white,
              p: 2,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <BackHeader title="Profile" />
              <TextButton title="Save" />
            </Box>

            <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 2, mb: 2 }}>
              Complete your profile setup by filling this form
            </Typography>
            <CCInputField
              label="Participant Name"
              placeholder="Enter Participant Name"
              sx={{ mb: 1.5 }}
            />

            <CCInputField
              label="Designation"
              placeholder="Enter Designation"
              sx={{ mb: 1.5 }}
            />

            <CCInputField
              label="Email ID"
              placeholder="Enter Email ID"
              sx={{ mb: 1.5 }}
            />

            <CCInputField
              label="Contact Number"
              placeholder="Enter Contact Number"
              sx={{ mb: 1.5 }}
            />

            <CCInputField
              label="Organisation Name"
              placeholder="Enter Organisation Name"
              sx={{ mb: 1.5 }}
            />

            <CCInputField
              label="Organisation Address"
              placeholder="Enter Organisation Address"
              sx={{ mb: 1.5 }}
            />

            <CCInputField
              label="Official Website"
              placeholder="Enter Official Website"
              sx={{ mb: 1.5 }}
            />

            <Box
              component="img"
              sx={{ width: '100%', position: 'absolute', bottom: 0, right: 0 }}
              src={VerifierProfileIllustration}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProfileSetup
