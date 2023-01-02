import { Grid, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import ProjectIntroduction from './ProjectIntroduction'
import TraceHistory from './TraceHistory'

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
        <ProjectIntroduction />
        <TraceHistory />
      </Grid>
    </>
  )
}
export default ProjectDetails
