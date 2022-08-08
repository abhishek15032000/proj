import { Box } from '@mui/system'
import React from 'react'

const stats = [
  {
    title: 'Total registered projects',
    value: 8,
  },
  {
    title: 'Ongoing registration of projects',
    value: 3,
  },
  {
    title: 'Total verified',
    value: 3,
  },
  {
    title: 'Total registered projects',
    value: 8,
  },
  {
    title: 'Ongoing registration of projects',
    value: 3,
  },
  {
    title: 'Total verified',
    value: 3,
  },
]
const ProjectsStats = () => {
  return (
    <Box
      sx={{
        mt: 3,
        overflowX: 'auto',
        maxWidth: '100%',
        margin: 1,
        // height: '300px'
      }}
      className="stats-row"
    >
      {stats?.map((stat, index) => (
        <Box key={index} className="stats-container">
          <Box className="content-container">
            <Box className="stats-title">{stat?.title}</Box>
            <Box className="stats-value">{stat?.value}</Box>
          </Box>
          <Box className="stats-img"></Box>
        </Box>
      ))}
    </Box>
  )
}

export default ProjectsStats
