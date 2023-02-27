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
import { setCachedIssuerDashboardProject } from '../../redux/Slices/cachingSlice'

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location: any = useLocation()
  console.log('🚀 ~ file: ProjectsTab.tsx ~ line 26 ~ location', location)

  const cachedIssuerDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedIssuerDashboardProjects,
    shallowEqual
  )

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTableData()
  }, [])

  const loadTableData = () => {
    if (!cachedIssuerDashboardProjects) {
      setLoading(true)
    }

    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((response) => {
        dispatch(setCachedIssuerDashboardProject(response.data.data))
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
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>
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

      {!loading &&
      !cachedIssuerDashboardProjects &&
      !cachedIssuerDashboardProjects?.length ? (
        <EmptyComponent
          photoType={1}
          title="No projects listed yet !"
          listNewProject
          action={() => listNewProject()}
        />
      ) : (
        <ListOfProjectsDashboard data={tableData} loading={loading} />
      )}
    </Paper>
  )
}

export default ProjectsTab
