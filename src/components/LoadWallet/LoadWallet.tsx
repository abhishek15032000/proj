import { Grid } from '@mui/material'
import Modal from '@mui/material/Modal'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setLoadWallet } from '../../redux/Slices/walletSlice'
import BlockchainCalls from '../../blockchain/Blockchain'
import { LoadWalletProps } from './LoadWallet.interface'

// let window: any
declare let window: any

const provider = new ethers.providers.Web3Provider(window.ethereum)

const LoadWallet = (props: LoadWalletProps) => {
  const dispatch = useAppDispatch()
  const loadWallet = useAppSelector(
    (state) => state.wallet.loadWallet,
    shallowEqual
  )

  const closeModal = () => dispatch(setLoadWallet(false))

  const [haveMetamask, sethaveMetamask] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [accountAddress, setAccountAddress] = useState('')
  const [accountBalance, setAccountBalance] = useState('')
  const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(loadWallet)
  const handleClose = () => closeModal()

  useEffect(() => {
    setOpen(loadWallet)
  }, [loadWallet])

  const { ethereum } = window

  useEffect(() => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false)
      }
      sethaveMetamask(true)
      connectWallet()
    }
    checkMetamaskAvailability()
  }, [])

  const connectWallet = async () => {
    try {
      BlockchainCalls.connectWallet().then((res: any) => {
        setAccountAddress(res.accountAddress)
        setIsConnected(res.isConnected)
        // toast('Wallet Connected')
      })
    } catch (error) {
      setIsConnected(false)
    }
  }

  const getWalletBalance = async () => {
    try {
      BlockchainCalls.getWalletBalance(accountAddress).then((res: any) => {
        setAccountBalance(res.balance)
      })
    } catch (error) {
      setIsConnected(false)
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
          alignItems="center"
          sx={{
            background: '#fff',
            minHeight: '80%',
            maxheight: '80%',
            minWidth: '80%',
            maxWidth: '80%',
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {haveMetamask ? (
              <div className="App-header">
                {isConnected ? (
                  <div className="card">
                    <div className="card-row">
                      <h3>Wallet Address:</h3>
                      <p>{accountAddress}</p>
                    </div>
                  </div>
                ) : (
                  <img className="App-logo" alt="logo" />
                )}
                {isConnected ? (
                  <>
                    <p className="info">🎉 Connected Successfully</p>
                    <button onClick={() => getWalletBalance()}>
                      Get balance
                    </button>
                    <p>{accountBalance}</p>
                    <button
                      onClick={() =>
                        BlockchainCalls.contract_caller(accountAddress)
                      }
                    >
                      contract_caller
                    </button>
                  </>
                ) : (
                  <button className="btn" onClick={() => connectWallet()}>
                    Connect
                  </button>
                )}
              </div>
            ) : (
              <p>Please Install MataMask</p>
            )}
          </Grid>
        </Grid>
      </Modal>
    </div>
  )
}
export default LoadWallet
