import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import TabSelector from '../../../atoms/TabSelector/TabSelector'
import { LOCAL_STORAGE_VARS } from '../../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setSellQuantity,
  setSellUnitPrice,
} from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import {
  getApprovedTokensBalance,
  getBalanceOnExchange,
  getWalletBalance,
  requestApprovalForTokenSelling,
} from '../../../utils/marketplace.utils'
import { getLocalItem } from '../../../utils/Storage'
import CardRow from '../CardRow'
import TabSellApprove from './TabSellApprove'
import TabSellCreateSellOrder from './TabSellCreateSellOrder'
import TabSellDeposit from './TabSellDeposit'

interface SellTokenProps {}

const SellToken: FC<SellTokenProps> = () => {
  const dispatch = useAppDispatch()

  const [tabIndex, setTabIndex] = useState(1)

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const sellQuantity = useAppSelector(
    ({ marketplace }) => marketplace.sellQuantity,
    shallowEqual
  )
  const sellUnitPrice = useAppSelector(
    ({ marketplace }) => marketplace.sellUnitPrice,
    shallowEqual
  )
  const walletBal = useAppSelector(
    ({ marketplace }) => marketplace.walletBal,
    shallowEqual
  )
  const exchangeBal = useAppSelector(
    ({ marketplace }) => marketplace.exchangeBal,
    shallowEqual
  )
  const approvedTokensBal = useAppSelector(
    ({ marketplace }) => marketplace.approvedTokensBal,
    shallowEqual
  )

  const dataForDepositCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL_SELL_FLOW
  )
  const dataToMakeCreateSellOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )
  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW
  )

  const dataToMakeDepositCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeDepositCall,
    shallowEqual
  )
  const dataToMakeCreateSellOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateSellOrderCall,
    shallowEqual
  )
  const onGoingApproveRedux = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveRedux,
    shallowEqual
  )

  useEffect(() => {
    const sellQuantityInLocalStorage = getLocalItem(
      LOCAL_STORAGE_VARS.SELL_QUANTITY
    )
    dispatch(setSellQuantity(sellQuantityInLocalStorage))
  }, [])

  useEffect(() => {
    if (accountAddress) {
      getWalletBalance()
      getApprovedTokensBalance()
      getBalanceOnExchange()
    }
  }, [accountAddress])

  return (
    <>
      <Paper
        sx={{
          mt: 1,
          height: '100%',
          borderRadius: '4px',
          p: 2,
          pointerEvents:
            dataForDepositCallLocalStorage ||
            dataToMakeCreateSellOrderCallLocalStorage ||
            onGoingApproveLocalStorage
              ? 'none'
              : 'all',
          opacity:
            dataForDepositCallLocalStorage ||
            dataToMakeCreateSellOrderCallLocalStorage ||
            onGoingApproveLocalStorage
              ? 0.5
              : 1,
        }}
      >
        <CardRow
          title="Wallet Balance for Sale :"
          titleStyle={{
            color: Colors.lightPrimary1,
            fontSize: 16,
            fontWeight: 500,
          }}
          valueStyle={{
            fontSize: 16,
            fontWeight: 500,
          }}
          value={`${walletBal || 0} VCOT`}
        />
        <CardRow
          title="Approved Token Balance :"
          titleStyle={{
            color: Colors.lightPrimary1,
            fontSize: 16,
            fontWeight: 500,
          }}
          valueStyle={{
            fontSize: 16,
            fontWeight: 500,
          }}
          value={`${approvedTokensBal || 0} VCOT`}
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
          value={`${exchangeBal || 0} VCOT`}
        />
        <TabSelector
          tabArray={[' Approve', 'Deposit', 'Sell Order']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabStyle={{ width: 'auto' }}
        />
        {tabIndex === 1 && <TabSellApprove />}
        {tabIndex === 2 && <TabSellDeposit />}
        {tabIndex === 3 && <TabSellCreateSellOrder />}
      </Paper>
    </>
  )
}

export default SellToken
