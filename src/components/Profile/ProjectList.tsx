// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
// import CreditCardImg from '../../assets/Images/illustrations/credit-card.png'
import { Colors } from '../../theme'

import CCTable from '../../atoms/CCTable'
import ListOfProjects from '../Projects/ListOfProjects'

interface ProjectListProps {
  tableData?: any
  loading?: boolean
}

const ProjectList: FC<ProjectListProps> = (props) => {
  const { tableData, loading } = props
  return (
    <Paper
      sx={{
        height: '480px',
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
      <Grid xs={12} style={{ width: '100%', height: '280px' }}>
        <ListOfProjects data={tableData} loading={loading} />
      </Grid>
    </Paper>
  )
}

export default ProjectList
