import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import LinearProgressBar from '../../atoms/LinearProgressBar'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { DashboardPageProps } from './DashboardPage.interface'

const DashboardPage = (props: DashboardPageProps) => {
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
                <LinearProgressBar />
            </Grid>
        </Grid>
    )
}

export default DashboardPage
