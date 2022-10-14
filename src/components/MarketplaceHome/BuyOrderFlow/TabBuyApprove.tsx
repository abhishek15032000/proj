import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { LOCAL_STORAGE_VARS } from '../../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setBuyQuantity } from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import { requestApprovalForTokenBuy } from '../../../utils/marketplace.utils'
import { getLocalItem } from '../../../utils/Storage'
import CardRow from '../CardRow'

interface Props {}

const TabBuyApprove = (props: Props) => {
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

  const dataForBuyCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_BUY_CALL
  )
  const dataToMakeCreateSellOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )
  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_BUY_FLOW
  )

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
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
            onClick={() => {
              dataForBuyCallLocalStorage ||
              dataToMakeCreateSellOrderCallLocalStorage ||
              onGoingApproveLocalStorage
                ? null
                : requestApprovalForTokenBuy()
            }}
          >
            Buy
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default TabBuyApprove
