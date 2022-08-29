// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import ListOfProjects from './ListOfProjects'

import { VerifierProjectsListProps } from './VerifierProjectsList.interface'

const VerifierProjectsList = (props: VerifierProjectsListProps) => {
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
          <ListOfProjects />
        </Grid>
      </Grid>
    </Box>
  )
}

export default VerifierProjectsList
