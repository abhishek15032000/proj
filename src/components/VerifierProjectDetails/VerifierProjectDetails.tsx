// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography, Chip, Stack } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'

import { VerifierProjectDetailsProps } from './VerifierProjectDetails.interface'
import VitalProjectDetails from './VitalProjectDetails'
import ReportsTable from './ReportsTable'
import { useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'
import Spinner from '../../atoms/Spinner'

const VerifierProjectDetails = (props: VerifierProjectDetailsProps) => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const [projectDetails, setProjectDetails] = useState()
  const [reportDetails, setReportDetails]: any = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    dataCollectionCalls
      .getProjectById(location?.state?.project_uuid)
      .then((response) => {
        setProjectDetails(response.data)
        setLoading(false)
      })
      .catch((e) => setLoading(false))

    // 'e8712a5e-3d13-4619-9bc7-930401044ebb'

    verifierCalls
      .getReportByProjectId(location?.state?.project_uuid)
      .then((response) => {
        let tempObj: any = []
        if (response?.data?.data?.report !== undefined) {
          tempObj = [response.data.data.report]
        }

        setReportDetails(tempObj)
      })
  }, [])

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 450 }}
      >
        <Spinner />
      </Stack>
    )
  } else {
    return (
      <Box sx={{ p: 0 }}>
        <Grid
          container
          xs={12}
          sx={{ p: 0, border: '0px solid' }}
          justifyContent={'space-between'}
        >
          <Grid item xs={12}>
            <BackHeader title="Project Details" onClick={() => navigate(-1)} />
          </Grid>

          <VitalProjectDetails data={projectDetails} />
          <ReportsTable data={reportDetails} />
        </Grid>
      </Box>
    )
  }
}

export default VerifierProjectDetails
