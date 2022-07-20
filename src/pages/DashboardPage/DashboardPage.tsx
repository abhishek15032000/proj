import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

import { DashboardPageProps } from './DashboardPage.interface'
import IssuerProjectWelcomePage from '../IssuerProjectWelcomePage'
const DashboardPage = (props: DashboardPageProps) => {
    return (
        <Grid>
            <Typography variant="h5" sx={{ paddingY: 3 }}>
                Projects
            </Typography>
            <IssuerProjectWelcomePage />
        </Grid>
    )
}

export default DashboardPage
