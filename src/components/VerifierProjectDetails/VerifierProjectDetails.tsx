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

const data = {
  issuer_details: {
    user_id: '630765b218466dcce1770a93',
    name: 'Chaturvedi',
    email: 'swapnil@chainflux.com',
  },
  verifier_details: {
    user_id: '630ca4c98c7365e61871f56c',
    name: 'test1 verifier',
    email: 'test@verifier.com',
  },
  status: 0,
  _id: '630caa181e34bff3c665bb09',
  uuid: '024c7b07-8c26-491c-bf8e-493486c12da6',
  project_id: '296149c9-9284-46a7-a35f-079a9b417143',
  current_month: 'string',
  next_date: '2022-08-29T11:33:37.910Z',
  ghg_reduction_explanation: 'string',
  file_attach: ['string'],
  signature_hash: 'string',
  signer: 'string',
  createdAt: '2022-08-29T11:59:20.593Z',
  updatedAt: '2022-08-29T11:59:20.593Z',
  __v: 0,
}

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

        <VitalProjectDetails data={data} />

        <ReportsTable data={data} />
      </Grid>
    </Box>
  )
}

export default VerifierProjectDetails
