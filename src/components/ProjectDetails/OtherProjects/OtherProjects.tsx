import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import { pathNames } from '../../../routes/pathNames'
import ProjectDetailsCard from './ProjectDetailsCard'
import ProjectDetailsCardSkeleton from './ProjectDetailsCardSkeleton'

const projects = ['', '', '', '']

const OtherProjects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = async () => {
    try {
      setLoading(true)
      const projectRes = await dataCollectionCalls.getAllProjects()
      if (projectRes.data.success) {
        const filterProject = projectRes.data.data.filter(
          (item: any, index: number) => index <= 3 && item
        )

        setProjects(filterProject)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getAllProjects api ~ ', e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box
      sx={{
        // background:
        //   'linear-gradient(180deg, rgba(7, 19, 13, 0.79) 0%, #222926 66.32%)',
        // padding: '56px 6vw',
        // color: '#fff',
        pt:10
      }}
    >
     <Typography sx={{ fontSize: 18, fontWeight:'400', color: 'headingColor.main' }}>Other Projects</Typography>
      <Box
        sx={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'headingColor.main',
          textAlign: 'right',
          cursor:"pointer",
          marginTop:"-15px"

        }}
        onClick={() => navigate(pathNames.PROJECT_LISTS_WITH_FILTER)}
      >
       View All
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {loading
          ? ['', '', '', ''].map((project, index) => (
              <ProjectDetailsCardSkeleton key={index} />
            ))
          : projects &&
            projects.length &&
            projects.map((project: any, index: number) => (
              <ProjectDetailsCard
                key={index}
                project={project}
                navigationAction={(item: any) => null}
              />
            ))}
      </Box>
    </Box>
  )
}

export default OtherProjects
