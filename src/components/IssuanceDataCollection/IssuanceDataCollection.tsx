import { Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Colors, Images } from '../../theme'
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
import SectionA6 from './SectionA/SectionA6'
import SectionA7 from './SectionA/SectionA7'
import SectionB3 from './SectionB/SectionB3'
import SectionC2 from './SectionC/SectionC2'
import SectionE8 from './SectionE/SectionE8'
import ProjectCompletionProgress from './ProjectCompletionProgress'
import ListNewProject from '../ListNewProject'
import './issuanceDataCollection.css'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setSectionIndex,
  setSubSectionIndex,
  setShowMandatoryFieldModal,
  setIsApiCallSuccess,
  setToMoveSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { moveToNextSection } from '../../utils/issuanceDataCollection.utils'
import CCButton from '../../atoms/CCButton'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import Spinner from '../../atoms/Spinner'
import _ from 'lodash'
import { setLocalItem } from '../../utils/Storage'
import { isDataModifiedCheckFunc } from '../../utils/IssuanceDataCollectionModal.utils'
import { store } from '../../redux/store'
import CloseIcon from '@mui/icons-material/Close'
import { resetSectionA } from '../../redux/Slices/sectionASlice'
import { resetSectionE } from '../../redux/Slices/sectionESlice'
import { resetSectionD } from '../../redux/Slices/sectionDSlice'
import { resetSectionB } from '../../redux/Slices/sectionBSlice'
import { resetSectionC } from '../../redux/Slices/sectionCSlice'
import { resetSectionNewProjectDetails } from '../../redux/Slices/newProjectSlice'
import { usePrompt } from '../../hooks/useCustomBlocker'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'

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
    { name: 'A6: Safeguards', component: SectionA6 },
    { name: 'A7: Additionaly', component: SectionA7 },
  ],
  [
    {
      name: 'B1: Description of implemented registered project activity',
      component: SectionB1,
    },
    { name: 'B2: Post registration changes', component: SectionB2 },
    { name: 'B3: Additional details', component: SectionB3 },
  ],
  [
    {
      name: 'C1: Description of Monitoring Activity',
      component: SectionC1,
    },
    {
      name: 'C2: Quantification of GHG emission mitigations',
      component: SectionC2,
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
    {
      name: 'E8: Appendix',
      component: SectionE8,
    },
  ],
]

const IssuanceDataCollection = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const ref = useRef()
  const sectionA = store.getState()?.sectionA

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
  const showMandatoryFieldModal = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.showMandatoryFieldModal,
    shallowEqual
  )
  const isApiCallSuccess = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.isApiCallSuccess,
    shallowEqual
  )
  const toMoveSectionIndex = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.toMoveSectionIndex,
    shallowEqual
  )

  const A1 = useAppSelector(({ sectionA }) => sectionA.A1)
  const A2 = useAppSelector(({ sectionA }) => sectionA.A2)
  const party_and_project_participants = useAppSelector(
    ({ sectionA }) => sectionA.party_and_project_participants
  )
  const A3 = useAppSelector(({ sectionA }) => sectionA.A3)
  const methodologies = useAppSelector(({ sectionA }) => sectionA.methodologies)
  const A5 = useAppSelector(({ sectionA }) => sectionA.A5)
  const A6 = useAppSelector(({ sectionA }) => sectionA.A6)
  const A7 = useAppSelector(({ sectionA }) => sectionA.A7)
  const B1 = useAppSelector(({ sectionB }) => sectionB.B1)
  const B2 = useAppSelector(({ sectionB }) => sectionB.B2)
  const B3 = useAppSelector(({ sectionB }) => sectionB.B3)
  const C1 = useAppSelector(({ sectionC }) => sectionC.C1, shallowEqual)
  const C2 = useAppSelector(({ sectionC }) => sectionC.C2, shallowEqual)
  const D1 = useAppSelector(({ sectionD }) => sectionD.D1, shallowEqual)
  const D2 = useAppSelector(({ sectionD }) => sectionD.D2, shallowEqual)
  const D3 = useAppSelector(({ sectionD }) => sectionD.D3, shallowEqual)
  const E1 = useAppSelector(({ sectionE }) => sectionE.E1, shallowEqual)
  const E2 = useAppSelector(({ sectionE }) => sectionE.E2, shallowEqual)
  const E3 = useAppSelector(({ sectionE }) => sectionE.E3, shallowEqual)
  const E4 = useAppSelector(({ sectionE }) => sectionE.E4, shallowEqual)
  const E5 = useAppSelector(({ sectionE }) => sectionE.E5, shallowEqual)
  const E6 = useAppSelector(({ sectionE }) => sectionE.E6, shallowEqual)
  const E7 = useAppSelector(({ sectionE }) => sectionE.E7, shallowEqual)
  const E8 = useAppSelector(({ sectionE }) => sectionE.E8, shallowEqual)

  const [nextBtn, setNextBtn] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [subSectionIndexState, setSubSectionIndexState] = useState<number>()
  const [sectionIndexState, setSectionIndexState] = useState<number>()
  const [changeInSection, setChangeInSection] = useState<boolean>(false)
  const [blockRouting, setBlockRouting] = useState<boolean>(false)
  const [onHoverText, setOnHoverText] = useState('Copy To Clipboard')
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    return () => {
      dispatch(resetSectionA())
      dispatch(resetSectionB())
      dispatch(resetSectionC())
      dispatch(resetSectionD())
      dispatch(resetSectionE())
      dispatch(setSubSectionIndex(0))
      dispatch(resetSectionNewProjectDetails())
    }
  }, [])

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails?.projectCompleted &&
      sectionIndex === 5
    ) {
      setNextBtn(false)
    } else {
      setNextBtn(true)
    }
  }, [currentProjectDetails, sectionIndex])

  useEffect(() => {
    if (isApiCallSuccess) {
      handleSectionIndexFromModal()
    }
  }, [isApiCallSuccess])

  const getSectionName = () => {
    return sections[sectionIndex]?.name
  }

  const changeOnHoverText = () => {
    setTimeout(() => {
      setOnHoverText('Copy To Clipboard')
    }, 3000)
  }

  const handleSave = () => {
    moveToNextSection(sectionIndex, subSectionIndex)
  }

  const handlePrevious = () => {
    if (sectionIndex > 0) {
      const isDataModified = handleDataCheck()

      if (isDataModified) {
        setModal(true)
        setChangeInSection(true)
        setSectionIndexState(sectionIndex - 1)
        setSubSectionIndexState(0)
      } else if (!isDataModified) {
        dispatch(setSectionIndex(sectionIndex - 1))
        dispatch(setSubSectionIndex(0))
      }
    }
  }

  const handleNextBtnFromSectionE = () => {
    if (nextBtn) {
      navigate(pathNames.DASHBOARD)
    } else if (!nextBtn) {
      if (
        currentProjectDetails?.project_status ===
        PROJECT_ALL_STATUS.CREATED_PROJECT
      ) {
        navigate(pathNames.SELECT_VERIFIER)
      } else {
        navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO)
      }
    }
  }

  const handleNext = () => {
    //Restrct issuer from going to next Sections if New Project hasn't been created
    if (!currentProjectDetails) {
      return
    }
    if (sectionIndex > 0) {
      const isDataModified = handleDataCheck()
      if (isDataModified) {
        setModal(true)
        setChangeInSection(true)
        setSectionIndexState(sectionIndex + 1)
        setSubSectionIndexState(0)
      } else if (!isDataModified) {
        //Don't increase section index in case user is in Section E - (CC-210 bug fix)
        if (sectionIndex !== 5) {
          dispatch(setSectionIndex(sectionIndex + 1))
        }
        dispatch(setSubSectionIndex(0))
      }
      //handling next btn as per section data collection percentage
      !isDataModified && sectionIndex === 5 && handleNextBtnFromSectionE()
    } else if (sectionIndex === 0) dispatch(setSectionIndex(sectionIndex + 1))
  }

  const handleDataCheck = () => {
    if (!currentProjectDetails) {
      return
    }
    const paramsData = [
      {
        sectionName: A1,
        subSectionRow:
          currentProjectDetails['section_a'][`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 0,
      },
      {
        sectionName: A2,
        subSectionRow:
          currentProjectDetails['section_a'][`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 1,
      },
      {
        sectionName: { A3, party_and_project_participants },
        subSectionRow:
          currentProjectDetails?.['section_a']?.[`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 2,
      },
      {
        sectionName: methodologies,
        subSectionRow:
          currentProjectDetails?.['section_a']?.[
            `step${subSectionIndex + 1}`
          ]?.['methodologies'],
        section: 1,
        subSection: 3,
      },
      {
        sectionName: A5,
        subSectionRow:
          currentProjectDetails['section_a'][`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 4,
      },
      {
        sectionName: A6,
        subSectionRow:
          currentProjectDetails['section_a'][`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 5,
      },
      {
        sectionName: A7,
        subSectionRow:
          currentProjectDetails['section_a'][`step${subSectionIndex + 1}`],
        section: 1,
        subSection: 6,
      },
      {
        sectionName: B1,
        subSectionRow:
          currentProjectDetails['section_b'][`step${subSectionIndex + 1}`],
        section: 2,
        subSection: 0,
      },
      {
        sectionName: B2,
        subSectionRow:
          currentProjectDetails['section_b'][`step${subSectionIndex + 1}`],
        section: 2,
        subSection: 1,
      },
      {
        sectionName: B3,
        subSectionRow:
          currentProjectDetails['section_b'][`step${subSectionIndex + 1}`],
        section: 2,
        subSection: 2,
      },
      {
        sectionName: C1,
        subSectionRow:
          currentProjectDetails['section_c'][`step${subSectionIndex + 1}`],
        section: 3,
        subSection: 0,
      },
      {
        sectionName: C2,
        subSectionRow:
          currentProjectDetails['section_c'][`step${subSectionIndex + 1}`],
        section: 3,
        subSection: 1,
      },
      {
        sectionName: D1,
        subSectionRow:
          currentProjectDetails['section_d'][`step${subSectionIndex + 1}`],
        section: 4,
        subSection: 0,
      },
      {
        sectionName: D2,
        subSectionRow:
          currentProjectDetails['section_d'][`step${subSectionIndex + 1}`],
        section: 4,
        subSection: 1,
      },
      {
        sectionName: D3,
        subSectionRow:
          currentProjectDetails['section_d'][`step${subSectionIndex + 1}`],
        section: 4,
        subSection: 2,
      },
      {
        sectionName: E1,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 0,
      },
      {
        sectionName: E2,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 1,
      },
      {
        sectionName: E3,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 2,
      },
      {
        sectionName: E4,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 3,
      },
      {
        sectionName: E5,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 4,
      },
      {
        sectionName: E6,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 5,
      },
      {
        sectionName: E7,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 6,
      },
      {
        sectionName: E8,
        subSectionRow:
          currentProjectDetails['section_e'][`step${subSectionIndex + 1}`],
        section: 5,
        subSection: 7,
      },
    ]
    let dataModified = false
    //filtering the params from data to pass to function
    const params = paramsData.filter((i: any) => {
      return i?.section === sectionIndex && i?.subSection === subSectionIndex
    })
    if (params.length) {
      dataModified = isDataModifiedCheckFunc(
        params[0].sectionName,
        params[0].subSectionRow,
        sectionIndex,
        subSectionIndex
      )
    }
    return dataModified
  }

  useEffect(() => {
    //kept no dependency to check the dat is modified and make blockRouting state to true or false
    handleDataCheck() ? setBlockRouting(true) : setBlockRouting(false)
  })
  //calling custom hook to block route if necessary and passing message and when param
  usePrompt('This page have unsaved data', blockRouting)

  const handleSubSectionClick = (index?: number) => {
    //will only check if issuer is clicking on other subsection
    if (index !== subSectionIndex) {
      const dataModified = handleDataCheck()
      if (dataModified) {
        setSubSectionIndexState(index)
        console.log('handleSubSectionClick')
        setModal(true)
      } else if (!dataModified) {
        dispatch(setSubSectionIndex(index))
      }
    }
  }

  const handleQuitWithoutSave = () => {
    setModal(false)
    if (sectionIndex === 5) {
      if (!changeInSection) {
        //from sectionE if PD moves to different sub-section without saving the data
        dispatch(setSubSectionIndex(subSectionIndexState))
      } else if (sectionIndexState === 4) {
        //from sectionE if PD moves to different section
        dispatch(setSubSectionIndex(0))
        dispatch(setSectionIndex(sectionIndexState))
      } else {
        //From sectionE if PD is clicking on next btn
        handleNextBtnFromSectionE()
      }
    } else {
      handleSectionIndexFromModal()
    }
  }

  const handleModalSave = () => {
    setModal(false)
    dispatch(setToMoveSectionIndex(true))
    handleSave()
  }

  const handleSectionIndexFromModal = () => {
    dispatch(setSubSectionIndex(subSectionIndexState))
    //ChangeInSection is to know whether the issuer has clicked on section level next or he clicked on subSection level
    if (changeInSection) {
      dispatch(setSectionIndex(sectionIndexState))
      setChangeInSection(false)
    }
    dispatch(setIsApiCallSuccess(false))
  }

  const renderTab = () => {
    const SelectedSubSectionComp =
      sectionATabs[sectionIndex][subSectionIndex]?.component
    return <SelectedSubSectionComp />
  }

  const disableSave = () => {
    if (sectionIndex === 0 && currentProjectDetails) {
      return true
    }
    return false
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
                  variant="contained"
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
                  disabled={disableSave()}
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
                    opacity: currentProjectDetails ? 1 : 0.5,
                    pointerEvents: currentProjectDetails ? 'all' : 'none',
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
                  color: '#1D4B44',
                  fontWeight: 500,
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
          <>
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
          </>
        </Paper>
      </Modal>
      {/*Modal 2*/}
      <Modal
        open={showMandatoryFieldModal}
        onClose={() => dispatch(setShowMandatoryFieldModal(false))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <>
          <Box
            sx={{ position: 'absolute', top: 50, right: 50 }}
            onClick={() => dispatch(setShowMandatoryFieldModal(false))}
          >
            <CloseIcon
              sx={{ color: '#FFFFFF', fontSize: 30, cursor: 'pointer' }}
            />
          </Box>
          <Paper
            sx={{
              px: 9,
              py: 5,
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 3,
              outline: 'none',
            }}
          >
            <Stack direction={'column'} alignItems="center">
              <Typography
                textAlign="center"
                sx={{ fontWeight: 500, fontSize: 19 }}
              >
                Please Enter All the Mandatory Fields
              </Typography>
              <CCButton
                onClick={() => {
                  dispatch(setShowMandatoryFieldModal(false))
                  //below line will make the triggered redux to false if the mandatory fields in sections so that the section or subsection wont' change when clicks on save from out of modal
                  toMoveSectionIndex && dispatch(setToMoveSectionIndex(false))
                }}
                sx={{
                  mt: 3,
                  minWidth: 0,
                  padding: '10px 26px',
                  fontSize: 19,
                  fontWeight: 500,
                }}
              >
                Ok
              </CCButton>
            </Stack>
          </Paper>
        </>
      </Modal>
      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 20,
        }}
      >
        <Paper
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: Colors.darkPrimary2,
            borderRadius: '16px',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={() => {
            navigate(pathNames.ISSUANCE_DATA_COLLECTION_HELP)
            changeOnHoverText()
          }}
        >
          <Box sx={{ display: 'flex', height: '100%' }}>
            <img src={Images.HelpIcon} width="24px" height={'24px'} />
          </Box>
          {show && (
            <Typography
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                marginBottom: '50px',

                color: Colors.black,
                backgroundColor: 'white',
                fontSize: 14,
                fontWeight: 400,
                width: '150px',
                borderRadius: '3px',
                textAlign: 'center',
                p: 3,
                mr: -2,
              }}
            >
              View Sample Report
            </Typography>
          )}
          <Typography
            sx={{
              ml: 1,
              color: Colors.lightPrimary1,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Help
          </Typography>
        </Paper>
      </Box>
    </>
  )
}

export default IssuanceDataCollection
