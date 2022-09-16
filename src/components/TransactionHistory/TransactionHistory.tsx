// React Imports
import React from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { TransactionHistoryProps } from './TransactionHistory.interface'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import OrderDetails from './OrderDetails'

const TransactionHistory = (props: TransactionHistoryProps) => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Transaction History" />
        </Grid>

        <Grid item xs={12}>
          <OrderDetails />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TransactionHistory
