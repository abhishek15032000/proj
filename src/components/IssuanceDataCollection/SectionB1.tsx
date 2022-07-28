import { Grid, TextareaAutosize, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SectionB1TechnicalDescription from '../../assets/Images/SampleData/SectionB1TechnicalDescription.png'
import SectionB1ShutDownDetails from '../../assets/Images/SampleData/SectionB1ShutDownDetails.png'
import SectionB1ImplementationOfMilestones from '../../assets/Images/SampleData/SectionB1ImplementationOfMilestones.png'
import SectionB1EventDescription from '../../assets/Images/SampleData/SectionB1EventDescription.png'
import SectionB1UploadImages from './SectionB1Upload/SectionB1Upload'

const SectionB1 = () => {
  return (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}>
            Brief on purpose and general description of project activity *
          </Typography>
          <TextareaAutosize
            placeholder="(Description of implemented registered project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          ></TextareaAutosize>
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}>
            Technical Description
          </Typography>
          <TextareaAutosize
            placeholder="(Technical description of the equipment, its specification, supplier name, installed by the project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          ></TextareaAutosize>
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}>
            Attach Data Tables for Technical Description
          </Typography>
          <SectionB1UploadImages
            title={'Sample Report - Technical Description'}
            image={SectionB1TechnicalDescription}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}>
            Operational Description
          </Typography>
          <TextareaAutosize
            placeholder="(Events during the monitoring period,logs, Major shut down details, Timings, reasons)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}>
            Attach Data Tables for Major shut down details
          </Typography>
          <SectionB1UploadImages
            title="Sample Report - Shut Down Details"
            image={SectionB1ShutDownDetails}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Grid item lg={6}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}
            >
              Attach Data Tables for implementation of milestones
            </Typography>
          </Grid>
          <SectionB1UploadImages
            title="Sample Report - Implementation of milestones"
            image={SectionB1ImplementationOfMilestones}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}>
            Attach Data Tables for Project timeline event description
          </Typography>
          <SectionB1UploadImages
            title="Sample Report - Project timeline event description"
            image={SectionB1EventDescription}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB1
