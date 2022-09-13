// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'

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
import { USER } from '../../api/user.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

const VerifierProjects = (props: VerifierProjectsProps) => {
  const navigate = useNavigate()

  const [dashboardStatistics, setDashboardStatistics] = useState([
    {
      title: 'Total Project Requests',
      value: 0,
      color: Colors.lightPinkBackground,
    },
    {
      title: 'Projects under verification',
      value: 0,
      color: Colors.lightGreenBackground3,
    },
    {
      title: 'Projects verified',
      value: 0,
      color: Colors.lightGreenBackground4,
    },
    {
      title: 'Projects verification Pending',
      value: 0,
      color: Colors.lightOrangeBackground,
    },
  ])
  const [tableData, setTableData] = useState([])

  const [loadingTable, setLoadingTable] = useState(false)
  const [loadingStat, setLoadingStat] = useState(false)

  useEffect(() => {
    setLoadingTable(true)
    setLoadingStat(true)

    verifierCalls
      .getVerifierProjectDashboardStats(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        const tempData = dashboardStatistics

        tempData[0].value = response?.data?.no_of_projects
        tempData[1].value = response?.data?.projects_under_verification
        tempData[2].value = response?.data?.projects_verified
        tempData[3].value = response?.data?.projects_verification_pending

        setDashboardStatistics(tempData)
        setLoadingStat(false)
      })
      .catch((e) => {
        setLoadingStat(false)
      })

    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        setTableData(response.data.data)
        setLoadingTable(false)
      })
      .catch((e) => {
        setLoadingTable(false)
      })
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

        <DashboardStatistics data={dashboardStatistics} loading={loadingStat} />

        <Grid item xs={12}>
          <ListOfProjects data={tableData} loading={loadingTable} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjects
