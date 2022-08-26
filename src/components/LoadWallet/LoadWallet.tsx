import { Button, Grid, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { shallowEqual } from 'react-redux'
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

// let window: any
declare let window: any

const provider = new ethers.providers.Web3Provider(window.ethereum)

const LoadWallet = (props: LoadWalletProps) => {
  const dispatch = useAppDispatch()
  const loadWallet = useAppSelector((state) => state.wallet.loadWallet)

  const closeModal = () => dispatch(setLoadWallet(false))

  // const [haveMetamask, sethaveMetamask] = useState(false)
  // const [isConnected, setIsConnected] = useState(false)
  // const [accountAddress, setAccountAddress] = useState('')
  // const [accountBalance, setAccountBalance] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  // const handleOpen = () => setOpen(loadWallet)
  const handleClose = () => closeModal()

  useEffect(() => {
    console.log(loadWallet)
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
    checkMetamaskAvailability()
  }, [])

  useEffect(() => {
    getWalletBalance()
  }, [accountAddress])
  const checkMetamaskAvailability = async () => {
    setLoading(true)
    if (!ethereum) {
      dispatch(setMetamask(false))
    }
    // sethaveMetamask(true)
    dispatch(setMetamask(true))
    await connectWallet()
  }

  const connectWallet = async () => {
    try {
      BlockchainCalls.connectWallet().then((res: any) => {
        dispatch(setAccountAddress(res.accountAddress))
        dispatch(setConnected(res.isConnected))
      })
    } catch (error) {
      dispatch(setConnected(false))
    }
  }

  const getWalletBalance = async () => {
    try {
      console.log(accountAddress)
      BlockchainCalls.getWalletBalance(accountAddress).then((res: any) => {
        dispatch(setAccountBalance(res.balance))
        setLoading(false)
      })
    } catch (error) {
      dispatch(setConnected(false))
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
                  <CCButton onClick={() => checkMetamaskAvailability()}>
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
