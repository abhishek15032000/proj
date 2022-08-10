// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import {
  Box,
  Grid,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import TodayIcon from '@mui/icons-material/Today'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TopInfo from '../../atoms/TopInfo/TopInfo'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import IssuanceInfoList from './IssuanceInfoList'
import VerifierReport from './VerifierReport'
import { Colors } from '../../theme'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { borderBottom } from '@mui/system'

const projectDetails = {
  company_name:
    '3.66 MW poultry litter based power generation project by Raus Power in India',
  start_date: '2022-08-08T08:04:33.441Z',
  type: [
    'Forestry- Avoided conversion/ deforestation',
    'Agricultural Land Management (ALM)',
  ],
  location: 'Test location 2',
  duration: 2,
  area: '1000',
}
const tabs = ['Issuance Details', 'Verifier & Report']

const ProfileDetailsIssuanceInfo: FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [issuanceInfo, setIssuanceInfo] = useState([
    {
      title: 'Project Introduction',
      status: true,
      completionPercent: 100,
    },
    {
      title: 'Sec A: Description of Project Activity',
      status: true,
      completionPercent: 100,
    },
    {
      title: 'Sec B: Implementation of the project activity',
      status: true,
      completionPercent: 100,
    },
    {
      title: 'Sec C: Description of Monitoring Activity',
      status: false,
      completionPercent: 0,
    },
    {
      title: 'Sec D: Data and parameters',
      status: true,
      completionPercent: 100,
    },
    {
      title:
        'Sec E: Calculation of emission reductions or GHG removals by sinks',
      status: true,
      completionPercent: 100,
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <KeyboardArrowLeft />
        <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
          List New Project
        </Typography>
      </Box>
      <Paper sx={{ mt: 3 }}>
        <Grid container>
          <Grid item xs={10} sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 24 }}>
              {projectDetails?.company_name}
            </Typography>
            <Box sx={{ display: 'flex', mt: 2 }}>
              {projectDetails?.type?.map((type, index) => (
                <Box
                  sx={{
                    color: '#191C1B',
                    backgroundColor: '#E8F3EF',
                    padding: '2px 4px',
                    mr: 1,
                  }}
                  key={index}
                >
                  {type}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TodayIcon sx={{ color: '#006B5E', mr: 1 }} />
              <Typography>Started on {projectDetails?.start_date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
              <Typography>{projectDetails?.location}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                backgroundColor: 'lightgrey',
                width: '100%',
                height: '100%',
              }}
            ></Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ mt: 2, px: 2, py: 2 }}>
        <Box sx={{ display: 'flex', mt: 1 }}>
          {tabs.map((tab, index) => (
            <Box
              key={index}
              sx={{
                px: 2,
                py: 1,
                fontSize: 16,
                fontWeight: 500,
                color: tabIndex === index ? Colors.darkPrimary1 : '#7B9690',
                cursor: 'pointer',
                borderBottom:
                  tabIndex === index
                    ? `4px solid ${Colors.darkPrimary1}`
                    : '2px solid #7B9690',
              }}
              onClick={() => setTabIndex(index)}
            >
              {tab}
            </Box>
          ))}
        </Box>

        {tabIndex === 0 && <IssuanceInfoList data={issuanceInfo} />}
        {tabIndex === 1 && <VerifierReport data={VerifierReports} />}
      </Paper>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
