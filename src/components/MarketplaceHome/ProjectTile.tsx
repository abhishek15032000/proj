// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Divider, Grid, Typography } from '@mui/material'

// Local Imports

interface ProjectTileProps {}

const ProjectTile: FC<ProjectTileProps> = () => {
  return (
    <Grid item sm={12} md={6} lg={4}>
      <Box
        sx={{
          height: '240px',
          width: '320px',
          border: '2px solid',
          // backgroundColor: '#666',
          margin: 2,
          borderRadius: '12px',
        }}
      >
        <Box
          component="img"
          src={
            'https://images.unsplash.com/photo-1657299156653-d3c0147ba3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          }
          sx={{
            width: '100%',
            height: '130px',
            // borderBottom: '2px solid',
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            height: '65px',
            // borderBottom: '2px solid',
            display: 'grid',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 1,
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
            Project 1
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
            Dolor ut augue sociis nec viverra scelerisque.
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            width: '100%',
            height: '35px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
            05.09.2021
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
            Mumbai, India
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default ProjectTile
