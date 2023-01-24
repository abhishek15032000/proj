import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CCPaper from '../../atoms/CCPaper'
import { Colors } from '../../theme'
import BuySellComp from './BuySellComp'
import OrderBook from './OrderBook'
import Orders from './Orders'

const Trading = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={{ md: 2 }}>
        <Grid item xs={12} md={9} sx={{ height: '100%' }}>
          <CCPaper>
            <Typography
              sx={{
                color: Colors.textColorLightGreen,
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              LFG management project for 2nd phase of Liulitun landfill in
              Haidian District
            </Typography>
            <BuySellComp />
          </CCPaper>
        </Grid>
        <Grid item xs={12} md={3} sx={{ height: '100%', mt: { xs: 2, md: 0 } }}>
          <OrderBook />
        </Grid>
        <Grid xs={12} item md={12} sx={{ mt: { xs: 2, md: 0 } }}>
          <Orders />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Trading
