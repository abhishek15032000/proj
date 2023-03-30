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
import {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import ProjectIntro from '../ProjectDetails/Skeleton/ProjectIntro'
import { addSectionPercentages } from '../../utils/newProject.utils'

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
  const projectData = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(0)
  const [issuanceInfo, setIssuanceInfo] = useState<any | null>(null)
  const [projectStatus, setProjectStatus] = useState<number>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getProjectAllData(projectId)
  }, [])

  const getProjectAllData = (projectId: any) => {
    setLoading(true)
    dataCollectionCalls
      .getProjectById(projectId)
      .then((result) => {
        calculatePercentage(result.data)
      })
      .catch((e) => e)
      .finally(() => setLoading(false))
  }

  const calculatePercentage = (projectData: any) => {
    if (location?.state?.status !== 0) {
      if (location.state.projectDetailsTabIndex) {
        setTabIndex(location.state.projectDetailsTabIndex)
      } else {
        setTabIndex(1)
      }
    }

    const modifiedRows = addSectionPercentages(projectData)
    console.log('modifiedRows', modifiedRows)
    if (modifiedRows) {
      setProjectStatus(modifiedRows?.project_status)
      const issuanceInfoTabData = [
        {
          title: 'Project Introduction',
          status: 'Complete',
          completionPercent: 100,
        },
        {
          title: 'Sec A: Description of Project Activity',
          status:
            modifiedRows?.section_a?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: modifiedRows?.section_a?.completionPercentage,
        },
        {
          title: 'Sec B: Implementation of the project activity',
          status:
            modifiedRows?.section_b?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: modifiedRows?.section_b?.completionPercentage,
        },
        {
          title: 'Sec C: Description of Monitoring Activity',
          status:
            modifiedRows?.section_c?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: modifiedRows?.section_c?.completionPercentage,
        },
        {
          title: 'Sec D: Data and parameters',
          status:
            modifiedRows?.section_d?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: modifiedRows?.section_d?.completionPercentage,
        },
        {
          title:
            'Sec E: Calculation of emission reductions or GHG removals by sinks',
          status:
            modifiedRows?.section_e?.completionPercentage === 100
              ? 'Complete'
              : 'In Progress',
          completionPercent: modifiedRows?.section_e?.completionPercentage,
        },
      ]
      setIssuanceInfo(issuanceInfoTabData)

      dispatch(setCurrentProjectDetails(modifiedRows))
      dispatch(setCurrentProjectDetailsUUID(projectId))
      if (location?.state?.isEdited) {
        redirectOnSection()
      }
    }
  }

  const redirectOnSection = () => {
    dispatch(setSectionIndex(1))
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
  }

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
                      projectData?.verifier_details_id?.verifier_id
                        ?.organisationName,
                    verifierID:
                      projectData?.verifier_details_id?.verifier_id?._id,
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
