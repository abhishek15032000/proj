// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography, Chip } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'

import { VerifierProjectDetailsProps } from './VerifierProjectDetails.interface'
import VitalProjectDetails from './VitalProjectDetails'
import ReportsTable from './ReportsTable'

const VerifierProjectDetails = (props: VerifierProjectDetailsProps) => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Project Details" />
        </Grid>

        <VitalProjectDetails />

        <ReportsTable />
      </Grid>
    </Box>
  )
}

export default VerifierProjectDetails
