import { Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Colors } from '../../theme'
import { Box } from '@mui/system'
import SectionA1 from './SectionA/SectionA1'
import SectionA2 from './SectionA/SectionA2'
import SectionA3 from './SectionA/SectionA3'
import SectionA4 from './SectionA/SectionA4'
import SectionA5 from './SectionA/SectionA5'
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
import SectionC1 from './SectionC/SectionC1'
import ProjectCompletionProgress from './ProjectCompletionProgress'
import ListNewProject from '../ListNewProject'
import './issuanceDataCollection.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setIsApiCalled,
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { moveToNextSection } from '../../utils/issuanceDataCollection.utils'
import CCButton from '../../atoms/CCButton'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import Spinner from '../../atoms/Spinner'

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
  const navigate = useNavigate()

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
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
  const IsApiCalled = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.isApiCalled,
    shallowEqual
  )

  const [nextBtn, setNextBtn] = useState<boolean>(true)
  //const [IsApiCalled, setIsApiCalled] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [subSectionIndexState, setSubSectionIndexState] = useState<number>()
  const [sectionIndexState, setSectionIndexState] = useState<number>()
  const [changeInSection, setChangeInSection] = useState<boolean>(false)

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails?.projectCompleted &&
      sectionIndex === 5
    )
      setNextBtn(false)
  }, [currentProjectDetails, sectionIndex])

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }

  const handleSave = () => {
    dispatch(setIsApiCalled(false))
    moveToNextSection(sectionIndex, subSectionIndex)
  }

  const handlePrevious = () => {
    if (sectionIndex > 0) {
      if (!IsApiCalled) {
        setModal(true)
        setChangeInSection(true)
        setSectionIndexState(sectionIndex - 1)
        setSubSectionIndexState(0)
        //return
      } else if (IsApiCalled) {
        dispatch(setIsApiCalled(false))
        dispatch(setSectionIndex(sectionIndex - 1))
        dispatch(setSubSectionIndex(0))
      }
    }
  }

  const handleNext = () => {
    if (sectionIndex === 0) dispatch(setSectionIndex(sectionIndex + 1))
    if (sectionIndex > 0 && !IsApiCalled) {
      setModal(true)
      setChangeInSection(true)
      setSectionIndexState(sectionIndex + 1)
      setSubSectionIndexState(0)
    } else if (IsApiCalled) {
      dispatch(setIsApiCalled(false))
      dispatch(setSectionIndex(sectionIndex + 1))
      dispatch(setSubSectionIndex(0))
    }
    //handling next btn as per section data collection percentage
    if (sectionIndex === 5) {
      if (nextBtn) {
        navigate(pathNames.DASHBOARD)
      } else if (!nextBtn) {
        if (currentProjectDetails?.project_status === 0) {
          navigate(pathNames.SELECT_VERIFIER)
        } else navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
      }
    }
  }

  const handleSubSectionClick = (index?: number) => {
    if (subSectionIndex !== index) {
      if (sectionIndex > 0 && !IsApiCalled) {
        setModal(true)
        setSubSectionIndexState(index)
        return
      } else if (IsApiCalled) {
        dispatch(setIsApiCalled(false))
        dispatch(setSubSectionIndex(index))
      }
    }
  }

  const handleQuitWithoutSave = () => {
    //console.log('sectionIndex', sectionIndex, subSectionIndexState)
    setModal(false)
    //ChangeInSection is to know whether the issuer has clicked on section level next or he is changing in subSection level
    changeInSection && dispatch(setSectionIndex(sectionIndexState))
    dispatch(setSubSectionIndex(subSectionIndexState))
    setChangeInSection(false)
  }

  const handleModalSave = () => {
    setModal(false)
    handleSave()
  }

  const renderTab = () => {
    const SelectedSubSectionComp =
      sectionATabs[sectionIndex][subSectionIndex]?.component
    return <SelectedSubSectionComp />
  }

  return (
    <>
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
                  List New Project
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
                  Save
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
                        onClick={() => handleSubSectionClick(index)}
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
      {/*//modal*/}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <Paper
          sx={{
            px: 10,
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          <Box>
            <Typography
              textAlign="center"
              sx={{ fontWeight: 500, fontSize: 20 }}
            >
              Save Changes?
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: 14, pt: 3, pb: 5 }}>
              Your unsaved changes will be lost. Save changes before closing ?
            </Typography>
          </Box>
          <Stack direction="row" justifyContent={'space-between'}>
            <CCButtonOutlined
              sx={{
                minWidth: 0,
                padding: '6px 17px',
                borderRadius: 10,
                mr: 3,
                fontSize: 14,
                fontWeight: 500,
              }}
              onClick={handleQuitWithoutSave}
            >
              Quit without saving
            </CCButtonOutlined>
            <CCButton
              onClick={handleModalSave}
              sx={{
                minWidth: 0,
                padding: '6px 68px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Save
            </CCButton>
          </Stack>
        </Paper>
      </Modal>
    </>
  )
}

export default IssuanceDataCollection
