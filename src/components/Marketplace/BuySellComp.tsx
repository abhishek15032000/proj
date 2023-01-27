import { Grid } from '@mui/material'
import React from 'react'
import BuyComp from './BuyComp'
import SellComp from './SellComp'

const BuySellComp = () => {
  return (
    <Grid container xs={12} sx={{ mt: 4, pr: { xs: '', md: 5 } }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ borderRight: { sm: '', md: '1px solid #CCE8E1' } }}
      >
        <BuyComp />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', md: 'flex-end' },
        }}
      >
        <SellComp />
      </Grid>
    </Grid>
  )
}

export default BuySellComp
