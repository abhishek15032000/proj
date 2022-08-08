import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCButton from '../../atoms/CCButton'
import ProjectsStats from './ProjectsStats'
import RegisteredProjects from './RegisteredProjects'
import ProjectsUnderRegistration from './ProjectUnderRegistration'
import './Projects.css'

const table = [
  {
    comp: RegisteredProjects,
  },
  {
    comp: ProjectsUnderRegistration,
  },
]
const Projects = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [selectedTabColor, setSelectedTabColor] = useState<string>()

  useEffect(() => {
    //selectedTab
    renderComp()
  }, [selectedTab])

  //const renderColor = () => {
  //  return selectedTab === 0 ? '#1D4B44' : '7B9690'
  //}
  //console.log(renderColor)
  const renderComp = () => {
    return selectedTab ? <RegisteredProjects /> : <ProjectsUnderRegistration />
  }

  const listNewProject = () => {
    console.log('New Project')
  }

  return (
    <>
      <Paper elevation={2} sx={{ pt: 2, px: 3, pb: 1, width: '80%' }}>
        <Grid container rowSpacing={3}>
          <Grid
            container
            item
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid item>
              <Typography
                sx={{ color: '#F15D5F', fontSize: 22, fontWeight: 400 }}
              >
                Projects
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: '#F3BA4D' }}
              >
                See All
              </Typography>
            </Grid>
          </Grid>
          <Grid container item columnSpacing={3} xs={12}>
            <Grid item>
              <Typography
                onClick={() => setSelectedTab(0)}
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: `${!selectedTab ? '#1D4B44' : '#7B9690'}`,
                  //borderBottom: `1px solid ${renderColor()}`,
                }}
              >
                New
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                onClick={() => setSelectedTab(1)}
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: `${selectedTab ? '#1D4B44' : '#7B9690'}`,
                  //borderBottom: `1px solid ${renderColor()}`,
                }}
              >
                Registered
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          {renderComp()}
        </Grid>
      </Paper>
    </>
  )
}
export default Projects
