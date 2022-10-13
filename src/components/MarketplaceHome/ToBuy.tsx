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

const headings = ['Transaction ID', 'Quantity', 'Status', 'Action']

const ToBuy = () => {
  const dispatch = useAppDispatch()
  const dataToMakeCreateSellOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateSellOrderCall,
    shallowEqual
  )

  const dataForDepositCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_BUY_CALL
  )

  const dataToMakeBuyCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeBuyCall,
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
    if (dataToMakeBuyCall) {
      makeRows(dataToMakeBuyCall)
    } else {
      setRows(null)
    }
  }, [dataToMakeBuyCall])

  const makeRows = (receipt: any) => {
    const rows = [
      [
        limitTitleFromMiddle(dataToMakeBuyCall?.transactionHash),
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
            padding: '8px 24px',
            borderRadius: '30px',
            fontSize: 14,
            // minWidth: '120px',
          }}
          onClick={depositERC20}
          disabled={!receipt?.blockHash}
          variant="contained"
        >
          Buy
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
          <Typography>No Transactions Pending to Buy</Typography>
        </Box>
      )}
    </>
  )
}

export default ToBuy
