import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setBuyQuantity } from '../../redux/Slices/marketplaceSlice'
import { Colors } from '../../theme'
import CardRow from './CardRow'

interface BuyTokenProps {}

const BuyToken: FC<BuyTokenProps> = () => {
  const dispatch = useAppDispatch()

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
  const walletBal = useAppSelector(
    ({ marketplace }) => marketplace.walletBal,
    shallowEqual
  )
  const exchangeBal = useAppSelector(
    ({ marketplace }) => marketplace.exchangeBal,
    shallowEqual
  )

  return (
    <Paper
      sx={{
        height: '100%',
        borderRadius: '4px',
        p: 2,
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
        value={`${walletBal || 0} VCOT`}
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
      <Box sx={{ position: 'relative', pt: 1 }}>
        <Box>
          <LabelInput
            label="Quantity "
            sx={{ width: '100%' }}
            value={buyQuantity}
            setValue={(e: any) => {
              //Allow only no.s upto 3 decimal places
              const regexp = /^\d+(\.\d{0,3})?$/
              if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                dispatch(setBuyQuantity(e?.target?.value))
              }
            }}
          />
        </Box>
        <Box
          sx={{
            color: '#3F4946',
            position: 'absolute',
            top: '50%',
            right: 10,
          }}
        >
          VCOT
        </Box>
      </Box>
      <CardRow title="Unit Price :" value={`${buyUnitPrice || 0} USD`} />
      <CardRow
        title="Total amount to be paid :"
        value={`${totalAmountForBuying || 0} USD`}
      />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <CCButton
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
        >
          Buy
        </CCButton>
      </Box>
    </Paper>
  )
}

export default BuyToken
