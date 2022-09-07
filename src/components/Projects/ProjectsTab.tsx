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

interface ProjectsTabProps {}

const ProjectsTab: FC<ProjectsTabProps> = (props) => {
  const navigate = useNavigate()
  const userDetails = getLocalItem('userDetails')

  const [tabIndex, setTabIndex] = useState(1)
  const [tableRows, setTableRows] = useState<any>(undefined)
  const [filterProjectDetails, setFilterProjectDetails] =
    useState<boolean>(false)

  useEffect(() => {
    //will use it when registered projects are true in API res
    //tabIndex === 1
    //  ? setFilterProjectDetails(false)
    //  : setFilterProjectDetails(true)
    getAllProjects()
  }, [tabIndex])

  const getAllProjects = () => {
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
        }
      })
      .catch((e: any) => console.log(e))
  }

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
        <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>
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
        <DashboardNewProjectsTable tableRows={tableRows} />
      ) : (
        tabIndex === 2 && (
          <DashboardRegisteredProjectsTable
            tableRows={filterProjectDetails && tableRows}
          />
        )
      )}
    </Paper>
  )
}

export default ProjectsTab
