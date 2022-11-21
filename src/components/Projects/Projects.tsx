import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProjectsStats from '../ProjectStats/ProjectsStats'
import ProjectsTab from './ProjectsTab'
import ProfileCompletion from './ProfileCompletion'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButton from '../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setCurrentProjectDetails,
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import OnBoardingIssuer from '../OnBoardingIssuer/OnBoardingIssuer'
import LoaderOverlay from '../LoderOverlay'
import { resetSectionNewProjectDetails } from '../../redux/Slices/newProjectSlice'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'

const Projects = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [showDashboard, setShowDashboard] = useState<boolean>(false)
  const [loader, setloader] = useState<boolean>(true)

  const setMetamask = useAppSelector(({ wallet }) => wallet.haveMetamask)
  const isConnected = useAppSelector(({ wallet }) => wallet.isConnected)
  const walletAdded = useAppSelector(({ wallet }) => wallet.walletAdded)

  useEffect(() => {
    const shineKey = getLocalItem('userDetails2')?.shineKey
    setMetamask && isConnected && walletAdded
      ? setShowDashboard(true)
      : setShowDashboard(false)
  }, [setMetamask, isConnected, walletAdded])

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 200)
  }, [showDashboard])

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
          <Typography sx={{ color: Colors.error, mb: 1 }}>
            {!isConnected &&
              'Metamask not connected. Please Connect Metamask before proceeding!!!'}
          </Typography>
          {isConnected && (
            <Typography
              sx={{ color: Colors.tertiary, fontSize: 28, fontWeight: 400 }}
            >
              Dashboard
            </Typography>
          )}
          <Grid container>
            <Grid item md={12} sm={12} lg={9} sx={{ pr: 2 }}>
              {!showDashboard ? (
                <OnBoardingIssuer />
              ) : (
                <>
                  <ProjectsStats />
                  <ProjectsTab />
                </>
              )}
            </Grid>
            <Grid item lg={3} sx={{ paddingLeft: 1 }}>
              {showDashboard && (
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
              <ProfileCompletion />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}
export default Projects
