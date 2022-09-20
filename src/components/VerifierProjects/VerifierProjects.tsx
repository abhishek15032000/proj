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
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'

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
    loadDashboardData()
    loadTableData()
    checkForUserDetails()
  }, [])

  const loadDashboardData = () => {
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
  }

  const loadTableData = () => {
    setLoadingTable(true)

    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        setTableData(response.data.data)
        setLoadingTable(false)
      })
      .catch((e) => {
        setLoadingTable(false)
      })
  }

  const checkForUserDetails = () => {
    USER.getUserInfo(getLocalItem('userDetails')?.uuid).then((response) => {
      if (
        response?.data?.data?.fullName === '' ||
        response?.data?.data?.fullName === undefined ||
        response?.data?.data?.email === '' ||
        response?.data?.data?.email === undefined ||
        response?.data?.data?.phone === '' ||
        response?.data?.data?.phone === undefined ||
        response?.data?.data?.address === '' ||
        response?.data?.data?.address === undefined ||
        response?.data?.data?.designation === '' ||
        response?.data?.data?.designation === undefined ||
        response?.data?.data?.organisationName === '' ||
        response?.data?.data?.organisationName === undefined ||
        response?.data?.data?.website === '' ||
        response?.data?.data?.website === undefined
      ) {
        navigate(pathNames.VERIFIER_DASHBOARD, { replace: true })
      }
    })
  }

  const updateVerifierStatus = (status: any, data: any) => {
    setLoadingTable(true)

    const payload = {
      _id: data._id,
      project_id: data.project_id._id,
      project_status: status,
      verifier_id: data.verifier_id,
      verifier_name: data.verifier_name,
      verifier_number: data.verifier_number,
      verifier_address: data.verifier_address,
    }

    verifierCalls.updateVerifier(payload).then((response) => {
      loadTableData()
    })
  }

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
          {tableData.length === 0 && loadingTable === false && (
            <EmptyComponent
              title="No project verification request yet!"
              photoType={1}
            />
          )}

          {tableData.length > 0 && loadingTable === false && (
            <ListOfProjects
              data={tableData}
              loading={loadingTable}
              updateStatus={updateVerifierStatus}
            />
          )}

          {loadingTable === true && (
            <ListOfProjects
              data={tableData}
              loading={loadingTable}
              updateStatus={updateVerifierStatus}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjects
