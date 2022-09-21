// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, IconButton, Chip, Paper } from '@mui/material'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CircleIcon from '@mui/icons-material/Circle'
import DashboardNewProjectsTable from './DashboardNewProjectsTable'
import DashboardRegisteredProjectsTable from './DashboardRegisteredProjectsTable'
//import ProjectsUnderRegistration from './ProjectUnderRegistration'
//import RegisteredProjects from './RegisteredProjects'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { getLocalItem } from '../../utils/Storage'
import { addSectionPercentages } from '../../utils/newProject.utils'
import EmptyComponent from '../../atoms/EmptyComponent/EmptyComponent'
import { isNonNullChain } from 'typescript'

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const userDetails = getLocalItem('userDetails')

  const [tabIndex, setTabIndex] = useState(1)
  const [tableRows, setTableRows] = useState<any>([])
  const [filterProjectDetails, setFilterProjectDetails] =
    useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //will use it when registered projects are true in API res
    //tabIndex === 1
    //  ? setFilterProjectDetails(false)
    //  : setFilterProjectDetails(true)
    getAllProjects()
  }, [tabIndex])

  const getAllProjects = () => {
    setLoading(true)
    dataCollectionCalls
      .getAllProjects(userDetails?.email)
      .then((res: any) => {
        if (res?.data?.success) {
          const modifiedRows = res?.data?.data
            ?.slice(0, 7)
            .map((i: any) => addSectionPercentages(i))
          if (modifiedRows && modifiedRows.length) {
            const tabRows = modifiedRows.filter((i: any) =>
              tabIndex === 1
                ? i?.register === false && i?.project_status <= 3
                : tabIndex === 2 &&
                  i?.register === true &&
                  i?.project_status > 3
            )
            setTableRows(tabRows)
          }
          setLoading(false)
        }
      })
      .catch((e: any) => {
        console.log('Error in dataCollectionCalls.getAllProjects api :', e)
        setLoading(false)
      })
  }

  if (loading || (loading === false && tableRows.length > 0)) {
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

        <TabSelector
          tabArray={['New', 'Registered']}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          sx={{ marginBottom: 2 }}
        />
        {tabIndex === 1 ? (
          <DashboardNewProjectsTable tableRows={tableRows} loading={loading} />
        ) : (
          tabIndex === 2 && (
            <DashboardRegisteredProjectsTable
              tableRows={filterProjectDetails && tableRows}
              loading={loading}
            />
          )
        )}
      </Paper>
    )
  } else if (loading === false && tableRows.length === 0) {
    return (
      <EmptyComponent
        photoType={1}
        title="No projects listed yet !"
        listNewProject
      />
    )
  } else {
    return null
  }
}

export default ProjectsTab
