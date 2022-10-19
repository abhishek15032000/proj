// React Imports
import React, { useEffect, FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import { useLocation, useNavigate } from 'react-router-dom'
import BankDetailsTab from './BankDetailsTab'

interface BankDetailsProps {}

const BankDetails: FC<BankDetailsProps> = (props) => {
  const navigate = useNavigate()

    return (
        
    <Box sx={{ p: 0 }}>
    <Grid
      container
      xs={12}
      sx={{ p: 0, border: '0px solid' }}
      justifyContent={'space-between'}
    >
      <Grid item xs={12}>
        <BackHeader title="View Bank Details" onClick={() => navigate(-1)} />
      </Grid>

      <Grid item xs={12}>
        <BankDetailsTab />
      </Grid>
    </Grid>
  </Box>
    )
}

export default BankDetails