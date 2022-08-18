import { Grid, Typography, Button } from '@mui/material'
import React from 'react'
import ProjectsStats from './ProjectsStats'
import './Projects.css'
import ProjectsTab from './ProjectsTab'
import ProfileCompletion from './ProfileCompletion'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import CCButton from '../../atoms/CCButton'

const Projects = () => {
  const navigate = useNavigate()
  const listNewProject = () => {
    navigate(pathNames.ISSUANCE_DATA_COLLECTION)
  }

  return (
    <>
      <Typography sx={{ color: '#F15D5F', fontSize: 28, fontWeight: 400 }}>
        Dashboard
      </Typography>

      <Grid container>
        <Grid item md={12} sm={12} lg={9} sx={{ paddingRight: 2 }}>
          <ProjectsStats />

          <ProjectsTab />
        </Grid>
        <Grid item lg={3} sx={{ paddingLeft: 1 }}>
          <CCButton
            variant="contained"
            sx={{
              backgroundColor: '#F3BA4D',
              textTransform: 'none',
              width: '260px',
              borderRadius: '100px',
              marginBottom: 4,
              marginTop: 3,
              padding: '10px 24px 10px 16px',
            }}
            startIcon={<AddIcon style={{ color: '#005046' }} />}
            onClick={listNewProject}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}
            >
              List New Project
            </Typography>
          </CCButton>

          <ProfileCompletion />
        </Grid>
      </Grid>
    </>
  )
}
export default Projects
