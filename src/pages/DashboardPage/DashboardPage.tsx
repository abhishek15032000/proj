import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import LinearProgressBar from '../../atoms/LinearProgressBar'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { DashboardPageProps } from './DashboardPage.interface'
import SendIcon from '@mui/icons-material/Send'

import IssuerProjectWelcomePage from '../IssuerProjectWelcomePage'
const DashboardPage = (props: DashboardPageProps) => {
  return (
    <Grid container padding={4}>
      <Typography variant="h5" sx={{ paddingY: 3 }}>
        Projects
      </Typography>
      <IssuerProjectWelcomePage />
    </Grid>
  )
}

export default DashboardPage
