import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import { ethers } from 'ethers'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import Web3 from 'web3'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import BlockchainCalls from '../../blockchain/Blockchain'
import { EXCHANGE_CONTRACT_ADDRESS } from '../../config/exchange.config'
import {
  IND_USD_TOKEN_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from '../../config/token.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setSellQuantity,
  setSellUnitPrice,
} from '../../redux/Slices/marketplaceSlice'
import { Colors } from '../../theme'
import CardRow from './CardRow'

declare let window: any

const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider()

interface SellTokenProps {
  walletBal?: any
  exchangeBal?: any
}

const SellToken: FC<SellTokenProps> = ({ walletBal, exchangeBal }) => {
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

  async function sellToken() {
    try {
      const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
      const tokenContractFunctions = await BlockchainCalls.token_caller()

      await tokenContractFunctions.estimateGas.approve(
        EXCHANGE_CONTRACT_ADDRESS,
        Number(sellQuantity)
      )
      const approveFnRes = await tokenContractFunctions.approve(
        EXCHANGE_CONTRACT_ADDRESS, // exchangeAddress
        Number(sellQuantity)
      )
      if (approveFnRes) {
        depositERC20(sellQuantity)
      }
    } catch (err) {
      console.log('Error: ' + err)
    }
  }
  async function depositERC20(_token: any) {
    const payload = {
      _user: accountAddress,
      _token: TOKEN_CONTRACT_ADDRESS,
      _amount: Number(sellUnitPrice),
      _expectedAmount: Number(sellUnitPrice),
    }
    try {
      const depositERC20Res = await marketplaceCalls.depositERC20(payload)
      if (depositERC20Res.success) {
        createOrderCall()
      } else {
        alert(depositERC20Res.error)
      }
    } catch (err) {
      console.log('Error in marketplaceCalls.depositERC20 api : ' + err)
    }
  }

  async function createOrderCall() {
    const nonce = await provider.getTransactionCount(accountAddress)
    const hashAndVRS = await getHashAndVRS()
    const { hash, v, r, s } = hashAndVRS
    const payload = {
      _maker: accountAddress, //wallet address
      _offerAsset: TOKEN_CONTRACT_ADDRESS, // Carbon Token address
      _wantAsset: IND_USD_TOKEN_ADDRESS, // INR/USD Token address
      _offerAmount: Number(sellQuantity), //quantity
      _wantAmount: Number(sellUnitPrice), //unit
      _feeAsset: TOKEN_CONTRACT_ADDRESS, //carbon token address
      _feeAmount: 1, //1
      _nonce: nonce, //like in submit see getnonce()
      hash: hash,
      _v: v,
      _r: r,
      _s: s,
    }

    try {
      const createOrderRes = await marketplaceCalls.createOrder(payload)
      console.log('createOrderRes', createOrderRes)
    } catch (err) {
      console.log('Error in marketplaceCalls.createOrder api : ' + err)
    }
  }

  async function getHashAndVRS() {
    const nonce: any = await provider.getTransactionCount(accountAddress)
    //Explicitly needed to make them any since typescript was giving type errors when assigining these values to "value" key in "hash" generation(SoliditySHA3 fn)
    const feeAmount: any = 1
    const sellQuantityCopy: any = Number(sellQuantity)
    const sellUnitPriceCopy: any = Number(sellUnitPrice)
    const hash: any = new Web3().utils.soliditySha3(
      { type: 'string', value: 'makeOffer' },
      { type: 'address', value: accountAddress },
      { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
      { type: 'address', value: IND_USD_TOKEN_ADDRESS },
      { type: 'uint256', value: sellQuantityCopy },
      { type: 'uint256', value: sellUnitPriceCopy },
      { type: 'address', value: TOKEN_CONTRACT_ADDRESS },
      { type: 'uint256', value: feeAmount },
      { type: 'uint64', value: nonce }
    )
    const toPassParam = [accountAddress, hash]
    const signature = await BlockchainCalls.requestMethodCalls(
      'personal_sign',
      toPassParam
    )
    const sig = signature.slice(2)
    const v = new Web3().utils.toDecimal(`0x${sig.slice(128, 130)}`)
    const r = `0x${sig.slice(0, 64)}`
    const s = `0x${sig.slice(64, 128)}`
    return { v, r, s, hash }
  }
  return (
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
          fontWeight: 600,
        }}
        valueStyle={{
          fontSize: 16,
          fontWeight: 600,
        }}
        value={`${walletBal} VCOT`}
      />
      <CardRow
        title="Balance on Exchange :"
        titleStyle={{
          color: Colors.lightPrimary1,
          fontSize: 16,
          fontWeight: 600,
        }}
        valueStyle={{
          fontSize: 16,
          fontWeight: 600,
        }}
        value={`${exchangeBal} VCOT`}
      />
      <Box sx={{ position: 'relative' }}>
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
            top: 16,
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
              console.log('first')
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
          onClick={sellToken}
        >
          Sell
        </CCButton>
      </Box>
    </Paper>
  )
}

export default SellToken
