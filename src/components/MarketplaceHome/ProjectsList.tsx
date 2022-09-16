// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'

// Local Imports
import ProjectTile from './ProjectTile'
import EmptyProjectsList from './EmptyProjectsList'


interface ProjectsListProps {}

const ProjectsList: FC<ProjectsListProps> = (props) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProjectTile />
      <ProjectTile />
      <ProjectTile />
      <ProjectTile />
      <ProjectTile />
      <ProjectTile />

      {/* <EmptyProjectsList /> */}
    </Grid>
  )
}

export default ProjectsList
