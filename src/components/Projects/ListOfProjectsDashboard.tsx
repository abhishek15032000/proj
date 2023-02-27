// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CreateIcon from '@mui/icons-material/Create'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Functional Imports
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
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
import { Images } from '../../theme'
import { setSectionIndex } from '../../redux/Slices/issuanceDataCollection'
import {
  setIssuerNewProjects,
  setIssuerRegisteredProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'

let index = 0
const headingsNew = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Verifier Status" />,
  <LimitedText key={index++} text="Verifier" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const headingsRegistered = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Creation Dt" />,
  <LimitedText key={index++} text="Project Name" widthLimit="200px" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Verifier" />,
  <LimitedText key={index++} text="Report Status" />,
  <LimitedText
    key={index++}
    text="Next Date"
    tooltipText="Next Report Submission Dt"
  />,
  <LimitedText key={index++} text="Action" />,
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

  const [tabIndex, setTabIndex] = useState(1)

  const openProjectDetails = (projectDetails: any, redirect: any) => {
    if (projectDetails) {
      const percentageAddedData = addSectionPercentages(projectDetails)

      dispatch(setCurrentProjectDetailsUUID(projectDetails?.uuid))
      dispatch(setCurrentProjectDetails(percentageAddedData))

      if (redirect === 'Details') {
        navigate(pathNames.PROFILE_DETAILS_ISSUANCE_INFO, {
          state: {
            status: projectDetails?.project_status,
          },
        })
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
    const newData: any = [],
      registeredData: any = []

    cachedIssuerDashboardProjects &&
      cachedIssuerDashboardProjects.length &&
      cachedIssuerDashboardProjects.map((item: any, index: any) => {
        if (
          item.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ||
          item.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
          item.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT
        ) {
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
            item?.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
              <ApprovalChip variant="Yet to Select" key={index} />
            ) : item?.project_status ===
              PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
              <ApprovalChip variant="Selected" key={index} />
            ) : item?.project_status ===
              PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
              <ApprovalChip variant="Selected" key={index} />
            ) : (
              item?.project_status ===
                PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT && (
                <ApprovalChip variant="Finalised" key={index} />
              )
            ),
            item?.verifier_details_id ? (
              <Box
                key={'1'}
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <WorkOutlineIcon />
                <Typography sx={{ fontSize: 14, fontWeight: 400, ml: 1 }}>
                  {item.verifier_details_id?.verifier_name}
                </Typography>
              </Box>
            ) : (
              '-'
            ),
            item.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
              isProjectCompleted(item) ? (
                <TextButton
                  title="Select Verifier"
                  onClick={() => openProjectDetails(item, 'Verify')}
                />
              ) : (
                <CreateIcon
                  sx={{ cursor: 'pointer' }}
                  key="1"
                  onClick={() => moveToSection(item)}
                />
              )
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
        }

        if (
          [
            PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
            PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
            PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY,
            PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
          ].includes(item.project_status)
        ) {
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
            item.verifier_details_id ? (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: '5px',
                }}
              >
                {/* <Box
                sx={{
                  bgcolor: '#F0FFFB',
                  width: 40,
                  height: 40,
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img height={24} width={24} src={Images.BriefcaseIcon} />
              </Box> */}
                <LimitedText text={item?.verifier_details_id?.verifier_name} />
              </Box>
            ) : (
              '-'
            ),
            <ApprovalChip
              variant={
                item.project_status ===
                PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                  ? 'In progress'
                  : 'Verified'
              }
              key={'1'}
            />,
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
            '-',
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
        }
      })

    if (newData.length !== 0) {
      dispatch(setIssuerNewProjects(newData))
    } else {
      dispatch(setIssuerNewProjects(null))
    }

    if (registeredData.length !== 0) {
      dispatch(setIssuerRegisteredProjects(registeredData))
    } else {
      dispatch(setIssuerRegisteredProjects(null))
    }
  }, [cachedIssuerDashboardProjects])

  const moveToSection = (projectDetails: any) => {
    if (projectDetails) {
      const percentageAddedData = addSectionPercentages(projectDetails)
      dispatch(setCurrentProjectDetailsUUID(projectDetails?.uuid))
      dispatch(setCurrentProjectDetails(percentageAddedData))

      //Redirect to Section A (To continue editing/filling data )
      dispatch(setSectionIndex(1))
      navigate(pathNames.ISSUANCE_DATA_COLLECTION)
    }
  }

  return (
    <>
      <TabSelector
        tabArray={['New', 'Registered']}
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
          stickySecondLastCol
        />
      ) : (
        <NoData title="No registered projects available" />
      )}
    </>
  )
}

export default ListOfProjectsDashboard
