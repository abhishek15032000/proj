import { Grid, LinearProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import CCButton from '../../atoms/CCButton'
import SectionA1 from './SectionA1'
import SectionA2 from './SectionA2'
import SectionA3 from './SectionA3'
import SectionA4 from './SectionA4'
import SectionA5 from './SectionA5'
import SectionD1 from './SectionD1'
import SectionD2 from './SectionD2'
import SectionD3 from './SectionD3'
import SectionB2 from './SectionB2'
import SectionB1 from './SectionB1'
import SectionC1 from './SectionC1/SectionC1'
import './issuanceDataCollection.css'

const sections = [
  { name: 'Section A: Description of Project Activity' },
  { name: 'Section B: Implementation of the project activity' },
  { name: 'Section C: Description of Monitoring Activity' },
  { name: 'Section D: Data and parameters' },
  {
    name: 'Section E: Calculation of emission reductions or GHG removals by sinks',
  },
]

const sectionATabs = [
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
  // [
  //   { name: 'E1: Calculation of baseline emissions or  net GHG removals', component:  SectionE1},
  //   { name: 'E2: Calculation of project emissions or actual net GHG removals', component: SectionE2 },
  //   { name: 'E3: Calculation of leakage', component: SectionE3 },
  //   { name: 'E4: Calculation summary of emission reductions or net anthropogenic GHG removals', component: SectionE4 },
  //   { name: 'E5: Comparison of actual emission reductions or net anthropogenic GHG removals', component: SectionE5 },
  //   { name: 'E6: Remarks on difference from estimated value', component:SectionE6  },
  //   { name: 'E7: Actual emission reductions or net anthropogenic GHG removals during 1st commitment period', component: SectionE7 },
  // ],
]

const sectionBTabs = [
  {
    name: 'B1: Description of implemented registered project activityn',
    component: SectionB1,
  },
  { name: 'B2: Post registration changes', component: SectionB2 },
]

const IssuanceDataCollection = () => {
  const [progress, setProgress] = React.useState(10)
  // const [selectedSection, setSelectedSection] = React.useState(0)

  const [sectionIndex, setSectionIndex] = React.useState(0)
  const [subsectionIndex, setSubsectionIndex] = React.useState(0)

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }

  const handleSaveAndNext = () => {
    if (sectionIndex < 5) {
      setSectionIndex(sectionIndex + 1)
      setSubsectionIndex(0)
    }
  }
  const handlePrevious = () => {
    if (sectionIndex < 0) {
      setSectionIndex(sectionIndex - 1)
      setSubsectionIndex(0)
    }
  }

  const renderTab = () => {
    const SelectedSubSectionComp =
      sectionATabs[sectionIndex][subsectionIndex]?.component
    return <SelectedSubSectionComp />
  }

  return (
    <Box sx={{ p: 1 }}>
      <Grid
        container
        xs={11}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Grid item container xs={6}>
          <ArrowBackIcon />
          <Typography>Issuance Data</Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            justifyContent={'space-between'}
            sx={{ width: '100%', mr: 1, color: Colors.darkPrimary1 }}
          >
            <Grid item xs={6}>
              <Typography>Progress</Typography>
            </Grid>
            <Grid item xs={6} alignSelf={'end'}>
              <Typography sx={{ textAlign: 'right' }}>{progress}%</Typography>
            </Grid>
          </Grid>
          <LinearProgress
            sx={{ marginTop: '4px' }}
            color="inherit"
            variant="determinate"
            value={progress}
          />
        </Grid>
      </Grid>
      <Grid
        container
        xs={11}
        sx={{ mt: 3 }}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Grid item xs={6}>
          {getSectionName()}
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <CCButton
              sx={{ color: '#fff', mr: 2 }}
              variant="contained"
              onClick={handlePrevious}
            >
              Previous Section
            </CCButton>
            <CCButton
              sx={{ color: '#fff' }}
              variant="contained"
              onClick={handleSaveAndNext}
            >
              Save & Next
            </CCButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container xs={11}>
        <Box sx={{ mt: 3 }} className="tabs-container">
          <Box className="tabs">
            {sectionATabs[sectionIndex].map((tab, index) => (
              <Box
                key={index}
                className={`${
                  subsectionIndex === index ? 'selected-tab' : 'tab'
                }`}
                onClick={() => setSubsectionIndex(index)}
              >
                <Box className="tab-title">{tab.name}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>{renderTab()}</Box>
      </Grid>
    </Box>
  )
}

export default IssuanceDataCollection
