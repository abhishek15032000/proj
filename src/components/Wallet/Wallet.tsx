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
} from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TransactionHistoryImg from '../../assets/Images/illustrations/TransactionHistory.png'
import { Colors } from '../../theme'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import { useLocation, useNavigate } from 'react-router-dom'

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

interface WalletProps {}

const Wallet: FC<WalletProps> = (props) => {
  const navigate = useNavigate()
  const dispatch: any = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [tableData, setTableData] = useState([])
  const [privateKey, setPrivateKey] = useState('')

  useEffect(() => {
    getAllProjects()
    getPrivateKey()
  }, [])

  const openInNewTab = (url: any) => {
    window.open(url, '_blank', 'noreferrer')
  }

  const getAllProjects = () => {
    setLoading(true)
    USER.getTokenBalanceList(getLocalItem('userDetails')?.user_id).then(
      (res: any) => {
        if (res?.data?.success) {
          let modifiedRows = res?.data?.data?.token
          modifiedRows = modifiedRows.filter(
            (item: any, index: number) => item.tokenBalances > 0 && item
          )

          setBalance(res?.data?.data?.balance)
          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.tokenInfo?.company_name}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {i?.tokenInfo?.symbol}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="center"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {Math.round(Number(i?.tokenBalances))}
                </Typography>,
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
                      'https://mumbai.polygonscan.com/token/' +
                        i?.tokenInfo?.address
                    )
                  }
                >
                  {limitTitle(i?.tokenInfo?.address, 20)}
                </Typography>,
              ]
            })
          setTableData(rows)
        }
        setLoading(false)
      }
    )
  }

  const getPrivateKey = () => {
    USER.getPrivateKey(getLocalItem('userDetails')?.user_id)
      .then((res: any) => {
        if (res?.success) {
          setPrivateKey(res?.data?.private_key)
        } else if (res?.error) {
          alert(res?.error[0])
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        md={12}
        lg={12}
        xl={12}
        sx={{ border: '0px solid' }}
        justifyContent={'space-between'}
        display="flex"
        flexDirection={'row'}
      >
        <Grid container xs={12} md={12} lg={8} xl={8}>
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
            }}
          >
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
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: '8px',
              py: 3,
              boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
              my: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 400,

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
              }}
            >
              {`USD ${balance}` + ' | ' + `MATIC ${balance}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            {loading ? (
              <CCTableSkeleton sx={{ mt: 2 }} />
            ) : (
              <TransactionList tableData={tableData} />
            )}
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={12} mt={2}>
            <WalletCred privateKey={privateKey} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} mt={10}>
          <WalletTab />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Wallet
