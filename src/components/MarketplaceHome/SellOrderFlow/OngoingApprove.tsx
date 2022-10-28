import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../../atoms/CCTable'
import { LOCAL_STORAGE_VARS } from '../../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setOnGoingApproveRedux,
  setSellQuantityForApprove,
} from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import { limitTitleFromMiddle } from '../../../utils/commonFunctions'
import {
  getApprovedTokensBalance,
  getTransaction,
} from '../../../utils/marketplace.utils'
import { getLocalItem, setLocalItem } from '../../../utils/Storage'

const headings = ['Transaction ID', 'Quantity', 'Status']

const OngoingApprove = () => {
  const dispatch = useAppDispatch()

  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW
  )
  const sellQuantityForApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_APPROVE
  )

  const onGoingApproveRedux = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveRedux,
    shallowEqual
  )

  const [rows, setRows] = useState<any>()
  useEffect(() => {
    if (onGoingApproveLocalStorage) {
      dispatch(setOnGoingApproveRedux(onGoingApproveLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (onGoingApproveRedux) {
      makeRows(onGoingApproveRedux)
      checkForPendingTransactions()
    } else {
      setRows(null)
    }
  }, [onGoingApproveRedux])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(onGoingApproveRedux?.hash),
        sellQuantityForApproveLocalStorage,
        receipt?.blockHash ? 'Completed' : 'In-progress',
      ],
    ]
    setRows(rows)
  }

  const checkForPendingTransactions = async () => {
    try {
      const receipt: any = await getTransaction(onGoingApproveRedux?.hash)
      if (!receipt?.success) {
        //This means approve call is done and put in blockchain
        const newReceipt: any = await receipt?.res.wait()
        if (newReceipt?.blockHash) {
          getApprovedTokensBalance()
          // dispatch(setDataToMakeDepositCall(newReceipt))
          dispatch(setOnGoingApproveRedux(null))
          dispatch(setSellQuantityForApprove(0))
          setLocalItem(LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW, null)
          setLocalItem(LOCAL_STORAGE_VARS.SELL_QUANTITY_FOR_APPROVE, 0)
        }
        makeRows(receipt)
        getApprovedTokensBalance()
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
