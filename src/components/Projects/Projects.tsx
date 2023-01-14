import AddIcon from '@mui/icons-material/Add'
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { USER } from '../../api/user.api'
import CCButton from '../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setCurrentProjectDetails,
  setSectionIndex,
  setShowPopUp,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { resetSectionNewProjectDetails } from '../../redux/Slices/newProjectSlice'
import {
  setProfileComplete,
  setProfilePercentage,
  setUserDetails,
} from '../../redux/Slices/profileCompletionSlice'
import { pathNames } from '../../routes/pathNames'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import HelpPopUp from '../Appbar/NavBar/Help/HelpPopUp'
import { DashboardHelpSectionFAQ } from '../Appbar/NavBar/Help/SectionA/helpContentData'
import LoaderOverlay from '../LoderOverlay'
import OnBoardingIssuer from '../OnBoardingIssuer/OnBoardingIssuer'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import ProfileCompletion from './ProfileCompletion'
import ProjectsTab from './ProjectsTab'

const Projects = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showPopUp = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  // const [showDashboard, setShowDashboard] = useState<boolean>(false)
  // const [loader, setloader] = useState<boolean>(true)
  const [loader, setloader] = useState<boolean>(false)

  // const setMetamask = useAppSelector(({ wallet }) => wallet.haveMetamask)
  // const isConnected = useAppSelector(({ wallet }) => wallet.isConnected)
  // const walletAdded = useAppSelector(({ wallet }) => wallet.walletAdded)

  // useEffect(() => {
  //   const shineKey = getLocalItem('userDetails2')?.shineKey
  //   setMetamask && isConnected && walletAdded
  //     ? setShowDashboard(true)
  //     : setShowDashboard(false)
  // }, [setMetamask, isConnected, walletAdded])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setloader(false)
  //   }, 200)
  // }, [showDashboard])

  const userDetails = useAppSelector(
    ({ profileCompletion }) => profileCompletion.userDetails,
    shallowEqual
  )
  const profileComplete = useAppSelector(
    ({ profileCompletion }) => profileCompletion.profileComplete,
    shallowEqual
  )

  useEffect(() => {
    getUserDetails()
  }, [])

  useEffect(() => {
    checkProfileComplete()
  }, [userDetails])

  const getUserDetails = async () => {
    const uuid = getLocalItem('userDetails')?.uuid

    dispatch(setProfileComplete(true))
    dispatch(setProfilePercentage(0))

    try {
      const userRes = await USER.getUserInfo(uuid)
      if (userRes?.data?.success) {
        dispatch(setUserDetails(userRes?.data?.data))
      }
    } catch (err) {
      console.log('Error in USER.getUserInfo api ~ ', err)
    }
  }

  const checkProfileComplete = () => {
    let count = 0
    const values = [
      userDetails?.fullName,
      userDetails?.email,
      userDetails?.phone,
      userDetails?.organisationName,
      userDetails?.address,
    ]
    values.forEach((value) => {
      if (value) {
        count += 1
      }
    })
    const percent = Math.round((count / values.length) * 100)
    dispatch(setProfilePercentage(percent))
    if (percent === 100) {
      dispatch(setProfileComplete(true))
    } else {
      dispatch(setProfileComplete(false))
    }
  }

  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }
  //useEffect(()=>{return resetSectionNewProjectDetails},[])
  const listNewProject = () => {
    // dispatch(resetSectionNewProjectDetails())
    dispatch(setCurrentProjectDetails(null))
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
  }

  return (
    <>
      {loader ? (
        <LoaderOverlay />
      ) : (
        <>
          {/* <Typography sx={{ color: Colors.error, mb: 1 }}>
        {!isConnected &&
          'Metamask not connected. Please Connect Metamask before proceeding!!!'}
      </Typography> */}
          {/* {isConnected && ( */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ color: Colors.tertiary, fontSize: 28, fontWeight: 400 }}
            >
              Dashboard
            </Typography>
            {profileComplete && (
              <CCButton
                variant="contained"
                sx={{
                  backgroundColor: '#F3BA4D',
                  textTransform: 'none',
                  width: '260px',
                  borderRadius: '100px',
                  marginBottom: 4,
                  marginTop: 3,
                  padding: '10px 24px 10px 16px',
                }}
                startIcon={<AddIcon style={{ color: '#005046' }} />}
                onClick={listNewProject}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}
                >
                  List New Project
                </Typography>
              </CCButton>
            )}
          </Box>
          {/* )} */}
          <Grid container>
            <Grid item md={profileComplete ? 12 : 9}>
              <Grid container>
                <Grid item md={12} sm={12} sx={{ pr: 2 }}>
                  {!profileComplete ? <OnBoardingIssuer /> : null}
                  <ProjectsStats />
                  <ProjectsTab />
                  {/* </>
              )} */}
                </Grid>
                <HelpPopUp
                  modal={showPopUp}
                  setModal={(item: any) => setModal(item)}
                  data={DashboardHelpSectionFAQ}
                  dashboardVisible={true}
                />
              </Grid>
            </Grid>
            {!profileComplete ? (
              <Grid item md={3}>
                <ProfileCompletion />
              </Grid>
            ) : null}
          </Grid>
        </>
      )}
    </>
  )
}
export default Projects
