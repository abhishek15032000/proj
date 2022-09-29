// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { IssuerWalletProps } from './IssuerWallet.interface'
import { Colors } from '../../theme'
import DashboardStatistics from '../../atoms/DashboardStatistics/DashboardStatistics'
import TransactionHistory from './TransactionHistory'
import BlockchainCalls from '../../blockchain/Blockchain'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { WalletStats } from '../../config/constants.config'
import { issuerCalls } from '../../api/issuerCalls.api'

const stats = [
  {
    title: WalletStats.WALLET_BALANCE,
    value: 'MATIC 0',
  },
  {
    title: WalletStats.VCO_ON_SALE,
    value: '0',
    color: Colors.lightPinkBackground,
  },
  {
    title: WalletStats.VCO_AVAILABLE_FOR_SALE,
    value: '0',
    color: Colors.lightGreenBackground3,
  },
]

const IssuerWallet = (props: IssuerWalletProps) => {
  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const accountBalance = useAppSelector(
    ({ wallet }) => wallet.accountBalance,
    shallowEqual
  )
  const [dashboardStatistics, setDashboardStatistics] = useState<null | any>(
    stats
  )
  const [vcoOnSale, setVCOOnSale] = useState(0)
  const [vcoAvailableFoSale, setVCOAvailableFoSale] = useState(0)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [vcoLoading, setVCOLoading] = useState(false)
  const [vcoAvailableFoSaleLoading, setVCOAvailableFoSaleLoading] =
    useState(false)

  useEffect(() => {
    // tokenContractCalls()
    getVCOAvailabelForSale()
  }, [])

  // useEffect(() => {
  //   console.log('vcoonsale useEffect')
  //   if (dashboardStatistics && vcoOnSale) {
  //     const dashboardStatisticsCopy = [...dashboardStatistics]
  //     dashboardStatisticsCopy[1].value = vcoOnSale
  //     setDashboardStatistics(dashboardStatisticsCopy)
  //   }
  // }, [vcoOnSale])
  // useEffect(() => {
  //   console.log('vcoAvailableFoSale useEffect')
  //   if (dashboardStatistics && vcoAvailableFoSale) {
  //     const dashboardStatisticsCopy = [...dashboardStatistics]
  //     dashboardStatisticsCopy[2].value = vcoAvailableFoSale
  //     setDashboardStatistics(dashboardStatisticsCopy)
  //   }
  // }, [vcoAvailableFoSale])
  // console.log('vcoAvailableFoSale', vcoAvailableFoSale)

  // useEffect(() => {
  //   // console.log('accountBalance useEffect')
  //   // console.log('accountBalance above if', accountBalance)
  //   if (dashboardStatistics && accountBalance) {
  //     // console.log('accountBalance useEffect in if')
  //     const dashboardStatisticsCopy = [...dashboardStatistics]
  //     const bal = 'MATIC ' + Math.round(Number(accountBalance) * 1000) / 1000
  //     // console.log('accountBalance', accountBalance)
  //     // console.log('bal', bal)
  //     dashboardStatisticsCopy[0].value = bal
  //     setDashboardStatistics(dashboardStatisticsCopy)
  //   }
  // }, [accountBalance])

  const tokenContractCalls = async () => {
    try {
      console.log('vcoLoading made true')
      setVCOLoading(true)
      console.log('above contract function')
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      const abc = await tokenContractFunctions.estimateGas.balanceOf(
        accountAddress
      )
      console.log('tokenContractFunctions', tokenContractFunctions)
      console.log('abc', abc)
      const createProjectRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      console.log('after  res', createProjectRes)
      const bal = Number(createProjectRes.toString()) * 10 ** -18
      // console.log(createProjectRes, bal)
      setVCOOnSale(bal)
    } catch (error) {
      console.log('Error : ', error)
    } finally {
      console.log('made false')
      setVCOLoading(false)
    }
  }

  const getVCOAvailabelForSale = async () => {
    try {
      setVCOAvailableFoSaleLoading(true)
      const res = await issuerCalls.getIssuerTokenStats()
      console.log('res', res)
      if (res?.success && res?.data) {
        const token = res?.data?.totalQuantityForSales
        if (token !== undefined) {
          setVCOAvailableFoSale(token)
        }
      }
    } catch (error) {
      console.log('Error : ', error)
    } finally {
      setVCOAvailableFoSaleLoading(false)
    }
  }

  // console.log('balanceLoading || vcoLoading', balanceLoading, vcoLoading)
  // console.log('vcoOnSale', vcoOnSale)
  // console.log('vcoLoading', vcoLoading)
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader title="Wallet" iconDisable />
        </Grid>

        <DashboardStatistics
          data={dashboardStatistics}
          // loading={balanceLoading || vcoLoading}
          loading={balanceLoading || vcoAvailableFoSaleLoading}
        />

        <Grid item xs={12}>
          <TransactionHistory />
          {/* <EmptyComponent
            photoType={3}
            title="No transaction history!"
            exploreMarketplace
          /> */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default IssuerWallet
