import React, { useState } from 'react'
import { TwoFaInterface } from './TwoFaPage.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import OtpInput from 'react-otp-input'
import { Container } from '@mui/system'
import CCButton from '../../atoms/CCButton'

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
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
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
                  fontSize: 40,
                  pb: 0,
                }}
              >
                Verify Account
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  pb: 3,
                }}
              >
                Please enter the 5-digit code sent to your registered email &
                phone number
              </Typography>
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={5}
                containerStyle={{
                  justifyContent: 'center',
                }}
                inputStyle={{
                  width: '44px',
                  height: 60,
                  color: '#000',
                  fontSize: 20,
                  borderRadius: 6,
                  border: '1px solid #000',
                  marginRight: 25,
                }}
              />
              <Typography
                align="right"
                sx={{ py: 3, fontWeight: 700, fontSize: 18 }}
              >
                Resend Code
              </Typography>
              <CCButton
                variant="contained"
                disableRipple
                sx={{
                  height: 45,
                  fontSize: 16,
                  fontWeight: 700,
                }}
                onClick={handleVerify}
                fullWidth
              >
                Verify Account
              </CCButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xl={7}
          lg={7}
          md={7}
          sm={12}
          xs={12}
          display={{
            sm: 'none',
            xs: 'none',
            md: 'flex',
            lg: 'flex',
            xl: 'flex',
          }}
          sx={{ background: 'black' }}
        ></Grid>
      </Grid>
    </Box>
  )
}

export default TwoFa
