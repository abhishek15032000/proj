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
import { useDispatch } from 'react-redux'

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
  setSectionIndex,
  setSubSectionIndex,
  setMainProjectDetails,
} from '../../redux/Slices/MonthlyReportUpdate'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'

const headingsNew = [
  'Reference ID',
  'Creation Dt',
  'Project Name',
  'Location',
  'Verifier Status',
  'Verifier',
  'Action',
  '',
]

const headingsRegistered = [
  'Reference ID',
  'Creation Dt',
  'Project Name',
  'Location',
  'Verifier',
  'Report Status',
  'Next Report Submission Dt',
  'Action',
  '',
]

interface ListOfProjectsDashboardProps {
  data?: any
  loading?: any
}

const ListOfProjectsDashboard: FC<ListOfProjectsDashboardProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tabIndex, setTabIndex] = useState(1)
  const [rowsNew, setRowsNew]: any = useState([{}])
  const [rowsRegistered, setRowsRegistered]: any = useState([{}])

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
        dispatch(setSectionIndex(0))
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

    props.data.map((item: any, index: any) => {
      if (
        item.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ||
        item.project_status ===
          PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
        item.project_status === PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT
      ) {
        newData.push([
          <ShortenedIDComp key={index} referenceId={item.uuid} />,
          moment(item.createdAt).format('DD/MM/YYYY'),
          item.company_name,
          item.location,
          item.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
            <ApprovalChip variant="Yet to Select" key={index} />
          ) : item.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
            <ApprovalChip variant="Selected" key={index} />
          ) : item.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
            <ApprovalChip variant="Selected" key={index} />
          ) : (
            item.project_status ===
              PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT && (
              <ApprovalChip variant="Finalised" key={index} />
            )
          ),
          item.verifier_details_id ? (
            <Box
              key={'1'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
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
                onClick={() => openProjectDetails(item, 'Details')}
              />
            )
          ) : (
            '-'
          ),
          <ChevronRightIcon
            sx={{ cursor: 'pointer' }}
            key="1"
            onClick={() => openProjectDetails(item, 'Details')}
          />,
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
          <ShortenedIDComp key={index} referenceId={item.uuid} />,
          moment(item.createdAt).format('DD/MM/YYYY'),
          item.company_name,
          item.location,
          item.verifier_details_id ? (
            <Box
              key={'1'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
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
          <ApprovalChip
            variant={
              item.project_status ===
              PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT
                ? 'In progress'
                : 'Verified'
            }
            key={'1'}
          />,
          moment(item.report?.next_date).format('DD/MM/YYYY'),
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
          <ChevronRightIcon
            sx={{ cursor: 'pointer' }}
            key="1"
            onClick={() => openProjectDetails(item, 'Details')}
          />,
        ])
      }
    })

    if (newData.length !== 0) {
      setRowsNew(newData.slice(0, 6))
    } else {
      setRowsNew([{}])
    }

    if (registeredData.length !== 0) {
      setRowsRegistered(registeredData.slice(0, 6))
    } else {
      setRowsRegistered([{}])
    }
  }, [props])

  return (
    <>
      <TabSelector
        tabArray={['New', 'Registered']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {props.loading && <CCTableSkeleton sx={{ mt: 2 }} height={40} />}

      {!props.loading &&
        ((tabIndex === 2 && Object.keys(rowsRegistered[0]).length > 0) ||
          (tabIndex === 1 && Object.keys(rowsNew[0]).length > 0)) && (
          <SliderTable
            headings={tabIndex === 1 ? headingsNew : headingsRegistered}
            rows={tabIndex === 1 ? rowsNew : rowsRegistered}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tileHeight={'105px'}
            tableSx={{ minWidth: 100 }}
          />
        )}

      {!props.loading &&
        Object.keys(rowsNew[0]).length === 0 &&
        tabIndex === 1 && <NoData title="No new projects available" />}

      {!props.loading &&
        Object.keys(rowsRegistered[0]).length === 0 &&
        tabIndex === 2 && <NoData title="No registered projects available" />}
    </>
  )
}

export default ListOfProjectsDashboard
