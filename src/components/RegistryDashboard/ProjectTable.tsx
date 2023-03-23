import { Box } from '@mui/system'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'

import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import StatusChips from '../../atoms/StatusChips/StatusChips'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setRegistryProjectDetails } from '../../redux/Slices/registrySlice'

import { pathNames } from '../../routes/pathNames'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import LimitedText from '../../atoms/LimitedText/LimitedText'

import { shallowEqual } from 'react-redux'
import {
  setRegistryNewProjects,
  setRegistryReviewedProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'
import NoData from '../../atoms/NoData/NoData'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import { getTextAccordingToStatus } from '../../utils/commonFunctions'

let index = 0
const headings: any = [
  <LimitedText key={index++} text="Created on" />,
  <LimitedText key={index++} text="Received on" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project name" widthLimit="200px" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
]
const headingsReviewed: any = [
  <LimitedText key={index++} text="Created on" />,
  <LimitedText key={index++} text="Received on" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project name" widthLimit="200px" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
]

interface ProjectTableProps {
  loading: boolean
}

const ProjectTable: FC<ProjectTableProps> = ({ loading }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const cachedRegistryNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryNewTabAllProjects,
    shallowEqual
  )

  const cachedRegistryReviewedTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegistryReviewedTabAllProjects,
    shallowEqual
  )

  const registryNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.registryNewProjects,
    shallowEqual
  )

  const registryReviewedProjects = useAppSelector(
    ({ dashboard }) => dashboard.registryReviewedProjects,
    shallowEqual
  )

  const [tabIndex, setTabIndex] = useState(1)

  useEffect(() => {
    const newData: any = []

    cachedRegistryNewTabAllProjects &&
      cachedRegistryNewTabAllProjects.length &&
      cachedRegistryNewTabAllProjects.map((project: any, index: any) => {
        newData.push([
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              key={index}
              text={moment(project.createdAt).format('l')}
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              text={
                project?.report?.createdAt
                  ? moment(project.createdAt).format('l')
                  : '-'
              }
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText text={project?.user_id?.organisationName} />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              key={index}
              text={project?.company_name}
              widthLimit="200px"
            />
          </Box>,
          <Box key={index} onClick={() => onClickStartHandler(project)}>
            <LimitedText
              text={getTextAccordingToStatus(project?.project_status)}
              widthLimit="250px"
            />
          </Box>,
          project?.project_status === 8 ? (
            <ChevronRightIcon onClick={() => onClickStartHandler(project)} />
          ) : (
            <CCButton
              key={index}
              sx={{
                background: '#006B5E',
                color: '#FFFFFF',
                borderRadius: '32px',
                fontSize: 14,
                px: 3,
                py: 1,
                minWidth: 0,
                whiteSpace: 'nowrap',
              }}
              onClick={() => onClickStartHandler(project)}
            >
              Start review
            </CCButton>
          ),
        ])
      })

    if (newData.length !== 0) {
      dispatch(setRegistryNewProjects(newData))
    } else {
      dispatch(setRegistryNewProjects(null))
    }
  }, [cachedRegistryNewTabAllProjects])

  useEffect(() => {
    const reviewedData: any = []

    cachedRegistryReviewedTabAllProjects &&
      cachedRegistryReviewedTabAllProjects.length &&
      cachedRegistryReviewedTabAllProjects.map((project: any, index: any) => {
        reviewedData.push([
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText text={moment(project.createdAt).format('l')} />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              text={
                project?.report?.createdAt
                  ? moment(project.createdAt).format('l')
                  : '-'
              }
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText text={project?.user_id?.organisationName} />
          </Box>,
          <Box
            key={index}
            className="td-as-link"
            onClick={() => onClickStartHandler(project)}
          >
            <LimitedText
              key={index}
              text={project?.company_name}
              widthLimit="200px"
            />
          </Box>,
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => onClickStartHandler(project)}
          >
            {getTextAccordingToStatus(project?.project_status)}
          </Box>,
        ])
      })

    if (reviewedData.length !== 0) {
      dispatch(setRegistryReviewedProjects(reviewedData))
    } else {
      dispatch(setRegistryReviewedProjects(null))
    }
  }, [cachedRegistryReviewedTabAllProjects])

  const renderStatusChips = (status: number) => {
    switch (status) {
      case 6: {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor=""
            cirlceColor=""
          />
        )
      }
      case 7: {
        return (
          <StatusChips
            text="In progress"
            textColor=""
            backgroundColor="rgba(243, 186, 77, 0.24)"
            cirlceColor="#E6A603"
          />
        )
      }
      case 8: {
        return (
          <StatusChips
            text="Completed"
            textColor=""
            backgroundColor="#75F8E4"
            cirlceColor="#00A392"
          />
        )
      }
    }
  }

  const onClickStartHandler = async (projectDetails: any) => {
    dispatch(setRegistryProjectDetails(projectDetails))
    navigate({
      pathname: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
      search: `?${createSearchParams({
        projectId: projectDetails?.uuid,
      })}`,
    })
  }

  return (
    <>
      <TabSelector
        tabArray={['New', 'Reviewed']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        sx={{ marginBottom: 2 }}
      />

      {loading ? (
        <CCTableSkeleton sx={{ mt: 2 }} items={5} />
      ) : tabIndex === 1 ? (
        registryNewProjects && registryNewProjects.length ? (
          <CCTable
            headings={headings}
            rows={registryNewProjects}
            sx={{ minWidth: 100 }}
            maxWidth={'100%'}
            tableSx={{ minWidth: 100 }}
            hideScrollbar
            pagination
            rowsPerPageProp={5}
            // stickyLastCol
            // stickySecondLastCol
          />
        ) : (
          <NoData title="No new projects available" />
        )
      ) : registryReviewedProjects && registryReviewedProjects.length ? (
        <CCTable
          headings={headingsReviewed}
          rows={registryReviewedProjects}
          sx={{ minWidth: 100 }}
          maxWidth={'100%'}
          tableSx={{ minWidth: 100 }}
          hideScrollbar
          pagination
          rowsPerPageProp={5}
        />
      ) : (
        <NoData title="No reviewed projects available" />
      )}
    </>
  )
}

export default ProjectTable
