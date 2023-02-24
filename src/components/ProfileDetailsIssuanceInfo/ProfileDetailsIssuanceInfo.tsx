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
import ProjectIntro from '../ProjectDetailsRegistryAcc/ProjectIntro'
import WebAppTraceHistory from '../ProjectDetails/TraceHistory/WebappTraceHistory'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import ProjectIntroduction from '../ProjectDetails/ProjectIntoduction/ProjectIntroduction'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import About from '../About'

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
const tabs = [
  'About',
  'Registration Details',
  'Verifier & Reports',
  'Traceability',
]

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
    if (!currentProjectDetails) navigate(pathNames.DASHBOARD)

    if (location?.state?.status === 0) {
      setTabIndex(1)
    } else {
      setTabIndex(2)
    }
  }, [])

  useEffect(() => {
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

  return (
    <Box sx={{ p: 1, fontSize: 14 }}>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={'12px'}
        mb={5}
      >
        <Grid item>
          <BackHeader title="Project Details" onClick={() => navigate(-1)} />
        </Grid>
        <Grid item>
          <CCButton
            onClick={() => navigate(pathNames.RISK_DASHBOARD)}
            variant="contained"
            sx={{
              ml: 3,
              padding: '10px 25px',
              borderRadius: 10,
              fontSize: 14,
              '&:hover': {
                backgroundColor: 'accent.main',
                boxShadow: `0px 4px 6px rgba(29, 74, 67, 0.5)`,
                color: '#006B5E',
              },
            }}
            buttonBackgroundColor={'#006B5E'}
            buttonColor={'white'}
            // onClick={btn1OnClick}
            // disabled={disableBtn1}
          >
            <ArrowOutwardIcon sx={{ fontSize: 16, fontWeight: '600', mr: 1 }} />
            Climate Risk Dashboard
          </CCButton>
        </Grid>
      </Grid>
      {/*<Paper sx={{ mt: 3 }}>*/}
      <ProjectIntroduction
        projectDetailsData={currentProjectDetails}
        // title={currentProjectDetails?.company_name}
        // location={currentProjectDetails?.location}
      />
      {/*<Grid container>
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
        </Grid>*/}
      {/*</Paper>*/}

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
          {currentProjectDetails?.project_status >=
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              onClick={() =>
                navigate(pathNames.REVIEW_AND_COMMENT, {
                  state: {
                    project: currentProjectDetails,
                    pdf: currentProjectDetails?.project_pdf,
                    verifierName:
                      currentProjectDetails?.verifier_details_id?.verifier_name,
                    verifierID:
                      currentProjectDetails?.verifier_details_id?.verifier_id,
                  },
                })
              }
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
          ) : null}
        </Box>

        <Box>
          {tabIndex === 0 && (
            <About
              projectId={currentProjectDetails?.uuid}
              projectStatus={currentProjectDetails?.project_status}
            />
          )}
          {tabIndex === 1 && (
            <IssuanceInfoList
              data={issuanceInfo && issuanceInfo}
              projectStatus={projectStatus}
            />
          )}
          {tabIndex === 2 && (
            <VerifierReport
              currentProjectId={currentProjectDetails?._id}
              currentProjectUUID={currentProjectDetails?.uuid}
            />
          )}
          {tabIndex === 3 && (
            <Box sx={{ mt: 5 }}>
              <Typography sx={{ fontSize: 18, color: '#1D4B44', mb: 2 }}>
                Trace History
              </Typography>
              <WebAppTraceHistory projectId={currentProjectDetails?.uuid} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
