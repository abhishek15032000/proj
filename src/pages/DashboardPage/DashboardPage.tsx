import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'
import LinearProgressBar from '../../atoms/LinearProgressBar'
import Welcome from '../../components/Dashboard/Welcome/Welcome'
import { DashboardPageProps } from './DashboardPage.interface'
import SendIcon from '@mui/icons-material/Send'

const DashboardPage = (props: DashboardPageProps) => {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={4} sx={{ background: 'primary.background' }}>
                <LinearProgressBar />
                <CCButton text="Hello" variant="contained" rounded />
                <CCButton text="Hello" variant="contained" />
                <CCButton
                    rounded
                    text="Hello"
                    variant="contained"
                    endIcon={<SendIcon />}
                />
            </Grid>
        </Grid>
    )
}

export default DashboardPage
