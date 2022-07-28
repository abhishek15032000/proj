import {
  Button,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA1'
import SectionA2 from './SectionA2'
import SectionA3 from './SectionA3'
import SectionA4 from './SectionA4'
import SectionA5 from './SectionA5'
import CCButton from '../../atoms/CCButton'
import SectionB2 from './SectionB2'
import SectionB1 from './SectionB1'
import SectionC1 from './SectionC1/SectionC1'

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

const sectionBTabs = [
  {
    name: 'B1: Description of implemented registered project activityn',
    component: SectionB1,
  },
  { name: 'B2: Post registration changes', component: SectionB2 },
]

const IssuanceDataCollection = () => {
  const [progress, setProgress] = React.useState(10)
  const [sectionATabIndex, setSectionATabIndex] = React.useState(1)
  const [selectedSection, setSelectedSection] = React.useState(0)

  const getSectionName = () => {
    //return sections[1]?.name
    return sections[selectedSection]?.name
  }

  const handleSaveAndNext = () => {
    console.log('handleSaveAndNext clicked')
    selectedSection <= 5 && setSelectedSection(selectedSection + 1)
  }

  return (
    <Box sx={{ p: 1 }}>
      <Grid container xs={11} sx={{ p: 1 }} justifyContent={'space-between'}>
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
      <Grid container xs={11} justifyContent={'space-between'}>
        <Grid item xs={6}>
          {getSectionName()}
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <CCButton
              sx={{ color: '#fff', mr: 2 }}
              variant="contained"
              onClick={handleSaveAndNext}
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
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={sectionATabIndex}
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {sectionBTabs.map((tab, index) => (
            <Tab
              key={index}
              value={index + 1}
              label={tab?.name}
              onClick={() => setSectionATabIndex(index + 1)}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        {sectionATabIndex === 1 && <SectionC1 />}
        {sectionATabIndex === 2 && <SectionC1 />}
        {/*{sectionATabIndex === 3 && <SectionA3 />}
        {sectionATabIndex === 4 && <SectionA4 />}
        {sectionATabIndex === 5 && <SectionA5 />}*/}
      </Box>
    </Box>
  )
}

export default IssuanceDataCollection
