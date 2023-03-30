// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CreateIcon from '@mui/icons-material/Create'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Functional Imports
import moment from 'moment'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch } from 'react-redux'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import SliderTable from '../../atoms/SliderTable'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import TextButton from '../../atoms/TextButton/TextButton'
import NoData from '../../atoms/NoData/NoData'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import {
  addSectionPercentages,
  isProjectCompleted,
} from '../../utils/newProject.utils'
import {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
} from '../../redux/Slices/issuanceDataCollection'
import { pathNames } from '../../routes/pathNames'
import {
  setSectionIndex as setMonthlyReportSectionIndex,
  setSubSectionIndex,
  setMainProjectDetails,
} from '../../redux/Slices/MonthlyReportUpdate'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import CCTable from '../../atoms/CCTable'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { Colors, Images } from '../../theme'
import { setSectionIndex } from '../../redux/Slices/issuanceDataCollection'
import {
  setIssuerNewProjects,
  setIssuerRegisteredProjects,
  setIssueVerificationProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'
import { getTextAccordingToStatus } from '../../utils/commonFunctions'
import CCButton from '../../atoms/CCButton'

let index = 0
const headingsNew = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]
const headingsInVerification = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Verifier" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const headingsRegistered = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Verifier" />,
  <LimitedText
    key={index++}
    text="Next Date"
    tooltipText="Next Report Submission Dt"
  />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="" />,
]

interface ListOfProjectsDashboardProps {
  data?: any
  loading?: any
}

const ListOfProjectsDashboard: FC<ListOfProjectsDashboardProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cachedIssuerDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedIssuerDashboardProjects,
    shallowEqual
  )
  const issuerNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.issuerNewProjects,
    shallowEqual
  )
  const issuerRegisteredProjects = useAppSelector(
    ({ dashboard }) => dashboard.issuerRegisteredProjects,
    shallowEqual
  )

  const issuerVerificationProjects = useAppSelector(
    ({ dashboard }) => dashboard.issuerVerificationProjects,
    shallowEqual
  )
  const cachedNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedNewTabAllProjects,
    shallowEqual
  )

  const cachedVerificationTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedVerificationTabAllProjects,
    shallowEqual
  )

  const cachedRegisterTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegisterTabAllProjects,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(1)

  const openProjectDetails = (projectDetails: any, redirect: any) => {
    if (projectDetails) {
      // const percentageAddedData = addSectionPercentages(projectDetails)

      // dispatch(setCurrentProjectDetailsUUID(projectDetails?.uuid))
      // dispatch(setCurrentProjectDetails(projectDetails))

      if (redirect === 'Details') {
        navigate(
          {
            pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
            search: `?${createSearchParams({
              projectId: projectDetails?.uuid,
            })}`,
          },
          {
            state: {
              status: projectDetails?.project_status,
            },
          }
        )
      } else if (redirect === 'Monthly') {
        dispatch(setMonthlyReportSectionIndex(0))
        dispatch(setSubSectionIndex(0))
        dispatch(setMainProjectDetails(projectDetails))
        navigate(pathNames.MONTHLY_REPORT_UPDATE)
      } else if (redirect === 'Verify') {
        navigate(pathNames.SELECT_VERIFIER)
      }
    }
  }

  useEffect(() => {
    const newData: any = []

    cachedNewTabAllProjects &&
      cachedNewTabAllProjects.length &&
      cachedNewTabAllProjects.map((item: any, index: any) => {
        newData.push([
          // <ShortenedIDComp key={index} referenceId={item.uuid} />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item?.createdAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText text={item?.company_name} widthLimit="200px" />
          </Box>,

          <LimitedText key={index} text={item?.location} />,
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
            widthLimit="250px"
          />,
          item.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
            // isProjectCompleted(item) ? (
            //   <TextButton
            //     title="Select Verifier"
            //     onClick={() => openProjectDetails(item, 'Verify')}
            //   />
            // ) : (
            <CreateIcon
              sx={{ cursor: 'pointer' }}
              key="1"
              onClick={() => moveToSection(item)}
            />
          ) : item.completed ? (
            <CCButton
              onClick={() =>
                navigate(pathNames.SELECT_VERIFIER, {
                  state: { _id: item?._id },
                })
              }
              sx={{
                minWidth: 0,
                height: 40,
                width: 200,
                color: 'white',
                background: Colors.darkPrimary1,
                borderRadius: 10,
                '&:hover': {
                  background: 'white',
                  border: '1px solid black',
                  color: 'black',
                },
              }}
            >
              Select Verifier
            </CCButton>
          ) : (
            '-'
          ),
          <Box key="1">
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => openProjectDetails(item, 'Details')}
            />
          </Box>,
        ])
      })

    if (newData.length !== 0) {
      dispatch(setIssuerNewProjects(newData))
    } else {
      dispatch(setIssuerNewProjects(null))
    }
  }, [cachedNewTabAllProjects])

  useEffect(() => {
    const verificationData: any = []

    cachedVerificationTabAllProjects &&
      cachedVerificationTabAllProjects.length &&
      cachedVerificationTabAllProjects.map((item: any, index: any) => {
        verificationData.push([
          // <ShortenedIDComp key={index} referenceId={item.uuid} />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item?.createdAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText text={item?.company_name} widthLimit="200px" />
          </Box>,
          <LimitedText key={index} text={item?.location} />,
          item?.verifier_details_id?.verifier_id?.organisationName ? (
            <LimitedText
              text={item?.verifier_details_id?.verifier_id?.organisationName}
            />
          ) : (
            '-'
          ),
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
            widthLimit="250px"
          />,
          item.project_status ===
          PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
            <CCButton
              onClick={() => {
                navigate(
                  {
                    pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
                    search: `?${createSearchParams({
                      projectId: item?.uuid,
                    })}`,
                  },
                  {
                    state: {
                      status: 3,
                      projectDetailsTabIndex: 2,
                      //isEdited: true,
                    },
                  }
                )
              }}
              sx={{
                minWidth: 0,
                height: 40,
                width: 200,
                color: 'white',
                background: Colors.darkPrimary1,
                borderRadius: 10,
                '&:hover': {
                  background: 'white',
                  border: '1px solid black',
                  color: 'black',
                },
              }}
            >
              Finalise Verifier
            </CCButton>
          ) : (
            '-'
          ),
          <Box key="1">
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => openProjectDetails(item, 'Details')}
            />
          </Box>,
        ])
      })

    if (verificationData.length !== 0) {
      dispatch(setIssueVerificationProjects(verificationData))
    } else {
      dispatch(setIssueVerificationProjects(null))
    }
  }, [cachedVerificationTabAllProjects])

  useEffect(() => {
    const registeredData: any = []

    cachedRegisterTabAllProjects &&
      cachedRegisterTabAllProjects.length &&
      cachedRegisterTabAllProjects.map((item: any, index: any) => {
        registeredData.push([
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            {' '}
            <LimitedText
              key={index}
              text={item.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item.createdAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => openProjectDetails(item, 'Details')}
          >
            <LimitedText
              key={index}
              text={item.company_name}
              widthLimit="200px"
            />
          </Box>,
          <LimitedText key={index} text={item.location} />,
          item?.verifier_details_id?.verifier_id?.organisationName ? (
            <LimitedText
              text={item?.verifier_details_id?.verifier_id?.organisationName}
            />
          ) : (
            '-'
          ),
          <LimitedText
            key={index}
            text={moment(item.report?.next_date).format('DD/MM/YYYY')}
          />,
          // item.project_status ===
          // PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY ? (
          //   <TextButton
          //     key="1"
          //     title="Add Monthly Data"
          //     onClick={() => openProjectDetails(item, 'Monthly')}
          //   />
          // ) : (
          //   '-'
          // ),
          <LimitedText
            key={index}
            text={getTextAccordingToStatus(item?.project_status)}
            widthLimit="250px"
          />,
          <Box
            key="1"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ChevronRightIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => openProjectDetails(item, 'Details')}
            />
          </Box>,
        ])
      })

    if (registeredData.length !== 0) {
      dispatch(setIssuerRegisteredProjects(registeredData))
    } else {
      dispatch(setIssuerRegisteredProjects(null))
    }
  }, [cachedRegisterTabAllProjects])

  const moveToSection = (projectDetails: any) => {
    if (projectDetails) {
      navigate(
        {
          pathname: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
          search: `?${createSearchParams({
            projectId: projectDetails?.uuid,
          })}`,
        },
        {
          state: {
            isEdited: true,
          },
        }
      )
    }
  }

  return (
    <>
      <TabSelector
        tabArray={['New', 'In Verification', 'Registered']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {props?.loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : tabIndex === 1 ? (
        issuerNewProjects && issuerNewProjects.length ? (
          <CCTable
            headings={headingsNew}
            rows={issuerNewProjects}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            hideScrollbar
            pagination
            rowsPerPageProp={5}
            stickyLastCol
            stickySecondLastCol
          />
        ) : (
          <NoData title="No new projects available" />
        )
      ) : tabIndex === 2 ? (
        issuerVerificationProjects && issuerVerificationProjects.length ? (
          <CCTable
            headings={headingsInVerification}
            rows={issuerVerificationProjects}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            hideScrollbar
            pagination
            rowsPerPageProp={5}
            stickyLastCol
          />
        ) : (
          <NoData title="No verification projects available" />
        )
      ) : issuerRegisteredProjects && issuerRegisteredProjects.length ? (
        <CCTable
          headings={headingsRegistered}
          rows={issuerRegisteredProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
          stickyLastCol
        />
      ) : (
        <NoData title="No registered projects available" />
      )}
    </>
  )
}

export default ListOfProjectsDashboard
