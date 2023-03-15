import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEqual } from 'lodash'
import moment from 'moment'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { verifierCalls } from '../api/verifierCalls.api'
import ApprovalChip from '../atoms/ApprovalChip/ApprovalChip'
import LimitedText from '../atoms/LimitedText/LimitedText'
import TextButton from '../atoms/TextButton/TextButton'
import { PROJECT_ALL_STATUS } from '../config/constants.config'
import { setCachedVerifierDashboardProject } from '../redux/Slices/cachingSlice'
import {
  setVerifierDashboardTableLoading,
  setVerifierStatsReload,
} from '../redux/Slices/verifierSlice'
import { pathNames } from '../routes/pathNames'
import { Colors } from '../theme'
import { getLocalItem } from '../utils/Storage'
import { useAppDispatch, useAppSelector } from './reduxHooks'

export function useVerifierDashboardTable() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cachedVerifierDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedVerifierDashboardProjects,
    shallowEqual
  )

  function loadTableData() {
    if (cachedVerifierDashboardProjects.length === 0) {
      dispatch(setVerifierDashboardTableLoading(true))
    }

    verifierCalls
      .getAllVerifiers(getLocalItem('userDetails')?.user_id)
      .then((response) => {
        const projectListRes = response.data

        if (response) {
          if (!isEqual(cachedVerifierDashboardProjects, projectListRes)) {
            dispatch(setCachedVerifierDashboardProject(projectListRes))
          }
        }

        dispatch(setVerifierDashboardTableLoading(false))
      })
      .catch((e) => {
        dispatch(setVerifierDashboardTableLoading(false))
        console.log('Error in verifierCalls.getAllVerifiers api ~ ', e)
      })
      .finally(() => {
        dispatch(setVerifierStatsReload(true))
      })
  }

  function verifierTabWiseData() {
    const newData: any = [],
      registeredData: any = [],
      acceptedData: any = [],
      rejectedData: any = []

    cachedVerifierDashboardProjects.map((item: any, index: any) => {
      if (
        item?.project_status === PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED
      ) {
        newData.push([
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
            text={
              item?.createdAt
                ? moment(item?.createdAt).format('DD/MM/YYYY')
                : '-'
            }
          />,
          <LimitedText
            key={index}
            text={
              item?.updatedAt
                ? moment(item?.updatedAt).format('DD/MM/YYYY')
                : '-'
            }
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
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Colors.textColorDarkGreen,
                  ml: 2,
                  cursor: 'pointer',
                }}
                onClick={() =>
                  updateVerifierStatus(
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
                onClick={() => updateVerifierStatus(10, item)}
              >
                Reject
              </Typography>
            </Box>
          ) : (
            '-'
          ),
          item?.project_status ===
            PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED ||
          item?.project_status ===
            PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT ? (
            <ChevronRightIcon
              key={index}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                redirectToProjectDetails(item)
              }}
            />
          ) : (
            <Box sx={{ p: 1 }}> {'-'}</Box>
          ),
        ])
      } else if (
        [
          PROJECT_ALL_STATUS.VERIFIER_APPROVED_THE_PROJECT,
          PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
          PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
          PROJECT_ALL_STATUS.PROJECT_UNDER_REVIEW_IN_REGISTRY,
          PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
        ].includes(item?.project_status)
      ) {
        const row = [
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
            text={
              item?.createdAt
                ? moment(item?.createdAt).format('DD/MM/YYYY')
                : '-'
            }
          />,
          <LimitedText
            key={index}
            text={
              item?.updatedAt
                ? moment(item?.updatedAt).format('DD/MM/YYYY')
                : '-'
            }
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
                navigate({
                  pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
                  search: `?${createSearchParams({
                    projectId: item?.project_id?.uuid,
                  })}`,
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
        ]

        if (
          item?.project_status ===
          PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
        ) {
          registeredData.push(row)
        } else {
          acceptedData.push(row)
        }
      } else if (
        item?.project_status === PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER ||
        item?.project_status === PROJECT_ALL_STATUS.REJECTED_BY_THE_ISSUER
      ) {
        rejectedData.push([
          <LimitedText
            key={index}
            text={item?.project_id?.uuid}
            widthLimit={'100px'}
            ellispsisAtStart
          />,
          <LimitedText
            key={index}
            text={
              item?.createdAt
                ? moment(item?.createdAt).format('DD/MM/YYYY')
                : '-'
            }
          />,
          <LimitedText
            key={index}
            text={
              item?.updatedAt
                ? moment(item?.updatedAt).format('DD/MM/YYYY')
                : '-'
            }
          />,
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <LimitedText key={index} text={item?.project_id?.name} />
          </Box>,

          <LimitedText key={index} text={item?.project_id?.company_name} />,
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
          '-',
          <Box key={index} sx={{ p: 1 }}>
            {'-'}
          </Box>,
        ])
      }
    })

    return { newData, registeredData, acceptedData, rejectedData }
  }
  const redirectToProjectDetails = (project: any) => {
    navigate(
      {
        pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
        search: `?${createSearchParams({
          projectId: project?.project_id?.uuid,
        })}`,
      },
      {
        state: {
          project_uuid: project?.project_id.uuid,
          projectDetails: project?.project_id,
        },
      }
    )
  }
  const updateVerifierStatus = (status: any, data: any) => {
    dispatch(setVerifierDashboardTableLoading(true))

    const payload = {
      _id: data._id,
      project_id: data.project_id?._id,
      project_status: status,
      verifier_id: data.verifier_id,
      verifier_name: data.verifier_name,
      verifier_number: data.verifier_number,
      verifier_address: data.verifier_address,
    }

    verifierCalls.updateVerifier(payload).then((response) => {
      //setVerifierStatsReload action making false to make the project stats to run again when it is becoming true in loadTableData() so that when verifier make the action in verifier dahsboard the stats will be updated
      dispatch(setVerifierStatsReload(false))
      loadTableData()
    })
  }

  return {
    verifierTabWiseData,
    loadTableData,
  }
}
