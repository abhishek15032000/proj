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
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import moment from 'moment'

const TokenAndContract = () => {
  const navigate = useNavigate()

  const { email } = getLocalItem('userDetails')

  const [projects, setProjects] = useState<any>()

  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    dataCollectionCalls
      .getAllProjects(email)
      .then((res: any) => {
        if (res?.success) {
          setProjects(res.data.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Grid container>
      <Grid item>
        <Typography sx={{ fontSize: 28, fontWeight: 400, color: '#F15D5F' }}>
          Token & Contracts
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginRight: 100 }}>
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
          {projects &&
            projects.length > 0 &&
            projects.map((i: any, index: number) => (
              <TokenAndContractProjectList
                data={i}
                key={index}
                background={index % 2 ? '#edf5f2' : '#fff'}
              />
            ))}
        </Paper>
      </Grid>

      {/* <Grid item xs={12} sx={{ mt: 4 }}>
        <EmptyComponent
          photoType={1}
          title="No Reports & Contracts to show yet !"
          listNewProject
        />
      </Grid> */}
    </Grid>
  )
}

export default TokenAndContract
