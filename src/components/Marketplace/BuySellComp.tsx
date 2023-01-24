import { Grid } from '@mui/material'
import React from 'react'
import BuyComp from './BuyComp'
import SellComp from './SellComp'

const BuySellComp = () => {
  return (
    <Grid container xs={12} sx={{ mt: 4 }}>
      <Grid item md={6} sx={{ borderRight: '1px solid #CCE8E1' }}>
        <BuyComp />
      </Grid>
      <Grid item md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <SellComp />
      </Grid>
    </Grid>
  )
}

export default BuySellComp
