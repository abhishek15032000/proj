// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'
import TodayIcon from '@mui/icons-material/Today'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
// Local Imports
import IssuanceInfoList from './IssuanceInfoList'
import VerifierReport from './VerifierReport'
import { Colors } from '../../theme'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import moment from 'moment'
import { verifierCalls } from '../../api/verifierCalls.api'

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
const tabs = ['Issuance Details', 'Verifier & Reports']

const ProfileDetailsIssuanceInfo: FC = () => {
  const navigate = useNavigate()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  //console.log(currentProjectDetails)
  const [tabIndex, setTabIndex] = useState(1)
  const [issuanceInfo, setIssuanceInfo] = useState<any | null>(null)
  const [verifierReports, setVerifierReports] = useState<any>([])

  //const [VerifierReports, setVerifierReports] = useState([
  //  {
  //    title: 'ADVANCED WASTE MANAGEMENT SYSTEMS, INC.',
  //    place: 'Hixson, USA',
  //    location: '6430 Hixson Pike Hixson, TN 37343 USA www.awm.net',
  //    website: 'www.awm.net',
  //    director:
  //      'Rob Ellis Director, Western Region 423-843-2206 robellis@awm.net',
  //    contact: '423-843-2206',
  //    mail: 'www.awm.net',
  //    status: true,
  //    verfierOption: 'Finalise Verifier',
  //  },
  //  {
  //    title: 'DILLON CONSULTING LIMITED',
  //    place: 'Toronto, Ontario',
  //    location:
  //      '235 Yorkland Boulevard, Suite 800 Toronto, Ontario M2J 4Y8 www.dillon.ca',
  //    website: 'www.awm.net',
  //    director:
  //      'Zachary Zehr Project Manager & Lead Verifier 1-519-571-9833 ext. 3151 zzehr@dillon.ca',
  //    contact: '423-843-2206',
  //    mail: 'www.awm.net',
  //    status: true,
  //    verfierOption: 'Finalise Verifier',
  //  },
  //  {
  //    title: ' ASTER GLOBAL ENVIRONMENTAL SOLUTIONS, INC.',
  //    place: 'Ohio, USA',
  //    location:
  //      '3800 Clermont Street NW North Lawrence, Ohio 44666, USA www.asterglobal.com',
  //    website: 'www.awm.net',
  //    director:
  //      'Rob Ellis Director, Western Region 423-843-2206 robellis@awm.net',
  //    contact: '423-843-2206',
  //    mail: 'www.awm.net',
  //    status: false,
  //    verfierOption: '2 days left',
  //  },
  //])

  useEffect(() => {
    if (currentProjectDetails) {
      const issuanceInfoTabData = [
        {
          title: 'Project Introduction',
          status: true,
          completionPercent: 100,
        },
        {
          title: 'Sec A: Description of Project Activity',
          status: currentProjectDetails?.section_a?.stepCompleted,
          completionPercent: currentProjectDetails?.section_a?.stepCompleted
            ? 100
            : 0,
        },
        {
          title: 'Sec B: Implementation of the project activity',
          status: currentProjectDetails?.section_b?.stepCompleted,
          completionPercent: currentProjectDetails?.section_a?.stepCompleted
            ? 100
            : 0,
        },
        {
          title: 'Sec C: Description of Monitoring Activity',
          status: currentProjectDetails?.section_b?.stepCompleted,
          completionPercent: currentProjectDetails?.section_a?.stepCompleted
            ? 100
            : 0,
        },
        {
          title: 'Sec D: Data and parameters',
          status: currentProjectDetails?.section_d?.stepCompleted,
          completionPercent: currentProjectDetails?.section_a?.stepCompleted
            ? 100
            : 0,
        },
        {
          title:
            'Sec E: Calculation of emission reductions or GHG removals by sinks',
          status: currentProjectDetails?.section_e?.stepCompleted,
          completionPercent: currentProjectDetails?.section_a?.stepCompleted
            ? 100
            : 0,
        },
      ]
      setIssuanceInfo(issuanceInfoTabData)
    }
  }, [currentProjectDetails])

  //useEffect(() => {
  //  getVerifierByProject()
  //}, [])

  //const getVerifierByProject = () => {
  //  verifierCalls
  //    .getVerifierByProjectId('62fe2a4ed52b366464ec345f')
  //    .then((res) => {
  //      console.log(res)
  //      if (res?.data?.success) {
  //        setVerifierReports(res?.data?.data)
  //      }
  //    })
  //    .catch((err) => console.log(err))
  //}

  return (
    <Box sx={{ p: 1, fontSize: 14 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <KeyboardArrowLeft
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(pathNames.DASHBOARD, { replace: true })
          }}
        />
        <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
          Project Details
        </Typography>
      </Box>
      <Paper sx={{ mt: 3 }}>
        <Grid container>
          <Grid item xs={10} sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 24 }}>
              {currentProjectDetails?.company_name}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
              {currentProjectDetails?.type?.map((type: any, index: number) => (
                <Box
                  sx={{
                    fontSize: 14,
                    color: '#191C1B',
                    backgroundColor: '#E8F3EF',
                    padding: '2px 4px',
                    mt: 1,
                    mr: 1,
                  }}
                  key={index}
                >
                  {type}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TodayIcon sx={{ color: '#006B5E', mr: 1, fontSize: 18 }} />
              <Box>
                Started on{' '}
                {currentProjectDetails?.createdAt &&
                  moment(currentProjectDetails?.createdAt).format('L')}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <PlaceOutlinedIcon
                sx={{ color: '#006B5E', mr: 1, fontSize: 18 }}
              />
              <Typography sx={{ fontSize: 14 }}>
                {projectDetails?.location}
              </Typography>
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
                py: 1,
                mr: 2,
                fontSize: 16,
                fontWeight: 500,
                color: tabIndex === index ? Colors.darkPrimary1 : '#7B9690',
                cursor: 'pointer',
                borderBottom:
                  tabIndex === index
                    ? `2px solid ${Colors.darkPrimary1}`
                    : '1px solid #7B9690',
              }}
              onClick={() => setTabIndex(index)}
            >
              {tab}
            </Box>
          ))}
        </Box>

        {tabIndex === 0 && (
          <IssuanceInfoList data={issuanceInfo && issuanceInfo} />
        )}
        {tabIndex === 1 && (
          <VerifierReport currentProjectId={currentProjectDetails?._id} />
        )}
      </Paper>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
