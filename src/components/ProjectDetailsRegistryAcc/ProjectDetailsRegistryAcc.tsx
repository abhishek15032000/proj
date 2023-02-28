import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { registryCalls } from '../../api/registry.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { ROLES } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getLocalItem } from '../../utils/Storage'
import TraceHistory from '../ProjectDetails/TraceHistory/TraceHistory'
import ProjectIntro from '../ProjectDetails/Skeleton/ProjectIntro'
import Reports from './Reports'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { verifierCalls } from '../../api/verifierCalls.api'
import Spinner from '../../atoms/Spinner'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { Colors } from '../../theme'
import WebAppTraceHistory from '../ProjectDetails/TraceHistory/WebappTraceHistory'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import ReportsTab from './ReportsTab'
import TraceabilityTab from './TraceabilityTab'
import TabSelectorWithCount from '../../atoms/TabSelectorWithCount/TabSelectorWithCount'
import ProjectIntroduction from '../ProjectDetails/ProjectIntoduction/ProjectIntroduction'
import { pathNames } from '../../routes/pathNames'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import CCButton from '../../atoms/CCButton'
import About from '../About'
import { projectDetailsCalls } from '../../api/projectDetailsCalls.api'
import { setRegistryProjectDetails } from '../../redux/Slices/registrySlice'

const ProjectDetailsRegistryAcc = () => {
  const location: any = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('projectId')

  // const projectData = useAppSelector(
  //   ({ registry }) => registry.projectData,
  //   shallowEqual
  // )

  const [loading, setLoading] = useState(false)
  // const [loadingReport, setLoadingReport] = useState(false)
  const [tabIndex, setTabIndex] = useState(1)
  const [projectData, setProjectData] = useState<any>(null)
  useEffect(() => {
    getProjectAllData(projectId)
  }, [searchParams])

  const getProjectAllData = (projectId: any) => {
    setLoading(true)
    dataCollectionCalls
      .getProjectById(projectId)
      .then((result) => {
        setProjectData(result.data)
        dispatch(setRegistryProjectDetails(result.data))
      })
      .catch((e) => e)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (projectData?.project_status === 6) {
      updateRegistryProjectStatus()
    }
    //registryReport
  }, [])

  useEffect(() => {
    const role = getLocalItem('loggedIn')?.roles[0]

    if (role === ROLES.REGISTRY) {
      if (projectData) {
        //setTitle(
        //  role === ROLES.REGISTRY && projectData?.company_name
        //)
        //setArea(role === ROLES.REGISTRY && projectData?.location)
        //setProjectDetails(role === ROLES.REGISTRY && projectData)
      }
    }
    //else if (role === ROLES.VERIFIER) {

    //  setLoading(true)

    //  dataCollectionCalls
    //    .getProjectById(location?.state?.project_uuid)
    //    .then((response) => {
    //      setProjectDetails(response.data)
    //      setTitle(response?.data?.company_name)
    //      setArea(response?.data?.location)
    //      setLoading(false)
    //    })
    //    .catch((e) => setLoading(false))

    //  // 'e8712a5e-3d13-4619-9bc7-930401044ebb'

    //  setLoadingReport(true)
    //  verifierCalls
    //    .getReportByProjectId(location?.state?.project_uuid)
    //    .then((response) => {
    //      let tempObj: any = []
    //      if (response?.data?.main_project?.report !== undefined) {
    //        tempObj = [response.data.main_project]
    //      }
    //      console.log('temp_obj_reports: ', tempObj)
    //      setProjectDetails(tempObj)
    //      setLoadingReport(false)
    //    })
    //    .catch((e) => setLoadingReport(false))
    //}
  }, [projectData])

  //TODO: will add it once original data is available
  //const pdfReady = async (pdfURL: any) => {
  //  const PDFFile = await fileUploadCalls.getFile(
  //    projectDetails?.project_pdf,
  //    getLocalItem('userDetails')?.jwtToken
  //  )
  //  const pdfObjectURL = URL.createObjectURL(PDFFile)

  //  setPdf(pdfObjectURL)
  //  setShowModal(true)
  //}

  const updateRegistryProjectStatus = async () => {
    try {
      const registryDetails = {
        ...getLocalItem('userDetails'),
        ...getLocalItem('userDetails2'),
      }
      const payload = {
        //take from local storage
        _id: projectData?._id,
        project_id: projectData?.verifier_details_id?.project_id,
        project_status: 7,
        registry_id: registryDetails?._id,
        registry_name: registryDetails?.fullName,
        registry_address: registryDetails?.address,
        registry_number: registryDetails?.phone.toString(),
      }
      console.log('payload of update registry: ', payload)
      const res = await registryCalls.registryUpdate(payload)
      console.log('res: ', res)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <>
      {loading ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: 450 }}
        >
          <Spinner />
        </Stack>
      ) : (
        <>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={'12px'}
            mb={5}
          >
            <Grid item>
              <BackHeader
                title="Project Details"
                onClick={() => navigate(-1)}
              />
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
                <ArrowOutwardIcon
                  sx={{ fontSize: 16, fontWeight: '600', mr: 1 }}
                />
                Climate Risk Dashboard
              </CCButton>
            </Grid>
          </Grid>
          {loading ? (
            <ProjectIntro />
          ) : (
            <ProjectIntroduction projectDetailsData={projectData} />
          )}
          <TabSelectorWithCount
            tabArray={[
              { name: 'About', count: 0 },
              { name: 'Reports Received', count: 0 },
              { name: 'Trace History', count: 0 },
            ]}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            sx={{ mt: 3 }}
            // tabWidth="fit-content"
          />
          {tabIndex === 1 && <About projectId={projectId} />}
          {tabIndex === 2 && <ReportsTab projectDetails={projectData} />}
          {tabIndex === 3 && <TraceabilityTab projectID={projectData?.uuid} />}
        </>
      )}
    </>
  )
}

export default ProjectDetailsRegistryAcc
