// React Imports
import React, { useEffect, FC, useState } from 'react'

// MUI Imports
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Modal,
  Stack,
  Container,
} from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import AddIcon from '@mui/icons-material/Add'
import AddAccountDetails from '../IssuerWallet/AddAccountDetailsPopup'
import { issuerCalls } from '../../api/issuerCalls.api'
import { setAllBankDetailsList } from '../../redux/Slices/allBankDetailsSlice'
import Spinner from '../../atoms/Spinner'
import { getLocalItem } from '../../utils/Storage'
import LoderOverlay from '../LoderOverlay'
import WalletTab from './WalletTab'
import TransactionList from './TransactionList'
import WalletCred from './WalletCred'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { limitTitle } from '../../utils/commonFunctions'
import moment from 'moment'
import { USER } from '../../api/user.api'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { eventsCalls } from '../../api/eventsCalls.api'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { convertToInternationalCurrencySystem } from '../../utils/commonFunctions'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import WithdrawModal from '../Marketplace/WithdrawModal'
import { pathNames } from '../../routes/pathNames'
import {
  setCurrentProjectUUID,
  setOpenWithdrawModal,
} from '../../redux/Slices/newMarketplaceSlice'

interface WalletProps {}

const Wallet: FC<WalletProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

  const updateWalletLoading = useAppSelector(
    ({ wallet }) => wallet.updateWalletLoading,
    shallowEqual
  )

  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0.0)
  const [balanceINR, setBalanceINR] = useState(0)

  const [tableData, setTableData] = useState([])
  const [lastUpdatedAt, setLastUpdatedAt] = useState('')

  useEffect(() => {
    getAllProjects()
    // getPrivateKey()
  }, [])

  useEffect(() => {
    getAllProjects()
  }, [updateWalletLoading])

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noreferrer')
  }

  const getAllProjects = () => {
    const publicKey = getLocalItem('userDetails2')?.eth_active_pub_key

    setLoading(true)
    eventsCalls.getWalletBalance(publicKey).then((res: any) => {
      if (res?.success) {
        let modifiedRows = res?.data?.token_balance
        modifiedRows = modifiedRows.filter(
          (item: any, index: number) =>
            item?.balance ||
            item?.deposited_balance ||
            (item?.on_sell_balance && item)
        )
        const lasupdated = modifiedRows[0]?.updatedAt
        setLastUpdatedAt(lasupdated)

        setBalance(res?.data?.walletBalance?.balance)
        setBalanceINR(res?.data?.walletBalance?.inr_token_balance)
        const rows =
          modifiedRows &&
          modifiedRows.map((i: any, index: number) => {
            return [
              <Box
                key={index}
                className="td-as-link"
                onClick={() => onClickHandler(i?.project_details?.uuid)}
              >
                <LimitedText
                  key={index}
                  customStyle={{
                    fontSize: 15,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                  text={i?.company_name}
                />
              </Box>,
              <LimitedText
                key={index}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
                text={i?.symbol}
              />,
              <LimitedText
                key={index}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
                text={convertToInternationalCurrencySystem(
                  i?.balance
                ).toString()}
              />,
              <Box
                key={index}
                className="td-as-link"
                onClick={() => {
                  dispatch(setOpenWithdrawModal(true))
                  dispatch(setCurrentProjectUUID(i?.project_details?.uuid))
                }}
              >
                <LimitedText
                  key={index}
                  customStyle={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                  text={convertToInternationalCurrencySystem(
                    i?.deposited_balance
                  ).toString()}
                />
              </Box>,
              <LimitedText
                key={index}
                customStyle={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
                text={convertToInternationalCurrencySystem(
                  i?.on_sell_balance
                ).toString()}
              />,
              <Typography
                key={index}
                textAlign="center"
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  openInNewTab(
                    'https://mumbai.polygonscan.com/token/' + i?.token_address
                  )
                }
              >
                <LimitedText key={index} text={i?.token_address} />
              </Typography>,
            ]
          })

        setTableData(rows)
      }
      setLoading(false)
    })
  }

  const onClickHandler = (projectUUID: string) => {
    if (projectUUID) {
      window.scrollTo(0, 0)
      navigate({
        pathname: pathNames.PROJECT_DETAILS,
        search: `?${createSearchParams({ projectId: projectUUID })}`,
      })
    }
  }

  return (
    <Container maxWidth="xl" disableGutters>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 400,
          color: Colors.tertiary,
          my: 2,
        }}
      >
        Wallet
      </Typography>
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        xl={12}
        // sx={{ border: '0px solid' }}
        justifyContent={'space-between'}
        alignItems={'stretch'}
        display="flex"
        flexDirection={'row'}
        spacing={3}
      >
        <Grid item xs={12} md={12} lg={8} xl={8}>
          <Grid container>
            {/* <Grid
              item
              xs={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            ></Grid> */}
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                borderRadius: '8px',
                py: 3,
                boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  mt: 1,
                  ml: 4,
                }}
              >
                Wallet Balance
              </Typography>
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: '#C12902',
                  mt: 1,
                  ml: 2,
                  mr: 1,
                }}
              >
                {`USD ${balanceINR}` +
                  ' | ' +
                  `MATIC ${Math.round(Number(balance) * 1000) / 1000}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              {loading ? (
                <CCTableSkeleton sx={{ mt: 2 }} items={3} />
              ) : tableData && tableData?.length > 0 ? (
                <TransactionList
                  tableData={tableData}
                  lastUpdatedAt={lastUpdatedAt}
                />
              ) : (
                <EmptyComponent
                  photoType={1}
                  title=" No Project Token Details is available !!!"
                  elevation={0}
                />
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12} mt={2}>
              <WalletCred />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={4} xl={4}>
          <WalletTab />
        </Grid>
      </Grid>
      <WithdrawModal fromWalletPage />
    </Container>
  )
}

export default Wallet
