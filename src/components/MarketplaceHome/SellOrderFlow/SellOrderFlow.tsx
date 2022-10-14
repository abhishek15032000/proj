import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import SellOrdersList from './SellOrdersList'
import CreateSellOrder from './CreateSellOrder'
import OngoingApprove from './OngoingApprove'
import SellToken from './SellToken'
import ToDeposit from './ToDeposit'

const SellOrderFlow = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        <SellToken />
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
          {tabIndex === 3 && <CreateSellOrder />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <SellOrdersList />
      </Grid>
    </Grid>
  )
}

export default SellOrderFlow
