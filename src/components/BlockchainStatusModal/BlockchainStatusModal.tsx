import { Modal, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import InProgressAnimation from './InProgressAnimation'
import './style.css'

const BlockchainStatusModal = () => {
  const openBlockchainModal = useAppSelector(
    ({ blockchainStatusModal }) => blockchainStatusModal.openBlockchainModal,
    shallowEqual
  )

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
        <Box>Blockchain Status</Box>
        <InProgressAnimation />
      </Paper>
    </Modal>
  )
}

export default BlockchainStatusModal
