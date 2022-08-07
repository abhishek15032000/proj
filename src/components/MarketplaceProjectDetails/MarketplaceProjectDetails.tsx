// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import VitalProjectDetails from './VitalProjectDetails'
import DocumentationList from './DocumentationList'

interface MarketplaceProjectDetailsProps {}

const MarketplaceProjectDetails: FC<MarketplaceProjectDetailsProps> = (
  props
) => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <BackHeader title="Project Details" iconDisable />

        <VitalProjectDetails />

        <Box sx={{ width: '100%', margin: 1 }}>
          <CCTitleValue
            title="Total CO2C Tokens :"
            value="981"
            fontSize={16}
            fontWeight={500}
            sx={{ marginTop: 3, width: '240px', marginBottom: 1.5 }}
          />

          <Typography sx={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>
            Documentation
          </Typography>

          <DocumentationList />
        </Box>
      </Grid>
    </Box>
  )
}

export default MarketplaceProjectDetails
