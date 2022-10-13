import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import { LOCAL_STORAGE_VARS } from '../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setDataToMakeCreateSellOrderCall,
  setDataToMakeDepositCall,
} from '../../redux/Slices/marketplaceSlice'
import { Colors } from '../../theme'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'
import { createSellOrder } from '../../utils/marketplace.utils'
import { getLocalItem } from '../../utils/Storage'

const headings = ['txId', 'Quantity', 'Status', 'action']

const CreateSellOrder = () => {
  const dispatch = useAppDispatch()
  const dataToMakeCreateSellOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateSellOrderCall,
    shallowEqual
  )

  const dataToMakeCreateSellOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )

  const [rows, setRows] = useState<any>()

  useEffect(() => {
    if (dataToMakeCreateSellOrderCallLocalStorage) {
      dispatch(
        setDataToMakeCreateSellOrderCall(
          dataToMakeCreateSellOrderCallLocalStorage
        )
      )
      // setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL, null)
    } else {
      setRows(null)
    }
  }, [])

  useEffect(() => {
    if (dataToMakeCreateSellOrderCall) {
      makeRows(dataToMakeCreateSellOrderCall)
    } else {
      setRows(null)
    }
  }, [dataToMakeCreateSellOrderCall])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(dataToMakeCreateSellOrderCall?.transactionHash),
        '-',
        receipt?.blockHash ? 'Completed' : 'In-progress',
        <CCButton
          key={1}
          sx={{
            mt: 3,
            alignSelf: 'end',
            bgcolor: Colors.darkPrimary1,
            color: Colors.white,
            padding: '6px 20px',
            borderRadius: '24px',
            fontSize: 14,
            minWidth: '80px',
          }}
          onClick={createSellOrder}
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

export default CreateSellOrder
