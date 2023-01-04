import { Grid, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import AdditionalDetails from './AdditionalDetails/AdditionalDetails'
import OtherProjects from './OtherProjects/OtherProjects'
import ProjectIntroduction from './ProjectIntoduction/ProjectIntroduction'
import TraceHistory from './TraceHistory/TraceHistory'
import Reports from './Reports/Reports'
import SliderComponent from './SliderComponent/SliderComponent'
import TokensTxHistory from './TokensTxHistory/TokensTxHistory'

const ProjectDetails = () => {
  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          background:
            'linear-gradient(180deg, #111E17 53.81%, rgba(7, 19, 13, 0.79) 100%)',
        }}
      >
        <Grid item xs={12}>
          <ProjectIntroduction />
          <AdditionalDetails />
          <SliderComponent />
          <TokensTxHistory />
          <Reports />
          <OtherProjects />
        </Grid>
      </Grid>
    </>
  )
}
export default ProjectDetails
