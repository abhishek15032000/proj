import { Grid, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import ProjectsStats from './ProjectsStats'
import RegisteredProjects from './RegisteredProjects'
import ProjectsUnderRegistration from './ProjectUnderRegistration'
import './Projects.css'

const Projects = () => {
  const listNewProject = () => {
    console.log('New Project')
  }

  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Typography sx={{ color: '#F15D5F', fontSize: 20, fontWeight: 500 }}>
            Project
          </Typography>
        </Grid>
        <Grid item>
          <CCButton
            sx={{
              color: '#fff',
              padding: '8px 15px',
            }}
            variant="contained"
            onClick={listNewProject}
          >
            List New Project
          </CCButton>
        </Grid>
      </Grid>
      <ProjectsStats />
      <RegisteredProjects />
      <ProjectsUnderRegistration />
    </>
  )
}
export default Projects
