import { Box, Grid, Modal, Typography } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { TOKEN_TYPES } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setOpenWithdrawModal,
  setWithdrawAmount,
  setWithdrawTokenAddress,
  setWithdrawTokenType,
} from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
import { withdraw } from '../../utils/newMarketplace.utils'

const WithdrawModal = () => {
  const dispatch = useDispatch()

  const openWithdrawModal = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.openWithdrawModal,
    shallowEqual
  )
  const carbonTokenSymbol = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenSymbol,
    shallowEqual
  )
  const carbonTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenBalances,
    shallowEqual
  )
  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const inrTokenBalances = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenBalances,
    shallowEqual
  )

  const withdrawTokenType = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.withdrawTokenType,
    shallowEqual
  )
  const withdrawAmount = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.withdrawAmount,
    shallowEqual
  )

  useEffect(() => {
    dispatch(setWithdrawTokenType(TOKEN_TYPES.CARBON))
    dispatch(setWithdrawTokenAddress(carbonTokenAddress))
    dispatch(setWithdrawAmount(0))
  }, [openWithdrawModal])

  return (
    <Modal
      open={openWithdrawModal}
      disableAutoFocus={true}
      onClose={() => dispatch(setOpenWithdrawModal(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Box sx={{ minWidth: '500px', borderRadius: '8px' }}>
        <Box
          sx={{ background: '#fff', px: 3, py: 2, borderRadius: '8px 8px 0 0' }}
        >
          <Typography sx={{ fontSize: 22, color: Colors.tertiary }}>
            Withdraw Balance
          </Typography>
          <Grid container sx={{ mt: 3, color: '#1D4B44', fontWeight: 500 }}>
            <Grid item xs={9}>
              Total available Balance :
            </Grid>
            <Grid item xs={3} sx={{ textAlign: 'right' }}>
              {`${
                withdrawTokenType === TOKEN_TYPES.CARBON
                  ? Math.round(carbonTokenBalances?.totalBalances) || 0
                  : Math.round(inrTokenBalances?.totalBalances) || 0
              } ${
                withdrawTokenType === TOKEN_TYPES.CARBON
                  ? carbonTokenSymbol
                  : TOKEN_TYPES.USD
              }`}
            </Grid>
          </Grid>
          <Box sx={{ position: 'relative', mt: 2 }}>
            <Box>
              <LabelInput
                label="Enter amount to withdraw"
                placeholder="Enter"
                sx={{ width: '100%' }}
                value={withdrawAmount}
                setValue={(e: any) => {
                  //Allow only no.s
                  const regexp = /^\d+?$/
                  if (
                    regexp.test(e?.target?.value) ||
                    e?.target?.value === ''
                  ) {
                    dispatch(setWithdrawAmount(e?.target?.value))
                  }
                }}
              />
            </Box>
            <Box
              sx={{
                color: '#3F4946',
                position: 'absolute',
                top: '35%',
                right: 10,
              }}
            >
              {withdrawTokenType === TOKEN_TYPES.CARBON
                ? carbonTokenSymbol
                : 'USD'}
            </Box>
          </Box>
          <Typography
            sx={{
              mt: 2,
              fontSize: 14,
              color: Colors.darkPrimary1,
              fontWeight: 500,
            }}
          >
            {' '}
            Token to Withdraw
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: '10px' }}>
            <TokenTypeBox
              label={carbonTokenSymbol}
              tokenType={TOKEN_TYPES.CARBON}
              selectedTokenType={withdrawTokenType}
            />
            <TokenTypeBox
              label={TOKEN_TYPES.USD}
              tokenType={TOKEN_TYPES.USD}
              selectedTokenType={withdrawTokenType}
            />
          </Box>
        </Box>
        <Box
          sx={{
            background: Colors.lightPrimary2,
            p: 2,
            borderRadius: '0 0 8px 8px',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <CCButtonOutlined
            sx={{
              padding: '8px 40px',
              minWidth: 0,
              borderRadius: '24px',
              fontSize: 14,
              mr: 2,
            }}
            onHoverBgColor={Colors.lightPrimary2}
            onHoverTextColor={Colors.darkPrimary1}
            onClick={() => dispatch(setOpenWithdrawModal(false))}
          >
            Cancel
          </CCButtonOutlined>
          <CCButton
            variant="contained"
            sx={{
              padding: '8px 40px',
              minWidth: 0,
              borderRadius: '24px',
              fontSize: 14,
            }}
            onClick={withdraw}
            disabled={!withdrawAmount}
          >
            Withdraw
          </CCButton>
        </Box>
      </Box>
    </Modal>
  )
}

export default WithdrawModal

interface TokenTypeBoxProps {
  label: string
  tokenType: string
  selectedTokenType: string
}

const TokenTypeBox: FC<TokenTypeBoxProps> = ({
  label,
  tokenType,
  selectedTokenType,
}) => {
  const dispatch = useAppDispatch()

  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const inrTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenAddress,
    shallowEqual
  )

  return (
    <Box
      sx={{
        px: 3,
        py: 1,
        background:
          tokenType === selectedTokenType
            ? Colors.darkPrimary1
            : Colors.lightGreyBackground,
        color:
          tokenType === selectedTokenType ? Colors.white : Colors.defaultIcon,
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 10,
        cursor: 'pointer',
        minWidth: '100px',
        textAlign: 'center',
      }}
      onClick={() => {
        dispatch(setWithdrawTokenType(tokenType))
        const tokenAddress =
          tokenType === TOKEN_TYPES.CARBON
            ? carbonTokenAddress
            : inrTokenAddress
        dispatch(setWithdrawTokenAddress(tokenAddress))
      }}
    >
      {label}
    </Box>
  )
}
