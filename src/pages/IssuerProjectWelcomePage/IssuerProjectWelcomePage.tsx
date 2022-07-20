import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import LinearProgressBar from '../../atoms/LinearProgressBar'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { IssuerProjectWelcomePageProps } from './IssuerProjectWelcomePage.interface'
const IssuerProjectWelcomePage = (props: IssuerProjectWelcomePageProps) => {
    return (
        <Grid container component="main">
            <Grid
                item
                xs={12}
                md={12}
                lg={9}
                component={Paper}
                square
                sx={{ background: 'primary.background', border: '1px solid' }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'row',

                        justifyContent: 'space-between',
                    }}
                >
                    <Grid item sm={12} md={3} sx={{ marginRight: 10 }}>
                        <Typography component="div" variant="h5">
                            Welcome!
                        </Typography>
                        <Typography component="div" variant="body1">
                            Please complete your profile setup
                        </Typography>
                    </Grid>

                    <Grid item sm={12} md={2} sx={{ marginRight: 10 }}>
                        <LinearProgressBar />
                    </Grid>
                </Box>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'row',

                        justifyContent: 'space-between',
                    }}
                >
                    <Grid item sm={12} md={3} sx={{ marginRight: 10 }}>
                        <Paper sx={{ py: 3, px: 2 }}>
                            <Typography component="div" variant="body1">
                                Please complete wallet creation/ linking process
                            </Typography>
                        </Paper>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
export default IssuerProjectWelcomePage
