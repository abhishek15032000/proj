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
import { useLocation } from 'react-router-dom'

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
          <TraceHistory projectId={projectDetailsData?.state?.uuid} />
          <OtherProjects />
        </Grid>
      </Grid>
    </>
  )
}
export default ProjectDetails
