import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
//import ProjectDetailsCard from '../ProjectDetails/OtherProjects/projectDetailsCard'
import ProjectDetailsCard from '../ProjectDetails/OtherProjects/ProjectDetailsCard'
import ProjectDetailsCardSkeleton from '../ProjectDetails/OtherProjects/ProjectDetailsCardSkeleton'
//C:\Projects\carbon-credit-webapp\src\components\ProjectDetails\OtherProjects\ProjectDetailsCard.tsx
const AllProjects = () => {
  const [projects, setProjects] = useState<any>([])
  const [loading, setLoading] = useState<any>([])

  useEffect(() => {
    getAllProjects()
  }, [])
  const getAllProjects = async () => {
    try {
      const res = await dataCollectionCalls.getAllProjects()
      console.log('res: ', res)
      setProjects(res?.data?.data)
    } catch (err) {
      console.log('error: ', err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Box sx={{ height: '100%' }}>
        <Typography
          sx={{
            fontSize: '28px',
            color: '#F15D5F',
            mb: 3,
          }}
        >
          All Projects
        </Typography>
        <Grid
          container
          spacing={{ sm: 2, md: 3, lg: 3, xl: 3 }}
          rowSpacing={3}
          columns={{ sm: 10, md: 9, lg: 12, xl: 12 }}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            height: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            //pb: 1,
          }}
        >
          {loading ? (
            <ProjectDetailsCardSkeleton />
          ) : (
            projects?.length !== 0 &&
            projects?.map((project: any, index: number) => (
              <ProjectDetailsCard
                key={index}
                project={project}
                navigationAction={(item: any) => console.log(project)}
                onClickDisable = {true} 
              />
            ))
          )}
        </Grid>
      </Box>
    </>
  )
}

export default AllProjects
