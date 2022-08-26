// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProjectsProps } from './VerifierProjects.interface'
import DashboardStatistics from './DashboardStatistics'
import TabSelectorVerifier from './TabSelectorVerifier'
import CCTable from '../../atoms/CCTable'
import ListOfProjects from './ListOfProjects'

const VerifierProjects = (props: VerifierProjectsProps) => {
  const [dashboardStatistics, setDashboardStatistics] = useState([
    {
      title: 'Total Project Requests',
      value: '20',
      color: Colors.lightPinkBackground,
    },
    {
      title: 'Projects under verification',
      value: '16',
      color: Colors.lightGreenBackground3,
    },
    {
      title: 'Projects verified',
      value: '12',
      color: Colors.lightGreenBackground4,
    },
    {
      title: 'Projects verification Pending',
      value: '04',
      color: Colors.lightOrangeBackground,
    },
  ])

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Dashboard" iconDisable />
        </Grid>

        <DashboardStatistics data={dashboardStatistics} />

        <Grid item xs={12}>
          <ListOfProjects />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjects

