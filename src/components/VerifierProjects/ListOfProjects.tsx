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
import { Colors, Images } from '../../theme'
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
import LimitedText from '../../atoms/LimitedText/LimitedText'

interface ListOfProjectsProps {
  data?: any
  loading?: any
  updateStatus?: any
}

let index = 0
const headingsNew = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Issuer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]

const headingsRegistered = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Issuer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText
    key={index++}
    text="Next Date"
    tooltipText="Next Report Submission Dt"
  />,
  <LimitedText key={index++} text="Status" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
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
          // <ShortenedIDComp key={index} referenceId={item?.project_id?.uuid} />,
          <Box
            key={index}
            sx={{
              color: '#0068C6',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => {
              if (
                item?.project_status ===
                  PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
                item?.project_status ===
                  PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT
              ) {
                redirectToProjectDetails(item)
              }
            }}
          >
            <LimitedText
              key={index}
              text={item?.project_id?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item?.createdAt).format('DD/MM/YYYY')}
          />,
          <LimitedText
            key={index}
            text={moment(item?.updatedAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
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
            <LimitedText key={index} text={item?.project_id?.name} />
          </Box>,
          <Box
            key={index}
            sx={{
              color: '#0068C6',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => {
              if (
                item?.project_status ===
                  PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
                item?.project_status ===
                  PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT
              ) {
                redirectToProjectDetails(item)
              }
            }}
          >
            <LimitedText text={item?.project_id?.company_name} />
          </Box>,
          <LimitedText key={index} text={item?.project_id?.location} />,
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
                onClick={() => props.updateStatus(10, item)}
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
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                redirectToProjectDetails(item)
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
          // <ShortenedIDComp key={index} referenceId={item?.project_id?.uuid} />,
          <Box
            key={index}
            sx={{
              color: '#0068C6',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => redirectToProjectDetails(item)}
          >
            <LimitedText
              key={index}
              text={item?.project_id?.uuid}
              widthLimit={'100px'}
              ellispsisAtStart
            />
          </Box>,
          <LimitedText
            key={index}
            text={moment(item?.createdAt).format('DD/MM/YYYY')}
          />,
          <LimitedText
            key={index}
            text={moment(item?.updatedAt).format('DD/MM/YYYY')}
          />,
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
            <LimitedText key={index} text={item?.project_id?.name} />
          </Box>,
          <Box
            key={index}
            sx={{
              color: '#0068C6',
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => redirectToProjectDetails(item)}
          >
            <LimitedText
              key={index}
              text={item?.project_id?.company_name}
              widthLimit="200px"
            />
          </Box>,
          <LimitedText key={index} text={item?.project_id?.location} />,
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
                navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC, {
                  state: {
                    project_uuid: item?.project_id.uuid,
                    projectDetails: item?.project_id,
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
            onClick={() => redirectToProjectDetails(item)}
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

  const redirectToProjectDetails = (project: any) => {
    navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC, {
      state: {
        project_uuid: project?.project_id.uuid,
        projectDetails: project?.project_id,
      },
    })
  }

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 4,
        p: 2,
        minHeight: location.pathname.includes(pathNames.PROJECTS)
          ? '80vh'
          : '55vh',
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
        {/* {location.pathname.includes(pathNames.PROJECTS) ? null : (
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
              color: 'darkPrimary1.main',
            }}
            onClick={() => navigate(pathNames.PROJECTS)}
          >
            See All
          </Typography>
        )} */}
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
            pagination
            rowsPerPageProp={5}
            hideScrollbar
            stickyLastCol
            stickySecondLastCol
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
