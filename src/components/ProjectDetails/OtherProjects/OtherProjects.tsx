import { Box, Typography } from '@mui/material'
import React from 'react'

const OtherProjects = () => {
  return (
    <Box sx={{ background: '#111E17', padding: '56px 6vw', color: '#fff' }}>
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
      <Box sx={{ mt: 3 }}>
        <Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OtherProjects
