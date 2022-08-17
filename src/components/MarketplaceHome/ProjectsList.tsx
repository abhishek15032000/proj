// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid } from '@mui/material'

// Local Imports
import ProjectTile from './ProjectTile'

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
    </Grid>
  )
}

export default ProjectsList
