// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CreateIcon from '@mui/icons-material/Create'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Functional Imports
import moment from 'moment'

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
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/MonthlyReportUpdate'
import ReferenceIdTd from './ReferenceIdTd'

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
        navigate(pathNames.MONTHLY_REPORT_UPDATE)
      }
    }
  }

  useEffect(() => {
    const newData: any = [],
      registeredData: any = []

    props.data.map((item: any, index: any) => {
      if (
        item.project_status === 0 ||
        item.project_status === 1 ||
        item.project_status === 2
      ) {
        newData.push([
          <ReferenceIdTd key={index} referenceId={item.uuid} />,
          moment(item.createdAt).format('DD/MM/YYYY'),
          item.company_name,
          item.location,
          item.project_status === 0 ? (
            <ApprovalChip variant="Yet to Select" key={index} />
          ) : item.project_status === 1 ? (
            <ApprovalChip variant="Selected" key={index} />
          ) : item.project_status === 2 ? (
            <ApprovalChip variant="Selected" key={index} />
          ) : (
            item.project_status === 3 && (
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
          item.project_status === 0 ? (
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

      if (item.project_status === 3 || item.project_status === 4) {
        registeredData.push([
          <ReferenceIdTd key={index} referenceId={item.uuid} />,
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
            variant={item.project_status === 3 ? 'In progress' : 'Verified'}
            key={'1'}
          />,
          moment(item.report?.next_date).format('DD/MM/YYYY'),
          item.project_status === 4 ? (
            <TextButton
              key="1"
              title="Add Monthly Data"
              onClick={() => openProjectDetails(item, 'Monthly')}
            />
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
