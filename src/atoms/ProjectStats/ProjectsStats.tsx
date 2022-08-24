import { Box } from '@mui/system'
import React from 'react'
import { useHorizontalScroll } from '../../hooks/useHorizontalScoll'

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
  const scrollRef = useHorizontalScroll()

  return (
    <Box
      ref={scrollRef}
      sx={{
        mt: 3,
        // overflowX: 'auto',
        // maxWidth: '100%',
        paddingBottom: 2,
      }}
      style={{ marginLeft: -10, marginRight: -10 }}
      className="stats-row"
      id="stats-row"
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
