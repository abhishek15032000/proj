import { Box, Modal, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Captcha from '../../components/Captcha/Captcha'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'
import { authCalls } from '../../api/authCalls'
import { getLocalItem } from '../../utils/Storage'

interface ResendOTPModalProps {
  showModal: boolean
  setShowModal: any
  setLoading: any
}

const ResendOTPModal = ({
  showModal,
  setShowModal,
  setLoading,
}: ResendOTPModalProps) => {
  const uuid = getLocalItem('uuid')

  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')

  useEffect(() => {
    if (showModal) setCaptchaTokenFromUUID()
  }, [showModal])

  const setCaptchaTokenFromUUID = () => {
    console.log('modal page setCaptchaTokenFromUUID')
    setCaptchaToken(uuidv4())
  }

  const handleResend = async () => {
    const payload = {
      uuid: uuid,
      id: captchaToken,
      captcha: captchaInput,
    }
    setLoading(true)
    try {
      const res = await authCalls.resendOTP(payload)
      if (res.success) {
        alert('New OTP Sent')
      } else {
        alert(res?.error)
      }
    } catch (e) {
      console.log('Error in OTPVerficationModal.js ~ ', e)
    } finally {
      setShowModal(false)
      setLoading(false)
      // setCaptchaTokenFromUUID()
      setCaptchaInput('')
    }
  }
  return (
    <Modal
      open={showModal}
      //To Disable unwanted blue border
      disableAutoFocus={true}
      onClose={() => setShowModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(56, 142, 129, 0.4)',
      }}
    >
      <Paper
        sx={{
          padding: '40px 70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          maxWidth: '400px',
          width: '50vw',
          wordBreak: 'break-word',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{ fontSize: 20, fontWeight: 500, color: Colors.darkPrimary1 }}
          >
            Resend OTP
          </Typography>
          <Typography sx={{ fontSize: 14, mt: 3 }}>
            Please enter the captcha
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Captcha
              token={captchaToken}
              captchaInput={captchaInput}
              setCaptchaInput={setCaptchaInput}
              setCaptchaToken={setCaptchaToken}
            />
          </Box>
          <Box>
            <CCButton
              type="submit"
              fullWidth
              sx={{
                height: '50px',
                borderRadius: '6px',
                marginTop: 4,
              }}
              variant="contained"
              onClick={handleResend}
            >
              {'Submit'}
            </CCButton>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}

export default ResendOTPModal
