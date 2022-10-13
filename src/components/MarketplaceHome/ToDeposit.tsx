import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import { LOCAL_STORAGE_VARS } from '../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setDataToMakeDepositCall } from '../../redux/Slices/marketplaceSlice'
import { Colors } from '../../theme'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'
import { depositERC20 } from '../../utils/marketplace.utils'
import { getLocalItem, setLocalItem } from '../../utils/Storage'

const headings = ['txId', 'Quantity', 'Status', 'action']

const ToDeposit = () => {
  const dispatch = useAppDispatch()
  const dataToMakeCreateSellOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateSellOrderCall,
    shallowEqual
  )

  const dataForDepositCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL
  )

  const dataToMakeDepositCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeDepositCall,
    shallowEqual
  )

  const [rows, setRows] = useState<any>()

  useEffect(() => {
    if (dataForDepositCallLocalStorage && !dataForDepositCallLocalStorage) {
      dispatch(setDataToMakeDepositCall(dataForDepositCallLocalStorage))
      // setLocalItem(LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL, null)
    } else {
      setRows(null)
    }
  }, [])

  useEffect(() => {
    if (dataToMakeDepositCall) {
      makeRows(dataToMakeDepositCall)
    } else {
      setRows(null)
    }
  }, [dataToMakeDepositCall])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(dataToMakeDepositCall?.transactionHash),
        '-',
        receipt?.blockHash ? 'Completed' : 'In-progress',
        <CCButton
          key={1}
          sx={{
            mt: 3,
            alignSelf: 'end',
            bgcolor: Colors.darkPrimary1,
            color: Colors.white,
            padding: '8px 24px',
            borderRadius: '30px',
            fontSize: 14,
            minWidth: '120px',
          }}
          onClick={depositERC20}
          disabled={!receipt?.blockHash}
          variant="contained"
        >
          Deposit
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
          <Typography>No Transactions Pending to Deposit</Typography>
        </Box>
      )}
    </>
  )
}

export default ToDeposit
