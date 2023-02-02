import { Box, Grid } from '@mui/material'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CardRow from '../../atoms/CardRow/CardRow'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setSellQuantity,
  setSellWantAmount,
} from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
import { createSellOrder } from '../../utils/newMarketplace.utils'

const SellComp = () => {
  const dispatch = useAppDispatch()

  const carbonTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenBalances,
    shallowEqual
  )
  const carbonTokenSymbol = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenSymbol,
    shallowEqual
  )
  const sellQuantity = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellQuantity,
    shallowEqual
  )
  const sellWantAmount = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.sellWantAmount,
    shallowEqual
  )

  return (
    <Grid item xs={12} md={10}>
      <Box>
        <CardRow
          title="Balance :"
          value={`${
            Math.round(carbonTokenBalances?.totalBalances) || 0
          } ${carbonTokenSymbol}`}
          titleStyle={{ color: '#4A635E' }}
          partitionBasis={6}
        />
        {/* <CardRow
          title={`Approved ${carbonTokenSymbol} Token Balance :`}
          value={`${
            Math.round(carbonTokenBalances?.allowanceBalance) || 0
          } ${carbonTokenSymbol}`}
          titleStyle={{ color: Colors.lightPrimary1 }}
        />
        <CardRow
          title="Balance on Exchange :"
          value={`${
            Math.round(carbonTokenBalances?.assetsBalance) || 0
          } ${carbonTokenSymbol}`}
          titleStyle={{ color: Colors.lightPrimary1 }}
        /> */}
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity "
              sx={{ width: '100%' }}
              value={sellQuantity || ''}
              setValue={(e: any) => {
                //Allow only no.s
                const regexp = /^\d+?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellQuantity(e?.target?.value))
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
            {carbonTokenSymbol}
          </Box>
        </Box>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Unit Price"
              sx={{ width: '100%' }}
              value={sellWantAmount || ''}
              setValue={(e: any) => {
                //Allow only no.s upto 2 decimal places
                const regexp = /^\d+(\.\d{0,2})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellWantAmount(e?.target?.value))
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
            USD
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <CCButton
            sx={{
              mt: 3,
              alignSelf: 'end',
              bgcolor: Colors.textColorLightGreen,
              color: Colors.white,
              padding: '8px 40px',
              borderRadius: '30px',
              fontSize: 14,
              minWidth: 0,
            }}
            onClick={createSellOrder}
            disabled={!sellQuantity || !sellWantAmount}
            variant="contained"
          >
            Sell
          </CCButton>
        </Box>
      </Box>
    </Grid>
  )
}

export default SellComp
