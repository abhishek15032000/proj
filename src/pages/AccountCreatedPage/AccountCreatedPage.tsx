import React from 'react'
import { AccountCreatedPageInterface } from './AccountCreatedPage.interface'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import AccountCreatedImage from '../../assets/Images/AccountCreatedImage.png'

const AccountCreatedPage = (props: AccountCreatedPageInterface) => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                <Box
                    sx={{
                        mt: 14,
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
                    <Grid sx={{ pt: 1 }}>
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
            <Grid
                item
                xl={7}
                lg={7}
                md={7}
                display={{
                    sm: 'none',
                    lg: 'block',
                    md: 'block',
                    xl: 'block',
                    xs: 'none',
                }}
                sx={{ background: 'black' }}
            >
                Account created image
            </Grid>
        </Grid>
    )
}

export default AccountCreatedPage
