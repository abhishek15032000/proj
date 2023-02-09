import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { registryCalls } from '../../api/registry.api'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { ROLES } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getLocalItem } from '../../utils/Storage'
import TraceHistory from '../ProjectDetails/TraceHistory/TraceHistory'
import ProjectIntro from './ProjectIntro'
import Reports from './Reports'
import { useLocation, useNavigate } from 'react-router-dom'
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

const ProjectDetailsRegistryAcc = () => {
  const location: any = useLocation()
  const navigate = useNavigate()

  const projectDetails = location?.state?.projectDetails

  const registryProjectDetails = useAppSelector(
    ({ registry }) => registry.registryProjectDetails,
    shallowEqual
  )

  // const [title, setTitle] = useState<string>()
  // const [area, setArea] = useState<string>()
  const [loading, setLoading] = useState(false)
  // const [loadingReport, setLoadingReport] = useState(false)
  const [tabIndex, setTabIndex] = useState(1)

  useEffect(() => {
    if (registryProjectDetails?.project_status === 6) {
      updateRegistryProjectStatus()
    }
    //registryReport
  }, [])

  useEffect(() => {
    const role = getLocalItem('loggedIn')?.roles[0]

    if (role === ROLES.REGISTRY) {
      if (registryProjectDetails) {
        //setTitle(
        //  role === ROLES.REGISTRY && registryProjectDetails?.company_name
        //)
        //setArea(role === ROLES.REGISTRY && registryProjectDetails?.location)
        //setProjectDetails(role === ROLES.REGISTRY && registryProjectDetails)
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
  }, [registryProjectDetails])

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
        _id: registryProjectDetails?._id,
        project_id: registryProjectDetails?.verifier_details_id?.project_id,
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
  console.log('registryReport: ', registryProjectDetails)
  console.log('projectDetails', projectDetails)

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
          <Grid item  mb={5}>
            <BackHeader title="Project Details" onClick={() => navigate(-1)} />
          </Grid>
          <ProjectIntroduction
          projectDetailsData={projectDetails}
            // title={projectDetails?.company_name}
            // location={projectDetails?.location}
          />

          <TabSelectorWithCount
            tabArray={[
              { name: 'Reports Received', count: 0 },
              { name: 'Trace History', count: 0 },
            ]}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            sx={{ mt: 3 }}
            // tabWidth="fit-content"
          />

          {tabIndex === 1 && <ReportsTab projectDetails={projectDetails} />}
          {tabIndex === 2 && (
            <TraceabilityTab projectID={projectDetails?.uuid} />
          )}
        </>
      )}
    </>
  )
}

export default ProjectDetailsRegistryAcc
