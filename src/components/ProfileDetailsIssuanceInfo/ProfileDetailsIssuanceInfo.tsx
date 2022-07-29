// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TopInfo from '../../atoms/TopInfo/TopInfo'
import TabSelector from '../../atoms/TabSelector/TabSelector'

const ProfileDetailsIssuanceInfo: FC = () => {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <Box sx={{ p: 1 }}>
      <Grid
        container
        xs={11}
        sx={{ p: 1, border: '1px solid' }}
        justifyContent={'space-between'}
      >
        <BackHeader title="Project Details" />

        <TopInfo
          title="Project : 3.66 MW poultry litter based power generation project by Raus
        Power in India"
          subtitle="In Mumbai, India"
        />

        <TabSelector
          tabArray={['Issuance Info', 'Verifier & Report']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      </Grid>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
