import { Grid, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import ProjectIntroduction from './ProjectIntroduction'

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
      </Grid>
    </>
  )
}
export default ProjectDetails
