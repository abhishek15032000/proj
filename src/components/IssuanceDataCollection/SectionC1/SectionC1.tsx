import {
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
  Modal,
  Paper,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import DataIssuanceAdd from '../../../assets/Images/Icons/DataIssuanceAdd.png'
import SectionCOrganisationalStructure from '../../../assets/Images/SampleData/SectionCOrganisationalStructure.png'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'

const SectionC1 = () => {
  return (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Description of monitoring system *"
            placeholder="Description of the monitoring system,organisational structure of the team, their roles & responsibilities, training and maintenance"
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Monitoring Plan *"
            placeholder="According to registered and the applied methodology, describe plan of monitoring variables"
          />

          <CCDropAndUpload
            mediaTitle="Sample Report - Organizational Structure & Responsibilities Chart"
            mediaItem={SectionCOrganisationalStructure}
            title="Attach organizational structure & responsibilities chart"
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Specific Datas Monitored *"
            placeholder="According to registered and the applied methodology, specific datas monitored"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default SectionC1
