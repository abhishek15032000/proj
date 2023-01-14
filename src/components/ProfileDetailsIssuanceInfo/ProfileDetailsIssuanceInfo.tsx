// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import TodayIcon from '@mui/icons-material/Today'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

// Local Imports
import IssuanceInfoList from './IssuanceInfoList'
import VerifierReport from './VerifierReport'
import { Colors } from '../../theme'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import moment from 'moment'
import TextButton from '../../atoms/TextButton/TextButton'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

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
const tabs = ['Registration Details', 'Verifier & Reports']

const ProfileDetailsIssuanceInfo: FC = () => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(0)
  const [issuanceInfo, setIssuanceInfo] = useState<any | null>(null)
  const [projectStatus, setProjectStatus] = useState<number>()
  useEffect(() => {
    if (location?.state?.status !== 0) {
      setTabIndex(1)
    }

    if (currentProjectDetails) {
      setProjectStatus(currentProjectDetails?.project_status)
      const issuanceInfoTabData = [
        {
          title: 'Project Introduction',
          status: 'Complete',
          completionPercent: 100,
        },
        {
          title: 'Sec A: Description of Project Activity',
          status:
            currentProjectDetails?.section_a?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent:
            currentProjectDetails?.section_a?.completionPercentage,
        },
        {
          title: 'Sec B: Implementation of the project activity',
          status:
            currentProjectDetails?.section_b?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent:
            currentProjectDetails?.section_b?.completionPercentage,
        },
        {
          title: 'Sec C: Description of Monitoring Activity',
          status:
            currentProjectDetails?.section_c?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent:
            currentProjectDetails?.section_c?.completionPercentage,
        },
        {
          title: 'Sec D: Data and parameters',
          status:
            currentProjectDetails?.section_d?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent:
            currentProjectDetails?.section_d?.completionPercentage,
        },
        {
          title:
            'Sec E: Calculation of emission reductions or GHG removals by sinks',
          status:
            currentProjectDetails?.section_e?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent:
            currentProjectDetails?.section_e?.completionPercentage,
        },
      ]
      setIssuanceInfo(issuanceInfoTabData)
    }
  }, [currentProjectDetails])

  console.log('currentProjectDetails'), currentProjectDetails
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
                {currentProjectDetails?.location}
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onClick={() => navigate(pathNames.REVIEW_AND_COMMENT)}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 500,
                color: Colors.tertiary,
                textDecoration: 'underline',
              }}
            >
              {' '}
              View Comments
            </Typography>
            <Box>
              <OpenInNewIcon sx={{ ml: 1, color: Colors.darkPrimary1 }} />
            </Box>
          </Box>
        </Box>

        <Box>
          {tabIndex === 0 && (
            <IssuanceInfoList
              data={issuanceInfo && issuanceInfo}
              projectStatus={projectStatus}
            />
          )}
          {tabIndex === 1 && (
            <VerifierReport
              currentProjectId={currentProjectDetails?._id}
              currentProjectUUID={currentProjectDetails?.uuid}
            />
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
