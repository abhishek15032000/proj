import { Alert, Button, Snackbar } from '@mui/material'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setMessageModalText,
  setShowMessageModal,
} from '../../redux/Slices/appSlice'
import {
  setCarbonTokenBalances,
  setCurrentProjectUUID,
  setINRTokenBalances,
} from '../../redux/Slices/newMarketplaceSlice'
import { Colors } from '../../theme'
import {
  getProjectsTokenDetails,
  getSellOrdersListData,
  getTokenBalances,
} from '../../utils/newMarketplace.utils'
import { getLocalItem } from '../../utils/Storage'
import HeadingStrip from './HeadingStrip'
import Trading from './Trading'

const Marketplace = () => {
  const location: any = useLocation()
  const dispatch = useAppDispatch()

  const userID = getLocalItem('userDetails')?.user_id

  const showMessageModal = useAppSelector(
    ({ app }) => app.showMessageModal,
    shallowEqual
  )
  const messageModalText = useAppSelector(
    ({ app }) => app.messageModalText,
    shallowEqual
  )

  const carbonTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.carbonTokenAddress,
    shallowEqual
  )
  const inrTokenAddress = useAppSelector(
    ({ newMarketplaceReducer }) => newMarketplaceReducer.inrTokenAddress,
    shallowEqual
  )

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (location?.state?.projectUUID) {
      dispatch(setCurrentProjectUUID(location?.state?.projectUUID))
      getProjectsTokenDetails(location?.state?.projectUUID)
    }
    getSellOrdersListData()
  }, [])

  useEffect(() => {
    if (carbonTokenAddress) {
      getCarbonTokenBalances()
    }
  }, [carbonTokenAddress])

  const getCarbonTokenBalances = async () => {
    const tokenBalances = await getTokenBalances(userID, carbonTokenAddress)
    if (tokenBalances.success) {
      dispatch(setCarbonTokenBalances(tokenBalances?.data))
    }
  }

  useEffect(() => {
    if (inrTokenAddress) {
      getINRTokenBalances()
    }
  }, [inrTokenAddress])

  const getINRTokenBalances = async () => {
    const tokenBalances = await getTokenBalances(userID, inrTokenAddress)
    if (tokenBalances.success) {
      dispatch(setINRTokenBalances(tokenBalances?.data))
    }
  }

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <HeadingStrip />
      <Trading />

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%', border: `1px solid ${Colors.darkPrimary1}` }}
        >
          This is a success message!
        </Alert>
      </Snackbar>

      <MessageModal
        message={messageModalText}
        btn1Text="Ok"
        btn1OnClick={() => {
          dispatch(setShowMessageModal(false))
          dispatch(setMessageModalText(''))
        }}
        showModal={showMessageModal}
        setShowModal={(closeModal: boolean) =>
          dispatch(setShowMessageModal(closeModal))
        }
      />
    </>
  )
}

export default Marketplace
