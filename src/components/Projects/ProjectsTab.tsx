// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, IconButton, Chip } from '@mui/material'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CircleIcon from '@mui/icons-material/Circle'

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        padding: 2,
        borderRadius: '8px',
        boxShadow: '1px 1px 2px 2px #CCC',
        marginTop: 4,
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
        <Typography sx={{ color: '#F3BA4D', fontSize: 14, fontWeight: 400 }}>
          See All
        </Typography>
      </Box>

      <TabSelector
        tabArray={['New', 'Registered']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />
      <CCTable headings={headings} rows={rows} maxWidth={900} />
    </Box>
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

const rows = [
    rowItem,
    rowItem,
    rowItem,
    rowItem,
]

const headings = [
  'Reference ID',
  'Location',
  'Verifier',
  'Report Status',
  'Next Report',
  'Action',
]
