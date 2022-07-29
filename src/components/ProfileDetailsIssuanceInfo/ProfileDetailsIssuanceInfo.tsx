// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, List, ListItem, Tab, Tabs, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TopInfo from '../../atoms/TopInfo/TopInfo'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import IssuanceInfoList from './IssuanceInfoList'

const ProfileDetailsIssuanceInfo: FC = () => {
  const [tabIndex, setTabIndex] = useState(1)
  const [issuanceInfo, setIssuanceInfo] = useState([
    {
      title: 'Project Introduction',
      status: true,
    },
    {
      title: 'Sec A: Description of Project Activity',
      status: true,
    },
    {
      title: 'Sec B: Implementation of the project activity',
      status: true,
    },
    {
      title: 'Sec C: Description of Monitoring Activity',
      status: true,
    },
    {
      title: 'Sec D: Data and parameters',
      status: true,
    },
    {
      title:
        'Sec E: Calculation of emission reductions or GHG removals by sinks',
      status: true,
    },
  ])

  return (
    <Box sx={{ p: 1 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 1, border: '0px solid' }}
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

        {tabIndex === 1 && <IssuanceInfoList data={issuanceInfo} />}
      </Grid>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
