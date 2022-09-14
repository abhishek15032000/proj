// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography, Chip } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'

import { VerifierProjectDetailsProps } from './VerifierProjectDetails.interface'
import VitalProjectDetails from './VitalProjectDetails'
import ReportsTable from './ReportsTable'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { verifierCalls } from '../../api/verifierCalls.api'

const VerifierProjectDetails = (props: VerifierProjectDetailsProps) => {
  const navigate = useNavigate()
  const [projectDetails, setProjectDetails] = useState()

  useEffect(() => {
    dataCollectionCalls
      .getProjectById('5c00aacd-8d5f-4e4a-b190-f394c6e56f6d')
      .then((response) => {
        setProjectDetails(response.data)
      })

    verifierCalls
      .getReportByProjectId('89a9a101-f525-4658-a489-7e75694d1097')
      .then((response) => {
        // console.log('response.data')
        // console.log(JSON.stringify(response.data, null, 4))
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
          <BackHeader title="Project Details" onClick={() => navigate(-1)} />
        </Grid>

        <VitalProjectDetails data={projectDetails} />

        <ReportsTable />
      </Grid>
    </Box>
  )
}

export default VerifierProjectDetails
