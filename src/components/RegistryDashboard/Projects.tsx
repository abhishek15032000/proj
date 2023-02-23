import { Box, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TabSelectorWithCount from '../../atoms/TabSelectorWithCount/TabSelectorWithCount'
import { pathNames } from '../../routes/pathNames'
import ProjectTable from './ProjectTable'

const Projects = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [tabIndex, setTabIndex] = useState(1)
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: '8px',
        boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
        marginTop: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>
        {location.pathname.includes(pathNames.PROJECTS) ? null : (
          <Typography
            sx={{
              color: 'darkPrimary1.main',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
            }}
            onClick={() => navigate(pathNames.PROJECTS)}
          >
            See All
          </Typography>
        )}
      </Box>

      <TabSelectorWithCount
        tabArray={[
          { name: 'New', count: 0 },
          { name: 'Under review', count: 0 },
          { name: 'Reviewed', count: 0 },
        ]}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />
      <ProjectTable tabIndex={tabIndex} />
    </Paper>
  )
}

export default Projects
