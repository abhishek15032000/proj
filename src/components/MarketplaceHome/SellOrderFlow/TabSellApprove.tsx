import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../../atoms/CCButton'
import LabelInput from '../../../atoms/LabelInput/LabelInput'
import { LOCAL_STORAGE_VARS } from '../../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setSellQuantity,
  setSellUnitPrice,
} from '../../../redux/Slices/marketplaceSlice'
import { Colors } from '../../../theme'
import { requestApprovalForTokenSelling } from '../../../utils/marketplace.utils'
import { getLocalItem } from '../../../utils/Storage'

interface Props {}

const TabSellApprove = (props: Props) => {
  const dispatch = useAppDispatch()

  const sellQuantity = useAppSelector(
    ({ marketplace }) => marketplace.sellQuantity,
    shallowEqual
  )
  const sellUnitPrice = useAppSelector(
    ({ marketplace }) => marketplace.sellUnitPrice,
    shallowEqual
  )

  const dataForDepositCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL_SELL_FLOW
  )
  const dataToMakeCreateSellOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )
  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA_SELL_FLOW
  )

  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', pt: 1 }}>
          <Box>
            <LabelInput
              label="Quantity"
              value={sellQuantity}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
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
            VCOT
          </Box>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Box>
            <LabelInput
              label="Unit Price"
              value={sellUnitPrice}
              setValue={(e: any) => {
                //Allow only no.s upto 3 decimal places
                const regexp = /^\d+(\.\d{0,3})?$/
                if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                  dispatch(setSellUnitPrice(e?.target?.value))
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
            USD
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
            onClick={() => {
              dataForDepositCallLocalStorage ||
              dataToMakeCreateSellOrderCallLocalStorage ||
              onGoingApproveLocalStorage
                ? null
                : requestApprovalForTokenSelling()
            }}
            // disabled={
            //   dataForDepositCallLocalStorage ||
            //   dataToMakeCreateSellOrderCallLocalStorage ||
            //   dataToMakeDepositCall ||
            //   dataToMakeCreateSellOrderCall ||
            //   onGoingApproveLocalStorage ||
            //   onGoingApproveRedux
            // }
          >
            Approve
          </CCButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default TabSellApprove
