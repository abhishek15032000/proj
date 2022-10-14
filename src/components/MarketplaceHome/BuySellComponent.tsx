// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Grid } from '@mui/material'

// Local Imports
import MarketDepth from './MarketDepth'
import CancelModal from './CancelModal'
import ModifyOrderModal from './ModifyOrderModal'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import BuyOrderFlow from './BuyOrderFlow/BuyOrderFlow'
import SellOrderFlow from './SellOrderFlow/SellOrderFlow'

interface BuySellComponentProps {}

const BuySellComponent: FC<BuySellComponentProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Grid container>
      <Grid item md={12} sm={12} lg={9} sx={{ paddingRight: 2 }}>
        <TabSelector
          tabArray={['Buy', 'Sell', 'Withdraw/Deposit']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabStyle={{ width: 'auto' }}
          sx={{ mt: 0 }}
        />
        {tabIndex === 1 && <BuyOrderFlow />}
        {tabIndex === 2 && <SellOrderFlow />}
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
