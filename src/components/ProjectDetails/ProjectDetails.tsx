import { Grid, Typography } from '@mui/material'
import React from 'react'
import AdditionalDetails from './AdditionalDetails/AdditionalDetails'
import OtherProjects from './OtherProjects/OtherProjects'
import ProjectIntroduction from './ProjectIntoduction/ProjectIntroduction'
import Reports from './Reports/Reports'
import SliderComponent from './SliderComponent/SliderComponent'
import TokensTxHistory from './TokensTxHistory/TokensTxHistory'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/system'
import WebAppTraceHistory from './TraceHistory/WebappTraceHistory'

const ProjectDetails = () => {
  const projectDetailsData: any = useLocation()

  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item xs={12}>
          <ProjectIntroduction projectDetailsData={projectDetailsData?.state} />
          <AdditionalDetails projectDetailsData={projectDetailsData?.state} />
          <SliderComponent />
          <TokensTxHistory />
          <Reports />
          <Box
            sx={{
              pt: 5,
              padding: '2vw 6vw',
              background:
                'linear-gradient(180deg, #111E17 9.55%, rgba(7, 19, 13, 0.79) 100%)',
            }}
          >
            <Typography
              sx={{
                color: '#55DBC8',
                fontSize: '32px',
                fontWeight: 500,
              }}
            >
              Trace History
            </Typography>
            <Box
              sx={{
                background:
                  'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, rgba(64, 96, 91, 0.59) 151.96%, #2D5F57 237.11%)',
                pt: 5,
                pl: 5,
                borderRadius: '8px',
              }}
            >
              <WebAppTraceHistory
                projectId={projectDetailsData?.state?.uuid}
                theme={'dark'}
              />
            </Box>
          </Box>
          <OtherProjects />
        </Grid>
      </Grid>
    </>
  )
}
export default ProjectDetails
