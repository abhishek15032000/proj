import { Box, Grid, Modal, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { issuerCalls } from '../../api/issuerCalls.api'
import { USER } from '../../api/user.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import DashboardStatistics from '../../atoms/DashboardStatistics/DashboardStatistics'
import NotificationList from '../../atoms/NotificationList'
import Spinner from '../../atoms/Spinner'
import BlockchainCalls from '../../blockchain/Blockchain'
import { WalletStats } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setAllBankDetailsList } from '../../redux/Slices/allBankDetailsSlice'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import AddAccountDetails from './AddAccountDetailsPopup'
import DashboardStatisticsCustom from './DashboardStatisticsCustom'
import { IssuerWalletProps } from './IssuerWallet.interface'
import SavedAccountPopup from './SavedAccountPopup'
import TransactionHistoryTable from './TransactionHistory'
import WithdrawPopup from './WithdrawPopup'
import LoaderOverlay from '../../components/LoderOverlay'
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
  const dispatch: any = useAppDispatch()

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const accountBalance = useAppSelector(
    ({ wallet }) => wallet.accountBalance,
    shallowEqual
  )
  const allBankDetails = useAppSelector(
    ({ allBankDetailsSlice }) => allBankDetailsSlice.allBankDetails,
    shallowEqual
  )
  const [dashboardStatistics, setDashboardStatistics] = useState<null | any>(
    stats
  )
  const [vcoOnSale, setVCOOnSale] = useState(0)
  const [vcoAvailableFoSale, setVCOAvailableFoSale] = useState(0)
  const [balanceLoading, setBalanceLoading] = useState(false)
  const [vcoLoading, setVCOLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [allBankAccount, setAllBankAccount] = useState()
  const [BankDetailsData, setBankDetailsData] = useState({
    bankName: '',
    bankNumber: '',
    accountOwnerName: '',
    branch: '',
    IFSCCode: '',
    isChecked: false,
  })
  const [isVisibleAddAccount, setIsVisibleAddAccount] = useState(false)
  const [isVisibleWithdraw, setIsVisibleWithdraw] = useState(false)
  const [selectAccount, setSelectAccount] = useState<any>('')

  const [isVisibleAddAccountSucess, setIsVisibleAddAccountSucess] =
    useState(false)
  const onChangeInput = (e: any, key: any, value: any) => {
    console.log('onChangeInput<<<<<<<<<<<', e, key, value)
    const addAccountDetails = { ...BankDetailsData }
    setBankDetailsData({ ...addAccountDetails, [key]: value })
  }

  useEffect(() => {
    setLoading(true)
    issuerCalls
      .getAllBankAccount()
      .then((res) => {
        setLoading(false)
        console.log('AllBankData', res?.data)
        dispatch(setAllBankDetailsList(res?.data))
        setAllBankAccount(res?.data)
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }, [])

  const onSaveAccountDetails = () => {
    const { bankNumber, accountOwnerName, branch, IFSCCode, bankName } =
      BankDetailsData
    if (
      bankName === '' ||
      bankName === undefined ||
      bankNumber === '' ||
      bankNumber === undefined ||
      accountOwnerName === '' ||
      accountOwnerName === undefined ||
      branch === '' ||
      branch === undefined ||
      IFSCCode === '' ||
      IFSCCode === undefined
    ) {
      alert('Fill all the Fields!')
      return
    }
    setIsVisibleAddAccount(false)
    setLoading(true)
    const payload = {
      bankName: bankName,
      accountNumber: bankNumber,
      name: accountOwnerName,
      branch: branch,
      ifscCode: IFSCCode,
      default: 0,
    }

    console.log('payload', payload)
    issuerCalls
      .addBankAccountDetails(payload)
      .then((response) => {
        console.log('response', response)
        setLoading(false)
        setIsVisibleAddAccountSucess(true)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const openWithdrawPopup = () => {
    setIsVisibleAddAccountSucess(false)
    setIsVisibleWithdraw(true)
  }
  const [vcoAvailableFoSaleLoading, setVCOAvailableFoSaleLoading] =
    useState(false)

  useEffect(() => {
    tokenContractCalls()
    getVCOAvailabelForSale()
  }, [])

  useEffect(() => {
    if (dashboardStatistics && vcoOnSale) {
      const dashboardStatisticsCopy = [...dashboardStatistics]
      dashboardStatisticsCopy[1].value =
        Math.round(Number(vcoOnSale) * 1000) / 1000
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

  const onWithdrawAmount = () => {
    const { bankNumber, accountOwnerName, branch, IFSCCode, bankName } =
      BankDetailsData
    if (withdrawAmount === '' || withdrawAmount === undefined) {
      alert('Fill all the Fields!')
      return
    }
    if (selectAccount === '' || withdrawAmount === undefined) {
      alert('Select Account Bank Account!')
      return
    }
    // if (withdrawAmount >= accountBalance) {
    //   alert('Insufficient balance!')
    //   return
    // }
    setIsVisibleWithdraw(false)
    setLoading(true)
    const payload = {
      uuid: selectAccount?.uuid,
      amount: Number(withdrawAmount),
      currency: 'Matic',
      // bankName: selectAccount?.bankName,
      // accountNumber: selectAccount?.accountNumber,
      // name: selectAccount?.name,
      // branch: selectAccount?.branch,
      // ifscCode: selectAccount?.ifscCode,
    }

    console.log('payload', payload, selectAccount)
    issuerCalls
      .withdrawAmount(payload)
      .then((response) => {
        console.log('response', response)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  {
    console.log(
      'allBankDetails====================',
      allBankDetails,
      accountBalance,
      withdrawAmount >= accountBalance
    )
  }
  if (loading) {
    return <LoaderOverlay />
  } else {
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
            setIsVisibleWithdraw={(value: any) => setIsVisibleWithdraw(value)}
            loading={balanceLoading || vcoAvailableFoSaleLoading}
          />
          <Grid item xs={12}>
            <TransactionHistoryTable />
          </Grid>
        </Grid>
        <Modal
          open={isVisibleAddAccount}
          onClose={() => setIsVisibleAddAccount(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(56, 142, 129, 0.4)',
          }}
        >
          <AddAccountDetails
            BankDetailsData={BankDetailsData}
            onChangeInput={(e: any, key: any, value: any) =>
              onChangeInput(e, key, value)
            }
            isVisibleAddAccount={isVisibleAddAccount}
            setIsVisibleAddAccount={(value: any) =>
              setIsVisibleAddAccount(value)
            }
            onSaveAccountDetails={() => onSaveAccountDetails()}
          />
        </Modal>
        <Modal
          open={isVisibleAddAccountSucess}
          onClose={() => setIsVisibleAddAccountSucess(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(56, 142, 129, 0.4)',
          }}
        >
          <SavedAccountPopup
            setIsVisibleAddAccountSucess={(value: any) =>
              setIsVisibleAddAccountSucess(value)
            }
            openWithdrawPopup={() => openWithdrawPopup()}
          />
        </Modal>
        <Modal
          open={isVisibleWithdraw}
          onClose={() => setIsVisibleWithdraw(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(56, 142, 129, 0.4)',
          }}
        >
          <WithdrawPopup
            selectAccount={selectAccount}
            setSelectAccount={(value: any) => setSelectAccount(value)}
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={(value: any) => setWithdrawAmount(value)}
            onWithdrawAmount={() => onWithdrawAmount()}
            setIsVisibleAddAccount={(value: any) =>
              setIsVisibleAddAccount(value)
            }
            allBankAccount={allBankAccount}
            setIsVisibleWithdraw={(value: any) => setIsVisibleWithdraw(value)}
          />
        </Modal>
      </Box>
    )
  }
}

export default IssuerWallet
