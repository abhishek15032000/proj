import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import { LOCAL_STORAGE_VARS } from '../../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setBuyQuantity } from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import {
  getApprovedTokensBalance,
  requestApprovalForTokenBuy,
} from '../../../utils/marketplace.utils'
import { getLocalItem } from '../../../utils/Storage'
import CardRow from '../CardRow'
import TabBuyApprove from './TabBuyApprove'

interface BuyTokenProps {}

const BuyToken: FC<BuyTokenProps> = () => {
  const dispatch = useAppDispatch()
  const [tabIndex, setTabIndex] = useState(1)

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const buyQuantity = useAppSelector(
    ({ marketplace }) => marketplace.buyQuantity,
    shallowEqual
  )
  const buyUnitPrice = useAppSelector(
    ({ marketplace }) => marketplace.buyUnitPrice,
    shallowEqual
  )
  const totalAmountForBuying = useAppSelector(
    ({ marketplace }) => marketplace.totalAmountForBuying,
    shallowEqual
  )
  const walletBalBuyFlow = useAppSelector(
    ({ marketplace }) => marketplace.walletBalBuyFlow,
    shallowEqual
  )
  const exchangeBalBuyFlow = useAppSelector(
    ({ marketplace }) => marketplace.exchangeBalBuyFlow,
    shallowEqual
  )

  const dataForBuyCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_BUY_CALL
  )
  const dataToMakeCreateSellOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )
  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_BUY_FLOW
  )

  const dataToMakeBuyCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeBuyCall,
    shallowEqual
  )
  const dataToMakeCreateBuyOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateBuyOrderCall,
    shallowEqual
  )
  const onGoingApproveRedux = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveRedux,
    shallowEqual
  )

  useEffect(() => {
    const buyQuantityInLocalStorage = getLocalItem(
      LOCAL_STORAGE_VARS.BUY_QUANTITY
    )
    dispatch(setBuyQuantity(buyQuantityInLocalStorage))
  }, [])

  useEffect(() => {
    if (accountAddress) {
      getApprovedTokensBalance()
    }
  }, [accountAddress])

  return (
    <Paper
      sx={{
        mt: 1,
        borderRadius: '4px',
        p: 2,
        pointerEvents:
          dataForBuyCallLocalStorage ||
          dataToMakeCreateSellOrderCallLocalStorage ||
          onGoingApproveLocalStorage
            ? 'none'
            : 'all',
        opacity:
          dataForBuyCallLocalStorage ||
          dataToMakeCreateSellOrderCallLocalStorage ||
          onGoingApproveLocalStorage
            ? 0.5
            : 1,
      }}
    >
      <CardRow
        title="Wallet Balance for Purchase :"
        titleStyle={{
          color: Colors.lightPrimary1,
          fontSize: 16,
          fontWeight: 500,
        }}
        valueStyle={{
          fontSize: 16,
          fontWeight: 500,
        }}
        value={`${walletBalBuyFlow || 0} INR`}
      />
      <CardRow
        title="Balance on Exchange :"
        titleStyle={{
          color: Colors.lightPrimary1,
          fontSize: 16,
          fontWeight: 500,
        }}
        valueStyle={{
          fontSize: 16,
          fontWeight: 500,
        }}
        value={`${exchangeBalBuyFlow || 0} INR`}
      />
      <TabSelector
        tabArray={[' Approve', 'Deposit', 'Sell Order']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        tabStyle={{ width: 'auto' }}
      />
      {tabIndex === 1 && <TabBuyApprove />}
    </Paper>
  )
}

export default BuyToken
