import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { issuerCalls } from '../../api/issuerCalls.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import DashboardStatistics from '../../atoms/DashboardStatistics/DashboardStatistics'
import NotificationList from '../../atoms/NotificationList'
import BlockchainCalls from '../../blockchain/Blockchain'
import { WalletStats } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors } from '../../theme'
import DashboardStatisticsCustom from './DashboardStatisticsCustom'
import { IssuerWalletProps } from './IssuerWallet.interface'
import TransactionHistoryTable from './TransactionHistory'

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
    tokenContractCalls()
    getVCOAvailabelForSale()
  }, [])

  useEffect(() => {
    if (dashboardStatistics && vcoOnSale) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[1].value = vcoOnSale
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [vcoOnSale])

  useEffect(() => {
    if (dashboardStatistics && vcoAvailableFoSale) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[2].value = vcoAvailableFoSale
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [vcoAvailableFoSale])

  useEffect(() => {
    if (dashboardStatistics && accountBalance) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      const bal = 'MATIC ' + Math.round(Number(accountBalance) * 1000) / 1000
      dashboardStatisticsCopy[0].value = bal
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [accountBalance])

  const tokenContractCalls = async () => {
    try {
      setVCOLoading(true)
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      await tokenContractFunctions.estimateGas.balanceOf(accountAddress)
      const balanceCallRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      const createProjectRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      const bal = Number(createProjectRes.toString()) * 10 ** -18
      setVCOOnSale(bal)
    } catch (error) {
      console.log('Error : ', error)
    } finally {
      setVCOLoading(false)
    }
  }

  const getVCOAvailabelForSale = async () => {
    try {
      setVCOAvailableFoSaleLoading(true)
      const res = await issuerCalls.getIssuerTokenStats()
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

        <DashboardStatisticsCustom
          data={dashboardStatistics}
          // loading={balanceLoading || vcoLoading}
          loading={balanceLoading || vcoAvailableFoSaleLoading}
        />

        <Grid item xs={12}>
          <TransactionHistoryTable />
        </Grid>
      </Grid>
    </Box>
  )
}

export default IssuerWallet
