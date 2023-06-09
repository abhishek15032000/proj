import React, { useEffect, useState } from 'react'
import { TwoFaProps } from './TwoFa.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import OtpInput from 'react-otp-input'
import CCButton from '../../atoms/CCButton'
import { Colors, Images } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import { authCalls } from '../../api/authCalls'
import ResendOTPModal from './ResendOTPModal'
import LoaderOverlay from '../../components/LoderOverlay'

const StepOneTwoFa = (props: TwoFaProps) => {
  const uuid = getLocalItem('uuid')

  const [otp, setOtp] = useState<any>('')
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seconds, setSeconds] = useState(90)

  useEffect(() => {
    const myInterval: any = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        clearInterval(myInterval)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setOtp(event)
  }

  const handleVerify = () => {
    if (otp.length < 6) {
      alert('Enter all the digits!')
      return
    }

    const payload = {
      uuid: uuid,
      otp: otp,
    }

    authCalls
      .verifyOtp(payload)
      .then((res: any) => {
        setLoading(true)
        if (res?.success && res?.data === 'verified') {
          props.setStep(2)
        } else {
          alert('Please enter valid OTP')
        }
      })
      .catch((err) => {
        console.log('Error in authCalls.verifyOtp api : ', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {loading ? <LoaderOverlay show /> : null}
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '500px',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 28,
              pb: 2,
              color: '#325743',
            }}
          >
            Verify Account
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '24px',
            }}
          >
            {'Please enter the verification code sent to your registered '}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '24px',
            }}
          >
            {'email id below. This code is valid for 90 secs.'}
          </Typography>
        </Box>
        <Box>
          <OtpInput
            value={otp}
            isInputNum
            onChange={handleChange}
            numInputs={6}
            containerStyle={{
              justifyContent: 'flex-start',
            }}
            inputStyle={{
              width: 64,
              height: 56,
              color: '#000',
              fontSize: 20,
              border: 'none',
              borderRadius: 8,
              backgroundColor: '#E9EEEC',
              marginRight: 5,
            }}
          />
          <Box>
            <Typography
              sx={{
                mt: 1,
                width: '100%',
                color: seconds === 0 ? Colors.lightPrimary1 : Colors.tertiary,
                textAlign: 'right',
                fontSize: 14,
              }}
            >
              {seconds === 0
                ? 'Code Expired'
                : `Code expires in : ${seconds} seconds`}
            </Typography>
          </Box>
        </Box>
        <Typography
          align="right"
          sx={{ py: 3, fontWeight: 500, fontSize: 14, color: '#1C4A43' }}
        >
          Didn’t receive code yet?{' '}
          <Typography
            sx={{
              cursor: 'pointer',
              color: Colors.lightPrimary1,
              fontSize: 14,
              fontWeight: 500,
            }}
            display={'inline'}
            onClick={() => {
              setOtp('')
              setOpenModal(true)
            }}
          >
            Resend Code
          </Typography>
        </Typography>
        <CCButton
          variant="contained"
          sx={{
            height: '50px',
            width: '320px',
            borderRadius: '6px',
          }}
          onClick={handleVerify}
        >
          Verify Account
        </CCButton>
      </Box>
      <Box
        sx={{
          display: {
            sm: 'none',
            xs: 'none',
            lg: 'flex',
          },
          width: '50%',
          height: '100vh',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          flexDirection="column"
          component="img"
          src={Images.illustration1}
          sx={{
            width: '100%',
          }}
        />
      </Box>
      <ResendOTPModal
        showModal={openModal}
        setShowModal={setOpenModal}
        setLoading={setLoading}
        setSeconds={setSeconds}
      />
    </Box>
  )
}

export default StepOneTwoFa
