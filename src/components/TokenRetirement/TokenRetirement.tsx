import { Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
//MUI imports
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
//Local imports
import CCTable from '../../atoms/CCTable'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import { Box } from '@mui/system'
import CCButton from '../../atoms/CCButton'
import TokenRetirementProjectList from './TokenRetirementProjectList'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import EmptyProjectsList from './EmptyProjectsList'
import EmptyRetireTokens from './EmptyRetireTokens'

const TokenRetirement = () => {
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid item>
        <Typography sx={{ fontSize: 28, fontWeight: 400, color: '#F15D5F' }}>
          Token Retirement
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginRight: 100 }}>
        <ProjectsStats />
      </Grid>
      <Grid item xs={12}>
        <TokenRetirementProjectList />
        {/* <EmptyProjectsList /> */}
        {/* <EmptyRetireTokens /> */}
      </Grid>
    </Grid>
  )
}

export default TokenRetirement
