// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Typography, Paper } from '@mui/material'

// Local Imports
import ProjectTile from './ProjectTile'
import EmptyProjectsList from './EmptyProjectsList'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'

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

      {/* <Grid item xs={12}>
        <EmptyComponent
          photoType={1}
          title="No projects listed yet !"
          listNewProject
        />
      </Grid> */}
    </Grid>
  )
}

export default ProjectsList
