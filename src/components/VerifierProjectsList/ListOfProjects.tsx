// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

// Functional Imports
import moment from 'moment'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import TabSelectorVerifier from './TabSelectorVerifier'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import { verifierCalls } from '../../api/verifierCalls.api'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import NoData from '../../atoms/NoData/NoData'
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'
import { getLocalItem } from '../../utils/Storage'
import TabSelector from '../../atoms/TabSelector/TabSelector'

const headingsNew = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Status',
  'Action',
  '',
]

const headingsRegistered = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Next Submission Dt',
  'Status',
  'Action',
  '',
]

interface ListOfProjectsProps {
  data?: any
  loading?: any
  updateStatus?: any
}

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const navigate = useNavigate()

  const [tabIndex, setTabIndex] = useState(1)
  const [rowsNew, setRowsNew]: any = useState([{}])
  const [rowsRegistered, setRowsRegistered]: any = useState([{}])
  const [newRequests, setNewRequests] = useState(0)

  useEffect(() => {
    verifierState()
  }, [newRequests])

  const verifierState = () => {
    verifierCalls
      .getVerifierProjectDashboardStats(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        setNewRequests(response.data?.new_requests)
      })
  }
  useEffect(() => {
    const newData: any = [],
      registeredData: any = []

    props.data.map((item: any, index: any) => {
      if (
        item.project_status === 1 ||
        item.project_status === 2 ||
        item.project_status === 5 ||
        item.project_status === 6
      ) {
        newData.push([
          <ShortenedIDComp key={index} referenceId={item?.project_id?.uuid} />,
          moment(item.createdAt).format('DD/MM/YYYY'),
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WorkOutlineIcon />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                ml: 1,
              }}
            >
              {item.project_id.company_name}
            </Typography>
          </Box>,
          item.verifier_name,
          item.verifier_address,
          item.project_status === 1 ? (
            <ApprovalChip key={index} variant={'Pending'} />
          ) : item.project_status === 2 ? (
            <ApprovalChip key={index} variant={'Approved'} />
          ) : (
            <ApprovalChip key={index} variant={'Rejected'} />
          ),
          item.project_status === 1 ? (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <TextButton sx={{ width: '90px' }} title="Approve" /> */}
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Colors.textColorDarkGreen,
                  ml: 2,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  props.updateStatus(2, item)
                  verifierState()
                }}
              >
                Approve
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Colors.textColorBrightRed2,
                  ml: 2,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  props.updateStatus(6, item)
                  verifierState()
                }}
              >
                Reject
              </Typography>
            </Box>
          ) : (
            '-'
          ),
          (item.project_status === 1 || item.project_status === 2) && (
            <ChevronRightIcon
              key={index}
              onClick={() => {
                navigate(pathNames.VERIFIER_PROJECTS_DETAILS, {
                  state: { project_uuid: item.project_id.uuid },
                })
              }}
            />
          ),
        ])
      }

      if (item.project_status === 3 || item.project_status === 4) {
        registeredData.push([
          <ShortenedIDComp key={index} referenceId={item?.project_id?.uuid} />,
          moment(item.createdAt).format('DD/MM/YYYY'),
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WorkOutlineIcon />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                ml: 1,
              }}
            >
              {item.project_id.company_name}
            </Typography>
          </Box>,
          item.verifier_name,
          item.verifier_address,
          moment(item.createdAt).format('DD/MM/YYYY'),
          item.project_status === 3 ? (
            <ApprovalChip key={index} variant={'Pending'} />
          ) : (
            <ApprovalChip key={index} variant={'Verified'} />
          ),
          item.project_status === 3 ? (
            <TextButton
              key={index}
              sx={{ width: '90px' }}
              onClick={() =>
                navigate(pathNames.VERIFIER_VERIFY_REPORT, {
                  state: {
                    project: item?.project_id,
                    pdf: item?.project_id?.project_pdf,
                  },
                })
              }
              title="Verify"
            />
          ) : (
            '-'
          ),
          <ChevronRightIcon
            sx={{ cursor: 'pointer' }}
            key={index}
            onClick={() =>
              navigate(pathNames.VERIFIER_PROJECTS_DETAILS, {
                state: { project_uuid: item.project_id.uuid },
              })
            }
          />,
        ])
      }
    })

    if (newData.length !== 0) {
      setRowsNew(newData)
    } else {
      setRowsNew([{}])
    }

    if (registeredData.length !== 0) {
      setRowsRegistered(registeredData)
    } else {
      setRowsRegistered([{}])
    }
  }, [props])

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 2,
        p: 2,
      }}
    >
      {newRequests === 0 && (
        <TabSelector
          sx={{ marginTop: 0 }}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabArray={['New', 'Registered']}
        />
      )}

      {newRequests > 0 && (
        <TabSelectorVerifier
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          newProjects={newRequests}
        />
      )}
      {props.loading && <CCTableSkeleton sx={{ mt: 2 }} height={60} />}

      {!props.loading &&
        ((tabIndex === 2 && Object.keys(rowsRegistered[0]).length > 0) ||
          (tabIndex === 1 && Object.keys(rowsNew[0]).length > 0)) && (
          <CCTable
            headings={tabIndex === 1 ? headingsNew : headingsRegistered}
            rows={tabIndex === 1 ? rowsNew : rowsRegistered}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            pagination
          />
        )}

      {!props.loading &&
        Object.keys(rowsNew[0]).length === 0 &&
        tabIndex === 1 && <NoData title="No new projects available" />}

      {!props.loading &&
        Object.keys(rowsRegistered[0]).length === 0 &&
        tabIndex === 2 && <NoData title="No registered projects available" />}
    </Paper>
  )
}

export default ListOfProjects
