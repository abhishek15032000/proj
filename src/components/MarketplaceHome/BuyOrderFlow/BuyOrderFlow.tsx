import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import BuyOrdersList from './BuyOrdersList'
import BuyToken from './BuyToken'
import CreateBuyOrder from './CreateBuyOrder'
import OngoingApprove from './OngoingApprove'
import ToDeposit from './ToDeposit'

const BuyOrderFlow = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <BuyToken />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            borderRadius: '4px',
            p: 2,

            mt: 2,
          }}
        >
          <TabSelector
            tabArray={['Ongoing Approve', 'To Deposit', 'Create Sell Order']}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            tabStyle={{ width: 'auto' }}
          />
          {tabIndex === 1 && <OngoingApprove />}
          {tabIndex === 2 && <ToDeposit />}
          {tabIndex === 3 && <CreateBuyOrder />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <BuyOrdersList />
      </Grid>
    </Grid>
  )
}

export default BuyOrderFlow
