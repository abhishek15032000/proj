import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CardRow from '../../atoms/CardRow/CardRow'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useMarket } from '../../hooks/useMarket'
import { setBuyQuantity } from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
// import { createBuyOrder } from '../../utils/newMarketplace.utils'
import BuyTokenPriceDetails from './BuyTokenPriceDetails'

const BuyComp = () => {
  const dispatch = useAppDispatch()

  const { createBuyOrder } = useMarket()

  const inrTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenBalances,
    shallowEqual
  )
  const carbonTokenSymbol = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenSymbol,
    shallowEqual
  )
  const buyQuantity = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.buyQuantity,
    shallowEqual
  )

  return (
    <Grid item sm={12} md={10}>
      <CardRow
        title="Wallet Balance for Purchase :"
        value={`${Math.round(inrTokenBalances?.totalBalances) || 0} INR`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <CardRow
        title="Approved Token(INR/USD) Balance :"
        value={`${Math.round(inrTokenBalances?.allowanceBalance) || 0} INR`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <CardRow
        title="Balance on Exchange :"
        value={`${Math.round(inrTokenBalances?.assetsBalance) || 0} INR`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <Box sx={{ position: 'relative', pt: 1 }}>
        <Box>
          <LabelInput
            label="Quantity"
            sx={{ width: '100%' }}
            value={buyQuantity}
            setValue={(e: any) => {
              //Allow only no.s
              const regexp = /^\d+?$/
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
          {carbonTokenSymbol}
        </Box>
      </Box>
      <BuyTokenPriceDetails />
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
          onClick={createBuyOrder}
          disabled={!buyQuantity}
          variant="contained"
        >
          Buy
        </CCButton>
      </Box>
    </Grid>
  )
}

export default BuyComp
