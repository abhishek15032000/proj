import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ProjectsStats from '../../atoms/ProjectStats/ProjectsStats'

const TokenAndContract = () => {
  return (
    <Grid container>
      <Grid item>
        <Typography sx={{ fontSize: 28, fontWeight: 400, color: '#F15D5F' }}>
          Token & Contracts
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <ProjectsStats />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2}>
          <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
            Reports & Contracts
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TokenAndContract
