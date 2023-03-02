// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, IconButton, Chip, Paper } from '@mui/material'

// Local Imports
import { useLocation, useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import ListOfProjectsDashboard from './ListOfProjectsDashboard'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import {
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/issuanceDataCollection'
import { shallowEqual, useDispatch } from 'react-redux'
import {
  setCachedNewTabAllProjects,
  setCachedRegisterTabAllProjects,
  setCachedVerificationTabAllProjects,
} from '../../redux/Slices/cachingSlice'
import { useAppSelector } from '../../hooks/reduxHooks'
import lodash from 'lodash'
import { DASHBOARDTABLIST } from '../../config/constants.config'
interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location: any = useLocation()
  console.log('🚀 ~ file: ProjectsTab.tsx ~ line 26 ~ location', location)

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const cachedNewTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedNewTabAllProjects,
    shallowEqual
  )

  const cachedVerificationTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedVerificationTabAllProjects,
    shallowEqual
  )

  const cachedRegisterTabAllProjects = useAppSelector(
    ({ caching }) => caching.cachedRegisterTabAllProjects,
    shallowEqual
  )

  useEffect(() => {
    loadTableData()
  }, [])

  const loadTableData = async () => {
    try {
      if (
        cachedNewTabAllProjects.length === 0 &&
        cachedRegisterTabAllProjects.length === 0 &&
        cachedVerificationTabAllProjects.length === 0
      ) {
        setLoading(true)
      }
      const commentsRes = await Promise.all(
        DASHBOARDTABLIST.map(async (item: any) => {
          if (item?.status)
            return await dataCollectionCalls.getAllProjectsOfTab({
              status: item?.status,
            })
        })
      )

      if (commentsRes) {
        if (!lodash.isEqual(cachedNewTabAllProjects, commentsRes[0]?.data)) {
          setLoading(true)
          dispatch(setCachedNewTabAllProjects(commentsRes[0]?.data))
        }

        if (
          !lodash.isEqual(
            cachedVerificationTabAllProjects,
            commentsRes[1]?.data
          )
        ) {
          setLoading(true)
          dispatch(setCachedVerificationTabAllProjects(commentsRes[1]?.data))
        }
        if (
          !lodash.isEqual(cachedRegisterTabAllProjects, commentsRes[2]?.data)
        ) {
          setLoading(true)
          dispatch(setCachedRegisterTabAllProjects(commentsRes[2]?.data))
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const listNewProject = () => {
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
  }

  if (
    loading ||
    (!loading &&
      cachedNewTabAllProjects.length >= 0 &&
      cachedRegisterTabAllProjects.length >= 0 &&
      cachedVerificationTabAllProjects.length >= 0)
  ) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: '8px',
          boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
          marginTop: 3,
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
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
            Projects
          </Typography>
          {/* { location.pathname.includes(pathNames.PROJECTS) ? null : <Typography
            sx={{
              color: 'darkPrimary1',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
            }}
            onClick={() => navigate(pathNames.PROJECTS)}
          >
            See All
          </Typography>} */}
        </Box>

        <ListOfProjectsDashboard data={tableData} loading={loading} />
      </Paper>
    )
  } else if (
    !loading &&
    cachedNewTabAllProjects.length === 0 &&
    cachedRegisterTabAllProjects.length === 0 &&
    cachedVerificationTabAllProjects.length === 0
  ) {
    return (
      <EmptyComponent
        photoType={1}
        title="No projects listed yet !"
        listNewProject
        action={() => listNewProject()}
      />
    )
  } else return null
}

export default ProjectsTab
