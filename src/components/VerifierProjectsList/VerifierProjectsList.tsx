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

const VerifierProjectsList = (props: VerifierProjectsListProps) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    verifierCalls
      .getAllVerifiers('62c5829aa3bc6ba32590f950')
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
          <BackHeader title="Projects" />
        </Grid>

        <Grid item xs={12}>
          <ListOfProjects data={tableData} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjectsList
