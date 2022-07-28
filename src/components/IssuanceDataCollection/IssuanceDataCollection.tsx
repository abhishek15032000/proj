import { Grid, LinearProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA1'
import SectionA2 from './SectionA2'
import SectionA3 from './SectionA3'
import SectionA4 from './SectionA4'
import SectionA5 from './SectionA5'
import CCButton from '../../atoms/CCButton'
import './issuanceDataCollection.css'

import SectionD1 from './SectionD1'
import SectionD2 from './SectionD2'
import SectionD3 from './SectionD3'

const sections = [
  { name: 'Section A: Description of Project Activity' },
  { name: 'Section B: Implementation of the project activity' },
]

const sectionATabs = [
  { name: 'A1: Purpose & General description', component: SectionA1 },
  { name: 'A2: Location', component: SectionA2 },
  { name: 'A3: Parties & Project Participants', component: SectionA3 },
  { name: 'A4: Reference & Applied Methodology', component: SectionA4 },
  { name: 'A5: Crediting Period', component: SectionA5 },
]

const IssuanceDataCollection = () => {
  const [progress, setProgress] = React.useState(10)
  const [sectionATabIndex, setSectionATabIndex] = React.useState(1)

  // const [tabIndex, setTabIndex] = useState(0);
  // const [tabData, setTabData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('')

  const getSectionName = () => {
    return sections[0]?.name
  }

  const handleSaveAndNext = () => {
    console.log('handleSaveAndNext clicked')
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
            {sectionATabs.map((tab, index) => (
              <Box
                key={index}
                className={`${
                  sectionATabIndex === index + 1 ? 'selected-tab' : 'tab'
                }`}
                onClick={() => setSectionATabIndex(index + 1)}
              >
                <Box className="tab-title">{tab.name}</Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          {sectionATabIndex === 1 && <SectionA1 />}
          {sectionATabIndex === 2 && <SectionA2 />}
          {sectionATabIndex === 3 && <SectionA3 />}
          {sectionATabIndex === 4 && <SectionA4 />}
          {sectionATabIndex === 5 && <SectionA5 />}
        </Box>
      </Grid>
    </Box>
  )
}

export default IssuanceDataCollection
