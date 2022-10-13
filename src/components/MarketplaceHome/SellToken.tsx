import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { LOCAL_STORAGE_VARS } from '../../config/roles.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setSellQuantity,
  setSellUnitPrice,
} from '../../redux/Slices/marketplaceSlice'
import { Colors } from '../../theme'
import {
  getApprovedTokensBalance,
  requestApprovalForTokenSelling,
} from '../../utils/marketplace.utils'
import { getLocalItem } from '../../utils/Storage'
import CardRow from './CardRow'

interface SellTokenProps {}

const SellToken: FC<SellTokenProps> = () => {
  const dispatch = useAppDispatch()

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const sellQuantity = useAppSelector(
    ({ marketplace }) => marketplace.sellQuantity,
    shallowEqual
  )
  const sellUnitPrice = useAppSelector(
    ({ marketplace }) => marketplace.sellUnitPrice,
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
  const approvedTokensBal = useAppSelector(
    ({ marketplace }) => marketplace.approvedTokensBal,
    shallowEqual
  )

  const dataForDepositCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_DEPOSIT_CALL
  )
  const dataToMakeCreateSellOrderCallLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.DATA_FOR_CREATE_SELL_ORDER_CALL
  )
  const onGoingApproveLocalStorage = getLocalItem(
    LOCAL_STORAGE_VARS.ON_GOING_APPROVE_DATA
  )

  const dataToMakeDepositCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeDepositCall,
    shallowEqual
  )
  const dataToMakeCreateSellOrderCall = useAppSelector(
    ({ marketplace }) => marketplace.dataToMakeCreateSellOrderCall,
    shallowEqual
  )
  const onGoingApproveRedux = useAppSelector(
    ({ marketplace }) => marketplace.onGoingApproveRedux,
    shallowEqual
  )
  useEffect(() => {
    if (accountAddress) {
      getApprovedTokensBalance()
    }
  }, [accountAddress])

  console.log({
    dataForDepositCallLocalStorage,
    dataToMakeCreateSellOrderCallLocalStorage,
    dataToMakeDepositCall,
    dataToMakeCreateSellOrderCall,
    onGoingApproveLocalStorage,
    onGoingApproveRedux,
  })
  return (
    <>
      <Paper
        sx={{
          height: '100%',
          borderRadius: '4px',
          p: 2,
        }}
      >
        <CardRow
          title="Wallet Balance for Sale :"
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
          title="Approved Token Balance :"
          titleStyle={{
            color: Colors.lightPrimary1,
            fontSize: 16,
            fontWeight: 500,
          }}
          valueStyle={{
            fontSize: 16,
            fontWeight: 500,
          }}
          value={`${approvedTokensBal || 0} VCOT`}
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
              alignSelf: 'end',
              bgcolor: Colors.darkPrimary1,
              color: Colors.white,
              padding: '8px 24px',
              borderRadius: '30px',
              fontSize: 14,
              minWidth: '120px',
            }}
            variant="contained"
            onClick={requestApprovalForTokenSelling}
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
      </Paper>
    </>
  )
}

export default SellToken
