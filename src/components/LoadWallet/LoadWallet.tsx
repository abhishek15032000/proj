import { Alert, Button, Grid, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAccountAddress,
  setAccountBalance,
  setConnected,
  setLoadWallet,
  setMetamask,
  setGuide,
} from '../../redux/Slices/walletSlice'
import BlockchainCalls from '../../blockchain/Blockchain'
import { LoadWalletProps } from './LoadWallet.interface'
import WalletAdd from '../WalletAdd'
import { Box } from '@mui/system'
import { Colors, Images } from '../../theme'
import CCButton from '../../atoms/CCButton'
import Spinner from '../../atoms/Spinner'
import InfoIcon from '@mui/icons-material/Info'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { USER } from '../../api/user.api'
import { getLocalItem, setLocalItem } from '../../utils/Storage'

// let window: any
declare let window: any

// const provider = new ethers.providers.Web3Provider(window.ethereum)

const LoadWallet = (props: LoadWalletProps) => {
  const dispatch = useAppDispatch()
  const loadWallet = useAppSelector((state) => state.wallet.loadWallet)

  const { user_id } = getLocalItem('userDetails')

  const closeModal = () => dispatch(setLoadWallet(false))

  // const [haveMetamask, sethaveMetamask] = useState(false)
  // const [isConnected, setIsConnected] = useState(false)
  // const [accountAddress, setAccountAddress] = useState('')
  // const [accountBalance, setAccountBalance] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [walletAdded, setWalletAdded] = useState(false)

  // const handleOpen = () => setOpen(loadWallet)
  const handleClose = () => closeModal()

  useEffect(() => {
    // console.log(loadWallet)
    setOpen(loadWallet)
  }, [loadWallet])

  const { ethereum } = window

  const walletReducer = useAppSelector((state) => state.wallet)

  const {
    haveMetamask,
    isConnected,
    accountAddress,
    accountBalance,
    guideOpen,
  } = walletReducer

  useEffect(() => {
    onManualConnectClick()
      .then((res) => {
        console.log(res)
      })
      .catch((e: any) => {
        setError(e)
      })

    const userDetails2 = getLocalItem('userDetails2')
    if (userDetails2) {
      const { wallet_added = false } = userDetails2
      setWalletAdded(wallet_added)
    }
  }, [])

  useEffect(() => {
    if (accountAddress) {
      getWalletBalance()
    }
  }, [accountAddress])

  const checkMetamaskAvailability = async () => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        setLoading(true)
        if (!ethereum) {
          dispatch(setMetamask(false))
          reject(new Error('Metamask not available'))
        }
        // sethaveMetamask(true)
        dispatch(setMetamask(true))
        connectWallet().then((res: any) => {
          resolve(res)
        })
      } catch (e: any) {
        reject(new Error(e.toString()))
        console.log('checkMetamaskAvailability fn :', e)
      }
    })
  }
  const onManualConnectClick = async () => {
    // checkMetamaskAvailability().then((res) => {
    const metamaskAvailabilityRes = await checkMetamaskAvailability()
    if (metamaskAvailabilityRes) {
      //call userUpdateApi
      const user_data = getLocalItem('userDetails')
      return USER.updateUserInfo(user_data)
        .then((res: any) => {
          console.log(
            '🚀 ~ file: LoadWallet.tsx ~ line 105 ~ USER.updateUserInfo ~ res',
            res
          )
          if (res?.data?.success && res?.data?.data) {
            // setLocalItem('uuid', res?.data?.data?.uuid)
            // navigate(pathNames.TWOFA)
            return res
          } else if (!res?.data?.success) {
            alert(res?.data?.error)
          }
        })
        .catch((e) =>
          console.log('error checkMetamaskAvailability promise :', e)
        )
    }
    // })
  }

  const connectWallet = async () => {
    try {
      BlockchainCalls.connectWallet().then((res: any) => {
        dispatch(setAccountAddress(res.accountAddress))
        dispatch(setConnected(res.isConnected))
        if (!walletAdded) {
          updateUserWithShineKey(res.accountAddress)
        }

        return true
      })
    } catch (error: any) {
      dispatch(setConnected(false))
      console.log('Code Reachable')
      setError(error.toString())
    }
  }

  const getWalletBalance = async () => {
    try {
      // console.log(accountAddress)
      BlockchainCalls.getWalletBalance(accountAddress).then((res: any) => {
        dispatch(setAccountBalance(res.balance))
        setLoading(false)
      })
    } catch (error) {
      dispatch(setConnected(false))
      console.log('Code Reachable')
    }
  }

  const updateUserWithShineKey = async (shineKey: string) => {
    try {
      const user_data = getLocalItem('userDetails2')
      user_data.phone = user_data.phone.toString()
      delete user_data._id
      const updateUserRes = await USER.updateUserInfo({
        ...user_data,
        shineKey,
      })
      if (updateUserRes?.data?.success) {
        if (user_id) {
          const userResponse = await USER.getUsersById(user_id)
          setLocalItem('userDetails2', userResponse?.data)
        } else {
          //Couldn't get userId from localStorage
          alert('User id not found')
        }
      }
    } catch (error) {
      console.log('error USER.updateUserInfo api :', error)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid
          container
          justifyContent={'center'}
          alignItems="flex-start"
          sx={{
            background: '#fff',
            minHeight: '80%',
            maxheight: '80%',
            minWidth: '80%',
            maxWidth: '80%',
          }}
        >
          <Grid container justifyContent={'flex-end'} p={3}>
            <Grid item alignItems="center" justifyContent="flex-end">
              <Button
                startIcon={<InfoIcon />}
                onClick={() => dispatch(setGuide(!guideOpen))}
              >
                {guideOpen ? 'Close ' : ''}Guide
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'stretch',
              width: '100%',
              padding: 3,
            }}
          >
            {!guideOpen && haveMetamask && isConnected ? (
              <>
                {
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: 32,
                      }}
                    >
                      Wallet Connected
                    </Typography>
                    <Grid sx={{ pt: 1 }}>
                      <img src={Images.check1} />
                    </Grid>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: Colors.lightPrimary1,
                      }}
                    >
                      Your Metamask Wallet is connected
                    </Typography>
                    {loading ? (
                      <Grid
                        container
                        spacing={3}
                        alignItems={'center'}
                        justifyContent={'center'}
                        sx={{
                          padding: 2,

                          flexDirection: 'column',
                        }}
                      >
                        <Grid item xs={12}>
                          <Spinner size={30} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: 10,
                            }}
                          >
                            Fetching the wallet details
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Grid
                          container
                          spacing={3}
                          alignItems={'center'}
                          justifyContent={'flex-start'}
                          sx={{ padding: 2 }}
                        >
                          <Grid item sx={{ mt: 1 }} xs={12}>
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: 16,
                                textAlign: 'center',
                              }}
                            >
                              <strong>Wallet Address</strong>: {accountAddress}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                          <Grid item sx={{ mt: 1 }} xs={12}>
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: 16,
                                textAlign: 'center',
                              }}
                            >
                              <strong> Account balance</strong>:{' '}
                              {accountBalance}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}

                    <CCButton
                      sx={{ mt: 2 }}
                      onClick={() => dispatch(setLoadWallet(false))}
                    >
                      Okay
                    </CCButton>
                  </Box>
                }
              </>
            ) : !guideOpen ? (
              <Grid
                container
                sx={{ height: '100%' }}
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
              >
                <Grid item sx={{ mt: 1 }} xs={12}>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  >
                    {` Looks like you're not connected to Metamask. `}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: 12,
                      textAlign: 'center',
                      pt: 4,
                    }}
                  >
                    {` Click the Connect button below to connect or Open Guide button to setup. `}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{ mt: 1, pt: 5 }}
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  display="flex"
                  xs={4}
                >
                  {error ? (
                    <Alert sx={{ m: 1 }} severity="info">
                      {error.toString()}
                    </Alert>
                  ) : null}
                  <CCButton onClick={() => onManualConnectClick()}>
                    Connect
                  </CCButton>
                  <CCButtonOutlined
                    sx={{ py: 1, px: 2, mt: 1, fontSize: 12 }}
                    onClick={() => dispatch(setGuide(true))}
                  >
                    Open Guide
                  </CCButtonOutlined>
                </Grid>
              </Grid>
            ) : (
              <WalletAdd />
            )}
          </Grid>
        </Grid>
      </Modal>
    </div>
  )
}
export default LoadWallet
