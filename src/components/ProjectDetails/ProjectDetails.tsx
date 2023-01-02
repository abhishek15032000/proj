import { Grid, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import AdditionalDetails from './AdditionalDetails/AdditionalDetails'
import OtherProjects from './OtherProjects/OtherProjects'
import ProjectIntroduction from './ProjectIntroduction'
import Reports from './Reports/Reports'
import SliderComponent from './SliderComponent/SliderComponent'
import TokensTxHistory from './TokensTxHistory/TokensTxHistory'

const ProjectDetails = () => {
  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Typography sx={{ color: '#F15D5F', fontSize: 20, fontWeight: 500 }}>
            Project Details
          </Typography>
        </Grid>
        <ProjectIntroduction />
        <Grid item xs={12}>
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
