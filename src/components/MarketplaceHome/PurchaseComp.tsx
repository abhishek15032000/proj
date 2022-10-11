import React, { FC, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { ethers } from 'ethers'
import { shallowEqual } from 'react-redux'
import BlockchainCalls from '../../blockchain/Blockchain'
import { EXCHANGE_CONTRACT_ADDRESS } from '../../config/exchange.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import BuyToken from './BuyToken'
import SellToken from './SellToken'

interface PurchaseCompProps {}

const PurchaseComp: FC<PurchaseCompProps> = (props) => {
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const [walletBal, setWalletBal] = useState<any>()
  const [exchangeBal, setExchangeBal] = useState<any>()

  useEffect(() => {
    getWalletBalance()
    getBalanceOnExchange()
  }, [])

  async function getWalletBalance() {
    try {
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      await tokenContractFunctions.estimateGas.balanceOf(accountAddress)
      const balanceCallRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      if (balanceCallRes) {
        const bal =
          Math.round(Number(balanceCallRes.toString()) * 10 ** -18 * 1000) /
          1000
        setWalletBal(bal)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function getBalanceOnExchange() {
    try {
      const exchangeContractFunctions = await BlockchainCalls.exchange_caller()
      await exchangeContractFunctions.estimateGas.balances(
        accountAddress,
        EXCHANGE_CONTRACT_ADDRESS
      )

      const exchangeBal = await exchangeContractFunctions.balances(
        accountAddress,
        EXCHANGE_CONTRACT_ADDRESS
      )
      const bigNumExchangeBal = ethers.BigNumber.from(exchangeBal)
      setExchangeBal(bigNumExchangeBal.toNumber())
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid container mt={2} columnSpacing={2}>
      <Grid item xs={6}>
        <BuyToken walletBal={walletBal} exchangeBal={exchangeBal} />
      </Grid>
      <Grid item xs={6}>
        <SellToken walletBal={walletBal} exchangeBal={exchangeBal} />
      </Grid>
    </Grid>
  )
}

export default PurchaseComp
