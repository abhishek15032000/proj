import { Modal, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { BLOCKCHAIN_STATUS } from '../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setBlockchainCallStatus } from '../../redux/Slices/blockchainStatusModalSlice'
import { Images } from '../../theme'
import InProgressAnimation from './InProgressAnimation'
import './style.css'

const BlockchainStatusModal = () => {
  const dispatch = useAppDispatch()

  const openBlockchainModal = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.openBlockchainModal,
    shallowEqual
  )
  const blockchainCallStatus = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.blockchainCallStatus,
    shallowEqual
  )

  useEffect(() => {
    dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.PENDING))

    setTimeout(() => {
      dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.FAILED))
      // dispatch(setBlockchainCallStatus(BLOCKCHAIN_STATUS.COMPLETED))
    }, 2000)
  }, [])

  const renderIcon = (status: number) => {
    switch (status) {
      case BLOCKCHAIN_STATUS.COMPLETED:
        return <img src={Images.check1} />
      case BLOCKCHAIN_STATUS.FAILED:
        return <img src={Images.Error} />
      case BLOCKCHAIN_STATUS.PENDING:
        return <InProgressAnimation />
    }
  }

  return (
    <Modal
      open={openBlockchainModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableAutoFocus={true}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {renderIcon(blockchainCallStatus)}
      </Paper>
    </Modal>
  )
}

export default BlockchainStatusModal
