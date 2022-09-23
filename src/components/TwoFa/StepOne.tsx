import React, { useState } from 'react'
import { TwoFaProps } from './TwoFa.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import OtpInput from 'react-otp-input'
import CCButton from '../../atoms/CCButton'
import { Images } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import { authCalls } from '../../api/authCalls'

const StepOneTwoFa = (props: TwoFaProps) => {
  const uuid = getLocalItem('uuid')

  const [otp, setOtp] = useState<any>()

  const handleChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setOtp(event)
  }

  const handleVerify = () => {
    const payload = {
      uuid: uuid,
      otp: otp,
    }
    authCalls.verifyOtp(payload).then((res: any) => {
      if (res?.success && res?.data === 'verified') {
        props.setStep(2)
      } else {
        alert('Please enter valid OTP')
      }
    })
  }

  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Grid item md={5} xs={12}>
          <Grid
            container
            direction="column"
            alignContent="center"
            sx={{ pl: 15, pr: 17, pt: 13 }}
          >
            <Grid item columnSpacing={8}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 28,
                  pb: 2,
                }}
              >
                Verify Account
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  pb: 3,
                  lineHeight: '24px',
                }}
              >
                Please enter the verification code sent to your registered email
                id below. This code is valid for 90 secs.
              </Typography>
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={5}
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
                  marginRight: 25,
                }}
              />
              <Typography
                align="right"
                sx={{ py: 3, fontWeight: 500, fontSize: 14 }}
              >
                Didn’t receive code yet?{' '}
                <Typography display={'inline'} color={'lightPrimary1'}>
                  Resend
                </Typography>
              </Typography>
              <CCButton
                variant="contained"
                sx={{
                  height: 45,
                  fontSize: 18,
                }}
                onClick={handleVerify}
                fullWidth
              >
                Verify & Create Account
              </CCButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={7}
          flexDirection="column"
          sx={{
            display: {
              lg: 'flex',
              xs: 'none',
            },
            minHeight: '100%',
            backgroundImage: `url(${Images.illustration1})`,
            flex: 1,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Grid>
    </Box>
  )
}

export default StepOneTwoFa
