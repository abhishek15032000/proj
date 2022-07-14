import React, { useState } from 'react'
import { TwoFaInterface } from './TwoFaPage.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import OtpInput from 'react-otp-input'

const TwoFa = (props: TwoFaInterface) => {
    const [otp, setOtp] = useState<any>()

    const handleChange = (event: React.ChangeEvent<HTMLButtonElement>) => {
        setOtp(event)
    }

    const handleVerify = () => {
        console.log('otp')
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item sx={{ width: '45%' }}>
                <Box
                    sx={{
                        my: 19,
                        ml: 8,
                        mr: 15,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 40,
                        }}
                    >
                        Verify Account
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: 16,
                            pt: 3,
                        }}
                    >
                        Please enter the 5-digit code sent to your registered
                        email & phone number
                    </Typography>
                    <Box
                        sx={{
                            pt: 4,
                            pb: 3,
                        }}
                    >
                        <OtpInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={6}
                            containerStyle={{
                                justifyContent: 'space-between',
                                textAlign: 'center',
                            }}
                            inputStyle={{
                                width: '3vw',
                                height: 74,
                                color: '#000',
                                fontSize: 20,
                                borderRadius: 6,
                                border: '1px solid #000',
                            }}
                        />
                    </Box>
                    <Typography
                        align="right"
                        sx={{ pb: 3, fontWeight: 700, fontSize: 16 }}
                    >
                        Resend Code
                    </Typography>
                    <Button
                        variant="contained"
                        disableRipple
                        sx={{ height: 45, fontSize: 16, fontWeight: 700 }}
                        onClick={handleVerify}
                    >
                        Verify Account
                    </Button>
                </Box>
            </Grid>
            <Grid item sx={{ width: '55%' }}></Grid>
        </Grid>
    )
}

export default TwoFa
