import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA1'
import SectionA2 from './SectionA2'
import SectionA3 from './SectionA3'
import SectionA4 from './SectionA4'
import SectionA5 from './SectionA5'
import SectionE1 from './SectionE1'
import SectionE2 from './SectionE2'
import SectionE3 from './SectionE3'
import SectionE4 from './SectionE4'
import SectionE5 from './SectionE5'
import SectionE6 from './SectionE6'
import SectionE7 from './SectionE7'
import SectionD1 from './SectionD1'
import SectionD2 from './SectionD2'
import SectionD3 from './SectionD3'
import SectionB2 from './SectionB2'
import SectionB1 from './SectionB1'
import SectionC1 from './SectionC1/SectionC1'
import ProjectCompletionProgress from './ProjectCompletionProgress'
import ListNewProject from '../ListNewProject'
import './issuanceDataCollection.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { moveToNextSection } from '../../utils/issuanceDataCollection.utils'

const sections = [
  { name: 'Project Introduction' },
  { name: 'Section A: Description of Project Activity' },
  { name: 'Section B: Implementation of the project activity' },
  { name: 'Section C: Description of Monitoring Activity' },
  { name: 'Section D: Data and parameters' },
  {
    name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
  },
]

const sectionATabs = [
  [{ name: 'Project Introduction', component: ListNewProject }],
  [
    { name: 'A1: Purpose & General description', component: SectionA1 },
    { name: 'A2: Location', component: SectionA2 },
    { name: 'A3: Parties & Project Participants', component: SectionA3 },
    { name: 'A4: Reference & Applied Methodology', component: SectionA4 },
    { name: 'A5: Crediting Period', component: SectionA5 },
  ],
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

const IssuanceDataCollection = () => {
  const dispatch = useAppDispatch()

  const projectName = useAppSelector(
    ({ newProject }) => newProject.projectName,
    shallowEqual
  )
  const projectType = useAppSelector(
    ({ newProject }) => newProject.projectType,
    shallowEqual
  )
  const projectLocation = useAppSelector(
    ({ newProject }) => newProject.projectLocation,
    shallowEqual
  )
  const startDate = useAppSelector(
    ({ newProject }) => newProject.startDate,
    shallowEqual
  )
  const projectDuration = useAppSelector(
    ({ newProject }) => newProject.projectDuration,
    shallowEqual
  )
  const projectArea = useAppSelector(
    ({ newProject }) => newProject.projectArea,
    shallowEqual
  )

  const sectionIndex = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.sectionIndex,
    shallowEqual
  )
  const subSectionIndex = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.subSectionIndex,
    shallowEqual
  )

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }

  const handleSaveAndNext = () => {
    if (
      projectName &&
      projectType &&
      projectLocation &&
      startDate &&
      projectDuration &&
      projectArea
    ) {
      moveToNextSection(sectionIndex, subSectionIndex)
    } else {
      dispatch(setSectionIndex(sectionIndex + 1))
      dispatch(setSubSectionIndex(0))
    }
  }
  const handlePrevious = () => {
    if (sectionIndex > 0) {
      dispatch(setSectionIndex(sectionIndex - 1))
      dispatch(setSubSectionIndex(0))
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
              <KeyboardArrowLeft />
              <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
                List New Project
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'end' }}>
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
                onClick={handleSaveAndNext}
              >
                <Typography
                  sx={{
                    color: '#006B5E',
                    fontWeight: 500,
                    mr: 1,
                  }}
                >
                  Next
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

export default IssuanceDataCollection
