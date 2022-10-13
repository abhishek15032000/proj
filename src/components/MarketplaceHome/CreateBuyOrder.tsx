import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import { LOCAL_STORAGE_VARS } from '../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setDataToMakeCreateBuyOrderCall,
  setDataToMakeDepositCall,
} from '../../redux/Slices/marketplaceSlice'
import { Colors } from '../../theme'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'
import { createBuyOrder } from '../../utils/marketplace.utils'
import { getLocalItem } from '../../utils/Storage'

const headings = ['Transaction ID', 'Quantity', 'Status', 'Action']

const CreateBuyOrder = () => {
  const dispatch = useAppDispatch()
  const dataToMakeCreateBuyOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateBuyOrderCall,
    shallowEqual
  )

  const dataToMakeCreateBuyOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )

  const [rows, setRows] = useState<any>()

  useEffect(() => {
    if (dataToMakeCreateBuyOrderCallLocalStorage) {
      dispatch(
        setDataToMakeCreateBuyOrderCall(
          dataToMakeCreateBuyOrderCallLocalStorage
        )
      )
      // setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL, null)
    } else {
      setRows(null)
    }
  }, [])

  useEffect(() => {
    if (dataToMakeCreateBuyOrderCall) {
      makeRows(dataToMakeCreateBuyOrderCall)
    } else {
      setRows(null)
    }
  }, [dataToMakeCreateBuyOrderCall])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(dataToMakeCreateBuyOrderCall?.transactionHash),
        '-',
        receipt?.blockHash ? 'Completed' : 'In-progress',
        <CCButton
          key={1}
          sx={{
            // mt: 3,
            position: 'relative',
            left: '33%',
            bgcolor: Colors.darkPrimary1,
            color: Colors.white,
            padding: '6px 20px',
            borderRadius: '24px',
            fontSize: 14,
            minWidth: '80px',
          }}
          onClick={createBuyOrder}
          disabled={!receipt?.blockHash}
          variant="contained"
        >
          Create Sell Order
        </CCButton>,
      ],
    ]
    setRows(rows)
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
          <Typography>No Transactions Pending to Create Sell Order</Typography>
        </Box>
      )}
    </>
  )
}

export default CreateBuyOrder
