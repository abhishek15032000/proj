// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, List, ListItem, Tab, Tabs, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TopInfo from '../../atoms/TopInfo/TopInfo'
import TabSelector from '../../atoms/TabSelector/TabSelector'

import IssuanceInfoList from './IssuanceInfoList'
import VerifierReport from './VerifierReport'

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
  const [VerifierReports, setVerifierReports] = useState([
    {
      title: 'ADVANCED WASTE MANAGEMENT SYSTEMS, INC.',
      place: 'Hixson, USA',
      status: true,
      verfierOption: 'Finalise Verifier',
    },
    {
      title: 'DILLON CONSULTING LIMITED',
      place: 'Toronto, Ontario',
      status: true,
      verfierOption: 'Finalise Verifier',
    },
    {
      title: ' ASTER GLOBAL ENVIRONMENTAL SOLUTIONS, INC.',
      place: 'Ohio, USA',
      status: false,
      verfierOption: '2 days left',
    },
  ])

  return (
    <Box sx={{ p: 1 }}>
      <Grid
        container
        xs={12}
        // sx={{ p: 1, border: '1px solid' }}
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
        {tabIndex === 2 && <VerifierReport data={VerifierReports} />}
      </Grid>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
