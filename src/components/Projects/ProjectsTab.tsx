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
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setIssuerDashboardProject } from '../../redux/Slices/cachingSlice'

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location: any = useLocation()
  console.log('🚀 ~ file: ProjectsTab.tsx ~ line 26 ~ location', location)

  const issuerDashboardProjects = useAppSelector(
    ({ caching }) => caching.issuerDashboardProjects,
    shallowEqual
  )

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    loadTableData()
  }, [])

  const loadTableData = () => {
    if (!issuerDashboardProjects) setLoading(true)

    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((response) => {
        dispatch(setIssuerDashboardProject(response.data.data))
        setTableData(response.data.data)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const listNewProject = () => {
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))
  }

  if (loading || (!loading && tableData.length > 0)) {
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
  } else if (!loading && tableData.length === 0) {
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
