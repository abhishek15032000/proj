// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, IconButton, Chip, Paper } from '@mui/material'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CircleIcon from '@mui/icons-material/Circle'
import DashboardNewProjectsTable from './DashboardNewProjectsTable'
import DashboardRegisteredProjectsTable from './DashboardRegisteredProjectsTable'
//import ProjectsUnderRegistration from './ProjectUnderRegistration'
//import RegisteredProjects from './RegisteredProjects'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()

  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: '8px',
        mt: 4,
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
        <Typography
          sx={{
            color: '#F3BA4D',
            fontSize: 14,
            fontWeight: 400,
            cursor: 'pointer',
          }}
          onClick={() => navigate(pathNames.SEE_ALL_PROJECTS)}
        >
          See All
        </Typography>
      </Box>

      <TabSelector
        tabArray={['New', 'Registered']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />
      {tabIndex === 1 ? (
        <DashboardNewProjectsTable />
      ) : (
        tabIndex === 2 && <DashboardRegisteredProjectsTable />
      )}
    </Paper>
  )
}

export default ProjectsTab

const rowItem = [
  '4337',
  'Vilcrum, Chile',
  <Box
    key="1"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <IconButton color="primary" aria-label="upload picture" component="label">
      <WorkOutlineIcon />
    </IconButton>
    Climate Finance
  </Box>,
  <Chip
    sx={{ backgroundColor: '#75F8E4' }}
    key="1"
    icon={<CircleIcon style={{ color: '#00A392' }} />}
    label="Verified"
  />,
  '12/05/21',
  <TextButton
    key="1"
    sx={{
      width: '180px',
      height: '40px',
      borderRadius: '100px',
      backgroundColor: '#006B5E',
    }}
    title="Add Monthly Data"
  />,
]

const rows = [rowItem, rowItem, rowItem, rowItem]

const headings = [
  'Reference ID',
  'Created Dt',
  'Location',
  'Verifier',
  'Report Status',
  'Next Report',
  'Action',
]
