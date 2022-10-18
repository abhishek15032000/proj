import React, { useEffect, useState } from 'react'
import { BlockchainAlertProps } from './BlockchainAlert.interface'
import { Alert, Button, Grid, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAccountAddress,
  setAccountBalance,
  setConnected,
  setLoadWallet,
  setMetamask,
  setGuide,
  setWalletNetwork,
  setLoadWalletAlert,
} from '../../redux/Slices/walletSlice'
import BlockchainCalls from '../../blockchain/Blockchain'

import WalletAdd from '../WalletAdd'
import { Box } from '@mui/system'
import { Colors, Images } from '../../theme'
import CCButton from '../../atoms/CCButton'
import Spinner from '../../atoms/Spinner'
import InfoIcon from '@mui/icons-material/Info'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { USER } from '../../api/user.api'
import { getLocalItem, setLocalItem } from '../../utils/Storage'
import { onManualConnectClick } from '../../utils/blockchain.util'

declare let window: any

// const provider = new ethers.providers.Web3Provider(window.ethereum)

const BlockchainAlert = (props: BlockchainAlertProps) => {
  const dispatch = useAppDispatch()
  const loadWalletAlert = useAppSelector(
    (state) => state.wallet.loadWalletAlert
  )

  const { user_id } = getLocalItem('userDetails')

  const closeModal = () => dispatch(setLoadWallet(false))

  const [open, setOpen] = useState(false)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [walletAdded, setWalletAdded] = useState(false)

  // const handleOpen = () => setOpen(loadWallet)
  const handleClose = () => closeModal()

  useEffect(() => {
    // console.log(loadWallet)
    setOpen(loadWalletAlert)
  }, [loadWalletAlert])

  const { ethereum } = window

  const walletReducer = useAppSelector((state) => state.wallet)
  // console.log(
  //   '🚀 ~ file: LoadWallet.tsx ~ line 59 ~ LoadWal ~ walletReducer',
  //   walletReducer
  // )

  const {
    haveMetamask,
    isConnected,
    accountAddress,
    accountBalance,
    guideOpen,
    walletNetwork,
    alertMessage,
  } = walletReducer

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
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
            <>
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
                  Alert
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
                  {alertMessage}
                </Typography>

                {/* <CCButton
                  sx={{ mt: 2 }}
                  onClick={() => dispatch(setLoadWalletAlert(false))}
                >
                  Okay
                </CCButton> */}
              </Box>
            </>
          </Grid>
        </Grid>
      </Modal>
    </div>
  )
}

export default BlockchainAlert
