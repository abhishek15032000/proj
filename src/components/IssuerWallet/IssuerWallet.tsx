// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { IssuerWalletProps } from './IssuerWallet.interface'
import { Colors } from '../../theme'
// import DashboardStatistics from '../VerifierProjects/DashboardStatistics'
import DashboardStatistics from '../../atoms/DashboardStatistics/DashboardStatistics'
import TransactionHistory from './TransactionHistory'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import BlockchainCalls from '../../blockchain/Blockchain'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { WalletStats } from '../../config/constants.config'

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
    null
  )
  const [vcoOnSale, setVCOOnSale] = useState(0)

  useEffect(() => {
    setDashboardStatistics(stats)
    tokenContractCalls()
  }, [])

  useEffect(() => {
    if (dashboardStatistics && vcoOnSale) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[1].value = vcoOnSale
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [vcoOnSale])
  useEffect(() => {
    if (dashboardStatistics && accountBalance) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[0].value =
        'MATIC ' + Math.round(Number(accountBalance) * 1000) / 1000
      setDashboardStatistics(dashboardStatisticsCopy)
    }
  }, [accountBalance])

  const tokenContractCalls = async () => {
    try {
      const tokenContractFunctions = await BlockchainCalls.token_caller()
      await tokenContractFunctions.estimateGas.balanceOf(accountAddress)
      const createProjectRes = await tokenContractFunctions.balanceOf(
        accountAddress
      )
      const bal = Number(createProjectRes.toString()) * 10 ** -18
      console.log(createProjectRes, bal)
      setVCOOnSale(bal)
    } catch (error) {
      console.log('Error : ', error)
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

        <DashboardStatistics data={dashboardStatistics} />

        <Grid item xs={12}>
          <TransactionHistory />
          <EmptyComponent
            photoType={3}
            title="No transaction history!"
            // listNewProject
            exploreMarketplace
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default IssuerWallet
