// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'

import CCTable from '../../atoms/CCTable'

interface ProjectListProps {}
const headings = [
  'Reference ID',
  'Creation Date',
  'Project Name',
  'Project Type',
  'Location',
]
const rows = [
  ['4331', '07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India'],
  ['4331', '07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India'],
  ['4331', '07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India'],
  ['4331', '07.07.2022', 'Project Name', 'Project Type', 'Mumbai, India'],
]
const ProjectList: FC<ProjectListProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderRadius: '8px',

        mt: 2,
        padding: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 400,
          color: Colors.textColorDarkGreen,
          mt: 1,
        }}
      >
        Projects
      </Typography>
      <CCTable headings={headings} rows={rows} />
    </Paper>
  )
}

export default ProjectList
