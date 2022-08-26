// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';


// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProjectsProps } from './VerifierProjects.interface'
import DashboardStatistics from './DashboardStatistics'
import TabSelectorVerifier from './TabSelectorVerifier'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'

interface ListOfProjectsProps {}

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 4,
        p: 2,
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>

      <TabSelectorVerifier
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        newProjects={4}
      />

      <CCTable
        headings={headings}
        rows={rows}
        sx={{ minWidth: 100 }}
        tableSx={{ minWidth: 100 }}
      />
    </Paper>
  )
}

export default ListOfProjects

const ApprovalChip: FC<ApprovalChipProps> = (props) => {
  return <Chip icon={<CircleIcon />} label="Approved" />
}

interface ApprovalChipProps {}

const rowItem = [
  '4337',
  '12/04/21',
  <Box
    key={'1'}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <WorkOutlineIcon />
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 500,
        ml: 1,
      }}
    >
      Lorem Ipsum
    </Typography>
  </Box>,
  'Trueno River',
  'Vilcum, Chile',
  <ApprovalChip key={'1'} />,
  <Box
    key={'1'}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <TextButton sx={{ width: '90px' }} title="Approve" />
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 500,
        color: Colors.textColorBrightRed2,
        ml: 2,
      }}
    >
      Reject
    </Typography>
  </Box>,
  <ChevronRightIcon key="1" />,
]

const rows = [rowItem, rowItem, rowItem, rowItem]

const headings = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Status',
  'Action',
  '',
]
