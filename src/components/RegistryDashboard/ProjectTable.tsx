import { Box } from '@mui/system'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { department } from '../../api/department.api'
import { registryCalls } from '../../api/registry.api'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import StatusChips from '../../atoms/StatusChips/StatusChips'
import { ROLES } from '../../config/constants.config'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setRegistryProjectDetails } from '../../redux/Slices/registrySlice'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Typography } from '@mui/material'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'

let index = 0
const headings: any = [
  <LimitedText key={index++} text="Created on" />,
  <LimitedText key={index++} text="Received on" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project name" widthLimit="200px" />,
  <LimitedText key={index++} text="Monthly Report Submission Dt" />,
  <LimitedText key={index++} text="Review Status" />,
  <LimitedText key={index++} text="Action" />,
]

interface ProjectTableProps {
  tabIndex: number
}

const ProjectTable: FC<ProjectTableProps> = ({ tabIndex }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [newProjects, setNewProjects] = useState<any>([])
  const [underReviewProjects, setUnderReviewProjects] = useState<any>([])
  const [reviewedProjects, setReviewedProjects] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<any>(null)

  useEffect(() => {
    getAllProjects()
  }, [])

  useEffect(() => {
    let temp: any = []
    if (
      newProjects.length ||
      underReviewProjects.length ||
      reviewedProjects.length
    )
      if (tabIndex === 1) {
        temp = [...newProjects]
      } else if (tabIndex === 2) {
        temp = [...underReviewProjects]
      } else if (tabIndex === 3) {
        temp = [...reviewedProjects]
      }
    if (location?.pathname === pathNames.DASHBOARD) {
      setRows(temp.slice(0, 7))
    } else {
      setRows(temp)
    }
  }, [tabIndex, newProjects, underReviewProjects, reviewedProjects])

  const getAllProjects = async () => {
    try {
      setLoading(true)
      const projectRes = await dataCollectionCalls.getAllProjects()
      if (projectRes.data.success) {
        const projects = projectRes.data.data

        const tempNewProjects: any = []
        const tempUnderReviewProjects: any = []
        const tempReviewedProjects: any = []

        if (projects && projects.length) {
          projectRes.data.data.forEach((project: any, index: number) => {
            const row = [
              <LimitedText
                key={index}
                text={moment(project.createdAt).format('l')}
              />,
              project?.report?.createdAt ? (
                <LimitedText
                  key={index}
                  text={moment(project.createdAt).format('l')}
                />
              ) : (
                '-'
              ),
              // <Box
              //   key={index}
              //   sx={{
              //     display: 'flex',
              //     alignItems: 'center',
              //     justifyContent: 'center',
              //   }}
              // >
              //   <Box
              //     sx={{
              //       background: '#F0FFFB',
              //       height: '40px',
              //       width: '40px',
              //       borderRadius: '50%',
              //       display: 'flex',
              //       alignItems: 'center',
              //       justifyContent: 'center',
              //       mr: 1,
              //     }}
              //   >
              //     <img src={Images.BriefcaseIcon} height="24px" width="24px" />{' '}
              //   </Box>
              //   <Box>Project Developer</Box>
              // </Box>,
              <LimitedText key={index} text={project?.name} />,
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
              project?.report?.next_date ? (
                <LimitedText
                  key={index}
                  text={moment(project?.report?.next_date).format('l')}
                />
              ) : (
                '-'
              ),
              renderStatusChips(project?.project_status),
              project?.project_status === 8 ? (
                <ChevronRightIcon
                  onClick={() => onClickStartHandler(project)}
                />
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
            ]
            if (
              project?.project_status ===
              PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
            ) {
              tempNewProjects.push(row)
            } else if (project?.project_status === 7) {
              tempUnderReviewProjects.push(row)
            } else if (project?.project_status === 8) {
              tempReviewedProjects.push(row)
            }
            setNewProjects(tempNewProjects)
            setUnderReviewProjects(tempUnderReviewProjects)
            setReviewedProjects(tempReviewedProjects)
          })
        }
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getAllProjects api ~ ', e)
    } finally {
      setLoading(false)
    }
  }
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
      {loading ? (
        <CCTableSkeleton height={16} isPagination={true} items={5} />
      ) : rows && rows?.length <= 0 ? (
        <Box
          sx={{
            color: Colors.darkPrimary1,
            fontWeight: 500,
            fontSize: 16,
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <EmptyComponent
            photoType={1}
            sx={{ width: '100%', height: '280px', mt: 0 }}
            elevation={0}
            title="No projects under this tab"
          />
        </Box>
      ) : (
        <CCTable
          headings={headings}
          rows={rows}
          pagination
        />
      )}
    </>
  )
}

export default ProjectTable
