import React, { FC, useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import BuyToken from './BuyToken'
import SellToken from './SellToken'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import OngoingApprove from './OngoingApprove'
import ToDeposit from './ToDeposit'
import {
  getBalanceOnExchange,
  getWalletBalance,
} from '../../utils/marketplace.utils'
import CreateSellOrder from './CreateSellOrder'

interface PurchaseCompProps {}

const PurchaseComp: FC<PurchaseCompProps> = (props) => {
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(1)

  useEffect(() => {
    if (accountAddress) {
      getWalletBalance()
      getBalanceOnExchange()
    }
  }, [accountAddress])

  return (
    <>
      <Grid container mt={2} columnSpacing={2}>
        <Grid item xs={6}>
          <BuyToken />
        </Grid>
        <Grid item xs={6}>
          <SellToken />
        </Grid>
      </Grid>
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
    </>
  )
}

export default PurchaseComp
