// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProjectsProps } from './VerifierProjects.interface'
// import DashboardStatistics from './DashboardStatistics'
import DashboardStatistics from '../../atoms/DashboardStatistics/DashboardStatistics'
import TabSelectorVerifier from './TabSelectorVerifier'
import CCTable from '../../atoms/CCTable'
import ListOfProjects from './ListOfProjects'
import { verifierCalls } from '../../api/verifierCalls.api'
import { getLocalItem } from '../../utils/Storage'

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
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const userDetails = getLocalItem('userDetails')

    // .getAllVerifiers('62c5829aa3bc6ba32590f950')
    // .getAllVerifiers('630ca4c98c7365e61871f56c')
    verifierCalls
      .getAllVerifiers('62c5829aa3bc6ba32590f950')
      .then((response) => {
        setTableData(response.data.data)
      })
    //verifierCalls.getAllVerifiers(userDetails._id).then((response) => {
    //  setTableData(response.data.data)
    //})
  }, [])

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
          <ListOfProjects data={tableData} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjects
