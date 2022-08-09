import React, { FC, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Typography, Modal, Button } from '@mui/material'

interface FinaliseSelectedVerifiersModalProps {
  title: string
  modalVisibility: boolean
  setModalVisibility: any
}

const FinaliseSelectedVerifiersModal: FC<
  FinaliseSelectedVerifiersModalProps
> = (props: FinaliseSelectedVerifiersModalProps) => {
  return (
    <Modal
      open={props.modalVisibility}
      onClose={() => props.setModalVisibility(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // sx={{ width:  '1000px' }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          zIndex: 0,
        }}
        // onClick={() => props.setModalVisibility(false)}
      >
        <Box
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '5px',
            zIndex: 100,
            padding: '10px',
            paddingRight: '5px',
            paddingLeft: '5px',
            width: '30%',
            height: '20%',
            flexDireaction: 'row',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '16px',
              color: '#667080',
              textAlign: 'center',
              marginY: '10px',
            }}
          >
            {props.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginY: '30px',
            }}
          >
            <Button
              onClick={() => props.setModalVisibility(false)}
              sx={{
                backgroundColor: '#EEF1F4',
                borderRadius: '5px',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: '10px',
                paddingX: '20px',
                width: '30%',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '12px',
                  color: '#667080',
                  textAlign: 'center',
                }}
              >
                {'Cancel'}
              </Typography>
            </Button>
            <Button
              onClick={() => props.setModalVisibility(false)}
              sx={{
                backgroundColor: '#667080',
                borderRadius: '5px',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: '10px',
                marginLeft: '10px',
                paddingX: '20px',
                width: '30%',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '12px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                {'Yes'}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default FinaliseSelectedVerifiersModal
