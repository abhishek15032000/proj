import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../../routes/pathNames'
import { WelcomeProps } from './Welcome.interface'

const Welcome = (props: WelcomeProps) => {
    const navigate = useNavigate()
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={12}
                component={Paper}
                elevation={6}
                square
                sx={{ background: 'primary.background' }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="div" variant="h5">
                        Welcome to Carbo Credit
                    </Typography>
                    <Button
                        component={'button'}
                        variant="text"
                        onClick={() => navigate(pathNames.REGISTER)}
                    >
                        Go to Register Page
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Welcome
