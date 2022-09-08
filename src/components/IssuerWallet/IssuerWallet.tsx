// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { IssuerWalletProps } from './IssuerWallet.interface'
import { Colors } from '../../theme'
// import DashboardStatistics from '../VerifierProjects/DashboardStatistics'
import DashboardStatistics from '../../atoms/DashboardStatistics/DashboardStatistics'
import TransactionHistory from './TransactionHistory'

const IssuerWallet = (props: IssuerWalletProps) => {
  const [dashboardStatistics, setDashboardStatistics] = useState([
    {
      title: 'Wallet Balance',
      value: 'INR 0.00',
      color: Colors.lightPinkBackground,
    },
    {
      title: 'Number of tokens available for sale',
      value: '10',
      color: Colors.lightGreenBackground3,
    },
    {
      title: 'Total number of tokens on sale',
      value: '05',
      color: Colors.lightGreenBackground4,
    },
  ])

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Wallet" iconDisable />
        </Grid>

        <DashboardStatistics data={dashboardStatistics} />

        <Grid item xs={12}>
          <TransactionHistory />
        </Grid>
      </Grid>
    </Box>
  )
}

export default IssuerWallet
