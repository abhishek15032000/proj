import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA/SectionA1'
import SectionE1 from './SectionE/SectionE1'
import SectionE2 from './SectionE/SectionE2'
import SectionE3 from './SectionE/SectionE3'
import SectionE4 from './SectionE/SectionE4'
import SectionE5 from './SectionE/SectionE5'
import SectionE6 from './SectionE/SectionE6'
import SectionE7 from './SectionE/SectionE7'
import SectionD1 from './SectionD/SectionD1'
import SectionD2 from './SectionD/SectionD2'
import SectionD3 from './SectionD/SectionD3'
import SectionB2 from './SectionB/SectionB2'
import SectionB1 from './SectionB/SectionB1'
import SectionC1 from './SectionC1/SectionC1'
import ProjectCompletionProgress from './ProjectCompletionProgress'
import ListNewProject from '../ListNewProject'
import './MonthlyReportUpdate.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/MonthlyReportUpdate'
// import { moveToNextSection } from '../../utils/MonthlyReportUpdate.utils'
import CCButton from '../../atoms/CCButton'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import SelectDate from '../SelectDate'
import { moveToNextSection } from '../../utils/monthlyReportUpdate.utils'

const sections = [
  { name: 'Select Time Period' },
  { name: 'Section A: Description of Project Activity' },
  { name: 'Section B: Implementation of the project activity' },
  { name: 'Section C: Description of Monitoring Activity' },
  { name: 'Section D: Data and parameters' },
  {
    name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
  },
]

const sectionATabs = [
  [{ name: 'Select Time Period', component: SelectDate }],
  [{ name: 'A1: Purpose & General description', component: SectionA1 }],
  [
    {
      name: 'B1: Description of implemented registered project activity',
      component: SectionB1,
    },
    { name: 'B2: Post registration changes', component: SectionB2 },
  ],
  [
    {
      name: 'Section C: Description of Monitoring Activity',
      component: SectionC1,
    },
  ],
  [
    { name: 'D1: Data and parameters at ex-ante ', component: SectionD1 },
    { name: 'D2: Data & parameters monitored', component: SectionD2 },
    { name: 'D3: Implementation of Sampling Plan', component: SectionD3 },
  ],
  [
    {
      name: 'E1: Calculation of baseline emissions or  net GHG removals',
      component: SectionE1,
    },
    {
      name: 'E2: Calculation of project emissions or actual net GHG removals',
      component: SectionE2,
    },
    { name: 'E3: Calculation of leakage', component: SectionE3 },
    {
      name: 'E4: Calculation summary of emission reductions or net anthropogenic GHG removals',
      component: SectionE4,
    },
    {
      name: 'E5: Comparison of actual emission reductions or net anthropogenic GHG removals',
      component: SectionE5,
    },
    {
      name: 'E6: Remarks on difference from estimated value',
      component: SectionE6,
    },
    {
      name: 'E7: Actual emission reductions or net anthropogenic GHG removals during 1st commitment period',
      component: SectionE7,
    },
  ],
]

const MonthlyReportUpdate = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [nextBtn, setNextBtn] = useState(true)

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  const sectionIndex = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.sectionIndex,
    shallowEqual
  )
  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails?.projectCompleted &&
      sectionIndex === 5
    )
      setNextBtn(false)
  }, [currentProjectDetails, sectionIndex])

  const subSectionIndex = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.subSectionIndex,
    shallowEqual
  )

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }

  const handleSave = () => {
    moveToNextSection(sectionIndex, subSectionIndex)
  }
  const handlePrevious = () => {
    if (sectionIndex > 0) {
      dispatch(setSectionIndex(sectionIndex - 1))
      dispatch(setSubSectionIndex(0))
    }
  }
  const handleNext = () => {
    dispatch(setSectionIndex(sectionIndex + 1))
    dispatch(setSubSectionIndex(0))
    //handling next btn as per section data collection percentage
    if (sectionIndex === 5) {
      if (nextBtn) {
        navigate(pathNames.DASHBOARD)
      }
      // else if (!nextBtn) {
      //   if (currentProjectDetails?.project_status === 0) {
      //     navigate(pathNames.SELECT_VERIFIER)
      //   } else navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
      // }
    }
  }

  const renderTab = () => {
    const SelectedSubSectionComp =
      sectionATabs[sectionIndex][subSectionIndex]?.component
    return <SelectedSubSectionComp />
  }

  return (
    <Grid container>
      <Grid item xs={9}>
        <Paper sx={{ p: 3 }}>
          <Grid
            container
            xs={12}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid item container xs={6} alignItems={'center'}>
              <KeyboardArrowLeft
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(-1)
                }}
              />
              <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
                Monthly Report Update
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
              <CCButton
                sx={{
                  backgroundColor: Colors.darkPrimary1,
                  padding: '8px 24px',
                  minWidth: '50px',
                  color: '#fff',
                  borderRadius: 10,
                  fontSize: 14,
                  mr: 1,
                }}
                onClick={handleSave}
              >
                {loading ? 'Saving ...' : 'Save'}
              </CCButton>
              {sectionIndex !== 0 && (
                <Box
                  sx={{
                    backgroundColor: '#F6F9F7',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    mr: 1,
                    cursor: 'pointer',
                  }}
                  onClick={handlePrevious}
                >
                  <ArrowBackIcon
                    sx={{ color: '#006B5E', fontSize: 18, mr: 1 }}
                  />
                  <Typography
                    sx={{
                      color: '#006B5E',
                      fontWeight: 500,
                    }}
                  >
                    Previous
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  backgroundColor: '#F6F9F7',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  cursor: 'pointer',
                }}
                onClick={handleNext}
              >
                <Typography
                  sx={{
                    color: '#006B5E',
                    fontWeight: 500,
                    mr: 1,
                  }}
                >
                  {nextBtn ? 'Next' : 'Complete'}
                </Typography>
                <ArrowForwardIcon sx={{ color: '#006B5E', fontSize: 18 }} />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sx={{ mt: 3 }}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid
              item
              sx={{
                p: 1,
                backgroundColor: '#DAF7F0',
                borderBottom: '2px solid #005046',
                borderRadius: '6px 6px 0 0',
              }}
            >
              {getSectionName()}
            </Grid>
          </Grid>
          <Grid container xs={12}>
            {sectionIndex !== 0 && (
              <Box sx={{ mt: 3 }} className="tabs-container">
                <Box className="tabs">
                  {sectionATabs[sectionIndex]?.map((tab, index) => (
                    <Box
                      key={index}
                      className={`${
                        subSectionIndex === index ? 'selected-tab' : 'tab'
                      }`}
                      onClick={() => dispatch(setSubSectionIndex(index))}
                    >
                      <Box className="tab-title">{tab.name}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            <Box sx={{ width: '100%' }}>{renderTab()}</Box>
          </Grid>
        </Paper>
      </Grid>
      <Grid item container xs={3}>
        <ProjectCompletionProgress sectionIndex={sectionIndex} />
      </Grid>
    </Grid>
  )
}

export default MonthlyReportUpdate
