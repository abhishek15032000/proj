import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setSellQuantityForSellOrder,
  setSellUnitPriceForSellOrder,
} from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import { createSellOrder } from '../../../utils/marketplace.utils'

const TabSellCreateSellOrder = () => {
  const dispatch = useAppDispatch()

  const sellQuantityForSellOrder = useAppSelector(
    ({ marketplace }) => marketplace.sellQuantityForSellOrder,
    shallowEqual
  )
  const sellUnitPriceForSellOrder = useAppSelector(
    ({ marketplace }) => marketplace.sellUnitPriceForSellOrder,
    shallowEqual
  )
  const onGoingApproveRedux = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveRedux,
    shallowEqual
  )

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity"
              value={sellQuantityForSellOrder}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellQuantityForSellOrder(e?.target?.value))
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
        <Box sx={{ position: 'relative' }}>
          <Box>
            <LabelInput
              label="Unit Price"
              value={sellUnitPriceForSellOrder}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellUnitPriceForSellOrder(e?.target?.value))
                }
              }}
            />
          </Box>
          <Box
            sx={{
              color: '#3F4946',
              position: 'absolute',
              top: 16,
              right: 10,
            }}
          >
            INR
          </Box>
        </Box>
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
            onClick={createSellOrder}
            disabled={
              onGoingApproveRedux ||
              !sellQuantityForSellOrder ||
              !sellUnitPriceForSellOrder
            }
          >
            Sell
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default TabSellCreateSellOrder
