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
import TokenAndContractProjectList from './TokenAndContractProjectList'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

const TokenAndContract = () => {
  const navigate = useNavigate()

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
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Paper elevation={2} sx={{ py: 2, px: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
              Reports & Contracts
            </Typography>
            <CCButton
              rounded
              onClick={() => navigate(pathNames.MARKETPLACE)}
              sx={{
                minWidth: 0,
                backgroundColor: '#F3BA4D',
                color: '#005046',
                padding: '8px 18px',
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              Sell Tokens
            </CCButton>
          </Stack>
          <Grid
            container
            columns={14}
            alignItems="center"
            sx={{ mt: 3, py: 2, background: '#CCE8E1' }}
          >
            <Grid item xs={2} sx={{ pl: 2 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                Date
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                Project Name
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                Project Type
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                Location
              </Typography>
            </Grid>
          </Grid>
          {data.map((i: any, index: number) => (
            <TokenAndContractProjectList
              data={i}
              key={index}
              background={index % 2 ? '#edf5f2' : '#fff'}
            />
          ))}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TokenAndContract
const data = [
  {
    date: 'reference Id',
    name: '3.66 MW poultry litter based power ...',
    type: 'Agricultural Land Management',
    Location: 'Mumbai, India',
    //action: ,
  },
  {
    date: 'reference Id',
    name: '3.66 MW poultry litter based power ...',
    type: 'Agricultural Land Management',
    Location: 'Mumbai, India',
  },
  {
    date: 'reference Id',
    name: '3.66 MW poultry litter based power ...',
    type: 'Agricultural Land Management',
    Location: 'Mumbai, India',
  },
]
