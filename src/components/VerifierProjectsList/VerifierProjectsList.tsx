// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import ListOfProjects from './ListOfProjects'

import { VerifierProjectsListProps } from './VerifierProjectsList.interface'
import { verifierCalls } from '../../api/verifierCalls.api'
import { Navigate, useNavigate } from 'react-router-dom'
import { getLocalItem } from '../../utils/Storage'

const VerifierProjectsList = (props: VerifierProjectsListProps) => {
  const navigate = useNavigate()

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const userDetails = getLocalItem('userDetails')

    verifierCalls
      .getAllVerifiers(userDetails._id)
      .then((response) => {
        setTableData(response.data.data)
      })
  }, [])

  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <Grid item xs={12}>
          <BackHeader
            title="Projects"
            onClick={() => {
              navigate(-1)
              console.log('Code Reachable')
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <ListOfProjects data={tableData} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjectsList
