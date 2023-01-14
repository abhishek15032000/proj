// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

// Functional Imports
import moment from 'moment'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProjectsProps } from './VerifierProjects.interface'
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
import { PROJECT_ALL_STATUS } from '../../config/constants.config'

interface ListOfProjectsProps {
  data?: any
  loading?: any
  updateStatus?: any
}

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

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const navigate = useNavigate()

  const [tabIndex, setTabIndex] = useState(1)
  const [rowsRegistered, setRowsRegistered]: any = useState([{}])
  const [rowsNew, setRowsNew]: any = useState([{}])
  const [newRequests, setNewRequests] = useState(0)

  useEffect(() => {
    verifierCalls
      .getVerifierProjectDashboardStats(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        setNewRequests(response.data?.new_requests)
      })
  }, [])

  useEffect(() => {
    const newData: any = [],
      registeredData: any = []

    props.data.map((item: any, index: any) => {
      if (
        item?.project_status ===
          PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
        item?.project_status ===
          PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ||
        item?.project_status === PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER ||
        item?.project_status === PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
      ) {
        newData.push([
          <ShortenedIDComp key={index} referenceId={item?.project_id?.uuid} />,
          moment(item?.createdAt).format('DD/MM/YYYY'),
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
              {item?.project_id?.company_name}
            </Typography>
          </Box>,
          item?.verifier_name,
          item?.verifier_address,
          item?.project_status ===
          PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
            <ApprovalChip key={index} variant={'Pending'} />
          ) : item?.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
            <ApprovalChip key={index} variant={'Approved'} />
          ) : (
            <ApprovalChip key={index} variant={'Rejected'} />
          ),
          item?.project_status ===
          PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ? (
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
                onClick={() =>
                  props.updateStatus(
                    PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
                    item
                  )
                }
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
                onClick={() =>
                  props.updateStatus(
                    PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER,
                    item
                  )
                }
              >
                Reject
              </Typography>
            </Box>
          ) : (
            '-'
          ),
          (item?.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
            item?.project_status ===
              PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT) && (
            <ChevronRightIcon
              key={index}
              onClick={() => {
                navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC, {
                  state: { project_uuid: item?.project_id.uuid },
                })
                //navigate(pathNames.VERIFIER_PROJECTS_DETAILS, {
                //  state: { project_uuid: item?.project_id.uuid },
                //})
              }}
            />
          ),
        ])
      }

      if (
        item?.project_status ===
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
        item?.project_status ===
          PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
      ) {
        registeredData.push([
          <ShortenedIDComp key={index} referenceId={item?.project_id?.uuid} />,
          moment(item?.createdAt).format('DD/MM/YYYY'),
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
              {item?.project_id?.company_name}
            </Typography>
          </Box>,
          item?.verifier_name,
          item?.verifier_address,
          moment(item?.createdAt).format('DD/MM/YYYY'),
          item?.project_status ===
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
            <ApprovalChip key={index} variant={'Pending'} />
          ) : (
            <ApprovalChip key={index} variant={'Verified'} />
          ),
          item?.project_status ===
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ? (
            <TextButton
              key={index}
              sx={{ width: '90px' }}
              onClick={() =>
                navigate(pathNames.REVIEW_AND_COMMENT, {
                  state: {
                    project: item?.project_id,
                    pdf: item?.project_id?.project_pdf,
                    veriferName: item?.verifier_name,
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
            onClick={
              () =>
                navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC, {
                  state: { project_uuid: item?.project_id.uuid },
                })
              //navigate(pathNames.VERIFIER_PROJECTS_DETAILS, {
              //  state: { project_uuid: item?.project_id.uuid },
              //})
            }
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
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 4,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          pr: 1,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: Colors.accent,
            cursor: 'pointer',
          }}
          onClick={() => navigate(pathNames.VERIFIER_PROJECTS_LIST)}
        >
          See All
        </Typography>
      </Box>

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

      {props.loading && <CCTableSkeleton sx={{ mt: 2 }} height={40} />}

      {!props.loading &&
        ((tabIndex === 2 && Object.keys(rowsRegistered[0]).length > 0) ||
          (tabIndex === 1 && Object.keys(rowsNew[0]).length > 0)) && (
          <CCTable
            headings={tabIndex === 1 ? headingsNew : headingsRegistered}
            rows={tabIndex === 1 ? rowsNew : rowsRegistered}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
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
