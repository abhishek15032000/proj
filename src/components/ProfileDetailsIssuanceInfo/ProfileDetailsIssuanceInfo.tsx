// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import IssuanceInfoList from './IssuanceInfoList'
import VerifierReport from './VerifierReport'
import { Colors } from '../../theme'

import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual, useDispatch } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import WebAppTraceHistory from '../ProjectDetails/TraceHistory/WebappTraceHistory'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import ProjectIntroduction from '../ProjectDetails/ProjectIntoduction/ProjectIntroduction'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import About from '../About'
import { setCurrentProjectDetails } from '../../redux/Slices/issuanceDataCollection'
import { projectDetailsCalls } from '../../api/projectDetailsCalls.api'
import ProjectIntro from '../ProjectDetails/Skeleton/ProjectIntro'

const tabs = [
  'About',
  'Registration Details',
  'Verifier & Reports',
  'Traceability',
]

const ProfileDetailsIssuanceInfo: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location: any = useLocation()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')
  // const projectData = useAppSelector(
  //   ({ issuanceDataCollection }) =>
  //     issuanceDataCollection.projectData,
  //   shallowEqual
  // )

  const [tabIndex, setTabIndex] = useState(0)
  const [issuanceInfo, setIssuanceInfo] = useState<any | null>(null)
  const [projectStatus, setProjectStatus] = useState<number>()
  const [projectData, setProjectData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getProjectAllData(projectId)
    // return () => {
    //   setProjectData(null)
    // }
  }, [searchParams])

  const getProjectAllData = (projectId: any) => {
    setLoading(true)
    dataCollectionCalls
      .getProjectById(projectId)
      .then((result) => {
        setProjectData(result.data)
        dispatch(setCurrentProjectDetails(result.data))
      })
      .catch((e) => e)
      .finally(() => setLoading(false))
  }
  // useEffect(() => {
  //   if (!projectData) navigate(pathNames.DASHBOARD)
  // }, [])

  useEffect(() => {
    if (location?.state?.status !== 0) {
      setTabIndex(1)
    }

    if (projectData) {
      setProjectStatus(projectData?.project_status)
      const issuanceInfoTabData = [
        {
          title: 'Project Introduction',
          status: 'Complete',
          completionPercent: 100,
        },
        {
          title: 'Sec A: Description of Project Activity',
          status:
            projectData?.section_a?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: projectData?.section_a?.completionPercentage,
        },
        {
          title: 'Sec B: Implementation of the project activity',
          status:
            projectData?.section_b?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: projectData?.section_b?.completionPercentage,
        },
        {
          title: 'Sec C: Description of Monitoring Activity',
          status:
            projectData?.section_c?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: projectData?.section_c?.completionPercentage,
        },
        {
          title: 'Sec D: Data and parameters',
          status:
            projectData?.section_d?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: projectData?.section_d?.completionPercentage,
        },
        {
          title:
            'Sec E: Calculation of emission reductions or GHG removals by sinks',
          status:
            projectData?.section_e?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: projectData?.section_e?.completionPercentage,
        },
      ]
      setIssuanceInfo(issuanceInfoTabData)
    }
  }, [projectData])

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
      {loading ? (
        <ProjectIntro />
      ) : (
        <ProjectIntroduction projectDetailsData={projectData} />
      )}

      {/*<Grid container>
          <Grid item xs={10} sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 24 }}>
              {projectData?.company_name}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
              {projectData?.type?.map((type: any, index: number) => (
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
                {projectData?.createdAt &&
                  moment(projectData?.createdAt).format('L')}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <PlaceOutlinedIcon
                sx={{ color: '#006B5E', mr: 1, fontSize: 18 }}
              />
              <Typography sx={{ fontSize: 14 }}>
                {projectData?.location}
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
          {projectData?.project_status >=
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
                    project: projectData,
                    pdf: projectData?.project_pdf,
                    verifierName:
                      projectData?.verifier_details_id?.verifier_name,
                    verifierID: projectData?.verifier_details_id?.verifier_id,
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
          {tabIndex === 0 && <About projectId={projectId} />}
          {tabIndex === 1 && (
            <IssuanceInfoList
              data={issuanceInfo && issuanceInfo}
              projectStatus={projectStatus}
            />
          )}
          {tabIndex === 2 && (
            <VerifierReport
              currentProjectId={projectData?._id}
              currentProjectUUID={projectData?.uuid}
            />
          )}
          {tabIndex === 3 && (
            <Box sx={{ mt: 5 }}>
              <Typography sx={{ fontSize: 18, color: '#1D4B44', mb: 2 }}>
                Trace History
              </Typography>
              <WebAppTraceHistory projectId={projectId} />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default ProfileDetailsIssuanceInfo
