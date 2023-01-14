import { Box } from '@mui/system'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { Images } from '../../theme'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const headings: any = [
  'Created on',
  'Received on',
  'Project Developer',
  'Project name',
  'Monthly Report Submission Dt',
  'Review Status',
  'Action',
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
              moment(project.createdAt).format('l'),
              project?.report?.createdAt
                ? moment(project?.report?.createdAt).format('l')
                : '-',
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    background: '#F0FFFB',
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1,
                  }}
                >
                  <img src={Images.BriefcaseIcon} height="24px" width="24px" />{' '}
                </Box>
                <Box>Project Developer</Box>
              </Box>,
              project?.company_name,
              project?.report?.next_date
                ? moment(project?.report?.next_date).format('l')
                : '-',
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
                  }}
                  onClick={() => onClickStartHandler(project)}
                >
                  Start review
                </CCButton>
              ),
            ]
            if (
              project?.project_status ===
              PROJECT_ALL_STATUS.REJECTED_BY_THE_VERIFIER
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
    navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC)
  }

  return (
    <>
      {loading ? (
        <CCTableSkeleton height={40} />
      ) : (
        <CCTable
          headings={headings}
          rows={rows}
          pagination={location?.pathname === pathNames.REGISTRY_ALL_PROJECTS}
        />
      )}
    </>
  )
}

export default ProjectTable
