import React from 'react'
import { AccountCreatedPageInterface } from './AccountCreatedPage.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import AccountCreatedImage from '../../assets/Images/AccountCreatedImage.png'

const AccountCreatedPage = (props: AccountCreatedPageInterface) => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item sx={{ width: '45%' }}>
                <Box
                    sx={{
                        mt: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '60vh',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 40,
                        }}
                    >
                        Account Verified!
                    </Typography>
                    <Grid sx={{ pt: 2 }}>
                        <img
                            src={AccountCreatedImage}
                            width={200}
                            height={200}
                        />
                    </Grid>
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: 16,
                        }}
                    >
                        Your account is successfully verified now
                    </Typography>
                </Box>
            </Grid>
            <Grid item sx={{ width: '55%' }}>
                Account created image
            </Grid>
        </Grid>
    )
}

export default AccountCreatedPage
