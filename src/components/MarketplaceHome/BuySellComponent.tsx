// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

// Local Imports
import PurchaseComp from './PurchaseComp'
import SellOrders from './SellOrders'
import MarketDepth from './MarketDepth'
import CancelModal from './CancelModal'
import ModifyOrderModal from './ModifyOrderModal'
import { getLocalItem } from '../../utils/Storage'

interface BuySellComponentProps {}

const BuySellComponent: FC<BuySellComponentProps> = (props) => {
  return (
    <Grid container>
      <Grid item md={12} sm={12} lg={9} sx={{ paddingRight: 2 }}>
        <PurchaseComp />

        <SellOrders />
      </Grid>

      <Grid
        item
        lg={3}
        sx={{
          padding: 1,
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
      >
        <MarketDepth />
      </Grid>

      {/* <CancelModal /> */}

      {/* <ModifyOrderModal /> */}
    </Grid>
  )
}

export default BuySellComponent
