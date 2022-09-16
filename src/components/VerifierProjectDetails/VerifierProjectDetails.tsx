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
  const [reportDetails, setReportDetails]: any = useState()

  useEffect(() => {
    dataCollectionCalls
      .getProjectById('5c00aacd-8d5f-4e4a-b190-f394c6e56f6d')
      .then((response) => {
        setProjectDetails(response.data)
      })

    verifierCalls
      .getReportByProjectId('e8712a5e-3d13-4619-9bc7-930401044ebb')
      .then((response) => {
        const tempObj = [response.data.data.report]

        // setReportDetails(tempObj)
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
        <ReportsTable data={[obj]} />
      </Grid>
    </Box>
  )
}

export default VerifierProjectDetails

const obj = {
  issuer_details: {
    user_id: '62f2542f0ebdffbf5e09925a',
    name: 'Chaturvedi',
    email: 'swapnil@chainflux.com',
  },
  verifier_details: {
    user_id: '62c5829aa3bc6ba32590f950',
    name: 'string',
    email: 'shine@verifier.com',
  },
  sale: 0,
  _id: '63172de61c56090ec4ad1a83',
  uuid: '1fd21c4c-ad93-48ab-b302-8f4d071a5ea6',
  project_id: 'e8712a5e-3d13-4619-9bc7-930401044ebb',
  projectId: '6315d20f88fa02971e259594',
  current_month: '2022-09-06T09:02:10.231Z',
  quantity: 10,
  next_date: '2022-09-06T09:02:10.231Z',
  ghg_reduction_explanation: 'string',
  file_attach: ['string'],
  signature_hash:
    '0x75f5331d6567cb30d20088155d3cbb6c3f3e9e34519682a0c21317ba5e7232c50bf6c6c929909a63709f5a6e688061678044205c12c6e2c0fc673972030f3ca81b',
  signer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  status: 0,
  createdAt: '2022-09-06T11:24:22.549Z',
  updatedAt: '2022-09-06T11:24:22.549Z',
  __v: 0,
}
