import { Box } from '@mui/material'
import React from 'react'
import ProjectDetailsCard from './ProjectDetailsCard'

const projects = ['', '', '', '']

const OtherProjects = () => {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(180deg, rgba(7, 19, 13, 0.79) 0%, #222926 66.32%)',
        padding: '56px 6vw',
        color: '#fff',
      }}
    >
      <Box sx={{ fontSize: '32px', color: '#55DBC8' }}>Other Projects</Box>
      <Box
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#55DBC8',
          textAlign: 'right',
        }}
      >
        See All
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {projects &&
          projects.length &&
          projects.map((project, index) => (
            <ProjectDetailsCard key={index} project={project} />
          ))}
      </Box>
    </Box>
  )
}

export default OtherProjects
