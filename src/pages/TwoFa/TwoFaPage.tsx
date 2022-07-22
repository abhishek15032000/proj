import React, { useState } from 'react'
import { TwoFaInterface } from './TwoFaPage.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import OtpInput from 'react-otp-input'
import { Container } from '@mui/system'
import CCButton from '../../atoms/CCButton'
import { Images } from '../../theme'

const TwoFa = (props: TwoFaInterface) => {
  const [otp, setOtp] = useState<any>()

  const handleChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
    setOtp(event)
  }

  const handleVerify = () => {
    setOtp('')
  }

  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Grid item md={6} xs={12}>
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
                  background: 'container1',
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
          md={6}
          flexDirection="column"
          sx={{
            display: {
              sm: 'none',
              md: 'flex',
              xs: 'none',
            },
            height: '100%',
            backgroundImage: `url(${Images.illustration2})`,
            flex: 1,
          }}
        >
          <img
            src={Images.illustration2}
            alt="bg iamges"
            width="auto"
            style={{ height: '100%' }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TwoFa
