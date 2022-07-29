import { Box, Typography } from '@mui/material'
import React from 'react'
import CCTable from '../../atoms/CCTable'

const rows = [
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Accepted'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
  ['07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India', 'Pending'],
]
const headings = [
  'Created At',
  'Project Name',
  'Project Type',
  'Location',
  'Verification Status',
]

const ProjectsUnderRegistration = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ color: '#F15D5F', fontWeight: 500 }}>
        Projects Under Registration
      </Typography>
      <CCTable headings={headings} rows={rows} />
    </Box>
  )
}

export default ProjectsUnderRegistration
