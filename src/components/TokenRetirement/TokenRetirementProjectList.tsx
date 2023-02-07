import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import ApproveTokenCard from './ApproveTokenCard'
import ProjectCards from './ProjectCards'
import RetirementCertificate from './RetirementCertificate'

const TokenRetirementProjectList = () => {
  const [projects, setProjects] = useState<any>(null)
  const navigate = useNavigate()
  useEffect(() => {
    getAllProjects()
  }, [])

  const getAllProjects = async () => {
    try {
      // setLoading(true)
      const projectRes = await dataCollectionCalls.getAllProjects()
      if (projectRes.data.success) {
        setProjects(projectRes.data.data)
        // setFilteredProjects(projectRes.data.data)
      }
    } catch (e) {
      console.log('Error in dataCollectionCalls.getAllProjects api ~ ', e)
    } finally {
      // setLoading(false)
    }
  }

  return (
    <>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography sx={{ color: '#2B2B2B', fontSize: '22px', mb: 3 }}>
          Token Retirement Projects
        </Typography>
        <Grid
          container
          spacing={{ sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5 }}
          columns={{ sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            // maxHeight:'75vh',
            // overflowY: 'scroll',
            // overflowX: 'hidden',
            pb: 1,
          }}
        >
          {projects && projects.length
            ? projects?.map((project: any, index: number) => (
                <ProjectCards
                  key={index}
                  project={project}
                  navigationAction={(item: any) => navigate(item)}
                />
              ))
            : null}
        </Grid>
        {/* <ApproveTokenCard />*/}
        <RetirementCertificate />
      </Grid>
    </>
  )
}

export default TokenRetirementProjectList
