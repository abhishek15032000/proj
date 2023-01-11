import { Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../../theme'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import Projects from './Projects'

const RegistryDashboard = () => {
  return (
    <>
      <Typography
        sx={{ color: Colors.tertiary, fontSize: 28, fontWeight: 400 }}
      >
        Overview
      </Typography>
      <ProjectsStats />
      <Projects />
    </>
  )
}

export default RegistryDashboard
