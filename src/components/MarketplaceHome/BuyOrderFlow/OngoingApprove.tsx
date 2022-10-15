import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../../atoms/CCTable'
import { LOCAL_STORAGE_VARS } from '../../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setDataToMakeDepositCallBuyFlow,
  setOnGoingApproveRedux,
  setOnGoingApproveReduxBuyFlow,
} from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import { limitTitleFromMiddle } from '../../../utils/commonFunctions'
import {
  getApprovedTokensBalanceBuyFlow,
  getTransaction,
} from '../../../utils/marketplace.utils'
import { getLocalItem, setLocalItem } from '../../../utils/Storage'

const headings = ['Transaction ID', 'Quantity', 'Status']

const OngoingApprove = () => {
  const dispatch = useAppDispatch()

  const onGoingApproveBuyFlowLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_BUY_FLOW
  )

  const onGoingApproveReduxBuyFlow = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveReduxBuyFlow,
    shallowEqual
  )

  const [rows, setRows] = useState<any>()
  useEffect(() => {
    if (onGoingApproveBuyFlowLocalStorage && onGoingApproveReduxBuyFlow) {
      dispatch(setOnGoingApproveRedux(onGoingApproveBuyFlowLocalStorage))
      setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_BUY_FLOW, null)
      setLocalItem(LOCAL_STORAGE_VARS.BUY_QUANTITY_FOR_APPROVE, null)
    } else {
      setRows(null)
    }
  }, [])

  useEffect(() => {
    if (onGoingApproveReduxBuyFlow) {
      makeRows(onGoingApproveReduxBuyFlow)
      checkForPendingTransactions()
    } else {
      setRows(null)
    }
  }, [onGoingApproveReduxBuyFlow])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(onGoingApproveReduxBuyFlow?.hash),
        '-',
        receipt?.blockHash ? 'Completed' : 'In-progress',
      ],
    ]
    setRows(rows)
  }

  const checkForPendingTransactions = async () => {
    try {
      const receipt: any = await getTransaction(
        onGoingApproveReduxBuyFlow?.hash
      )
      if (!receipt?.success) {
        //This means approve call is done and put in blockchain
        const newReceipt: any = await receipt?.res.wait()
        if (newReceipt?.blockHash) {
          dispatch(setDataToMakeDepositCallBuyFlow(newReceipt))
          dispatch(setOnGoingApproveReduxBuyFlow(null))
          setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_BUY_FLOW, null)
          getApprovedTokensBalanceBuyFlow()
        }
        makeRows(receipt)
        getApprovedTokensBalanceBuyFlow()
      }
    } catch (err) {
      console.log('Error ', err)
    }
  }
  return (
    <>
      {rows && rows.length ? (
        <CCTable headings={headings} rows={rows} />
      ) : (
        <Box
          sx={{
            mt: 2,
            bgcolor: Colors?.darkPrimary2,
            p: 1,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography>No Ongoing Transactions Pending for Approve</Typography>
        </Box>
      )}
    </>
  )
}

export default OngoingApprove
