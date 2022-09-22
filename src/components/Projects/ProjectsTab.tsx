// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, IconButton, Chip, Paper } from '@mui/material'

// Local Imports
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { getLocalItem } from '../../utils/Storage'
import ListOfProjectsDashboard from './ListOfProjectsDashboard'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { setSectionIndex, setSubSectionIndex } from '../../redux/Slices/issuanceDataCollection'
import { useDispatch } from 'react-redux'

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    loadTableData()
  }, [])

  const loadTableData = () => {
    setLoading(true)

    dataCollectionCalls
      .getAllProjects(getLocalItem('userDetails')?.email)
      .then((response) => {
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
          p: 2,
          borderRadius: '8px',
          boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
          marginTop: 3,
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
          <Typography
            sx={{
              color: '#F3BA4D',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
            }}
            onClick={() => navigate(pathNames.SEE_ALL_PROJECTS)}
          >
            See All
          </Typography>
        </Box>

        <ListOfProjectsDashboard data={tableData} loading={loading} />
      </Paper>
    )
  } else {
    return (
      <EmptyComponent
        photoType={1}
        title="No projects listed yet !"
        listNewProject
        action={() => listNewProject()}
      />
    )
  }
}

export default ProjectsTab
