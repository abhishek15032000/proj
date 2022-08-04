// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Typography, Modal } from '@mui/material'

// Local Imports
import TextButton from '../../atoms/TextButton/TextButton'

interface CancelModalProps {}

const CancelModal: FC<CancelModalProps> = () => {
  return (
    <Modal
      open={true}
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '600px',
          height: '200px',
          borderRadius: '16px',
          //   border: '2px solid',
          backgroundColor: '#FFF',
          position: 'relative',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 500, marginTop: 2 }}>
          Are you sure you want to cancel the order ?
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextButton
            sx={{ width: '160px', margin: 1 }}
            title="No, Don’t Cancel"
          />
          <TextButton sx={{ width: '160px', margin: 1 }} title="Yes, Cancel" />
        </Box>
      </Box>
    </Modal>
  )
}

export default CancelModal
