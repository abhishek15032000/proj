import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import { marketplaceCalls } from '../../../api/marketplaceCalls.api'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setBuyOrderPayloadAmountsToTake,
  setBuyOrderPayloadOfferHashes,
  setBuyQuantityForBuyOrder,
  setBuyUnitPrice,
  setTotalAmountForBuying,
} from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import { createBuyOrder } from '../../../utils/marketplace.utils'
import CardRow from '../CardRow'

const TabBuyCreateBuyOrder = () => {
  const dispatch = useAppDispatch()

  const buyQuantityForBuyOrder = useAppSelector(
    ({ marketplace }) => marketplace.buyQuantityForBuyOrder,
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
  const onGoingApproveReduxBuyFlow = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveReduxBuyFlow,
    shallowEqual
  )

  const checkForFullFillOrder = async () => {
    try {
      const res = await marketplaceCalls.checkForFullFillOrder(
        buyQuantityForBuyOrder
      )
      if (res?.success && res?.data && res?.data?.length) {
        const offerHashes: any = []
        const amountsToTake: any = []
        const total = res?.data.reduce((prev: any, curr: any) => {
          offerHashes.push(curr.hash)
          amountsToTake.push(curr.cab)
          return (prev += curr.cab * curr.rate)
        }, 0)
        const unitPriceLocal =
          Math.round((total / Number(buyQuantityForBuyOrder)) * 1000) / 1000
        dispatch(setTotalAmountForBuying(total))
        dispatch(setBuyUnitPrice(unitPriceLocal))
        dispatch(setBuyOrderPayloadOfferHashes(offerHashes))
        dispatch(setBuyOrderPayloadAmountsToTake(amountsToTake))
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.checkForFullFillOrder api :', err)
    }
  }

  const isThereApproveObject = () => {
    return onGoingApproveReduxBuyFlow ? true : false
  }

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity"
              value={buyQuantityForBuyOrder}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setBuyQuantityForBuyOrder(e?.target?.value))
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
        <Typography
          sx={{
            mt: 1,
            fontSize: 14,
            fontWeight: 500,
            color: buyQuantityForBuyOrder
              ? Colors.textColorLightGreen
              : Colors.lightGray,
            cursor: buyQuantityForBuyOrder ? 'pointer' : 'not-allowed',
            textDecoration: 'underline',
          }}
          onClick={() => {
            if (buyQuantityForBuyOrder) {
              checkForFullFillOrder()
            }
          }}
        >
          Click to check for Token and Unit Price
        </Typography>
        <CardRow title="Unit Price :" value={`${buyUnitPrice || 0} INR`} />
        <CardRow
          title="Total amount to be paid :"
          value={`${totalAmountForBuying || 0} INR`}
        />
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <CCButton
            sx={{
              mt: 3,
              alignSelf: 'center',
              bgcolor: Colors.darkPrimary1,
              color: Colors.white,
              padding: '8px 24px',
              borderRadius: '30px',
              fontSize: 14,
              minWidth: '120px',
            }}
            variant="contained"
            onClick={createBuyOrder}
            disabled={
              isThereApproveObject() ||
              !buyQuantityForBuyOrder ||
              !buyUnitPrice ||
              !totalAmountForBuying
            }
          >
            Buy
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default TabBuyCreateBuyOrder
