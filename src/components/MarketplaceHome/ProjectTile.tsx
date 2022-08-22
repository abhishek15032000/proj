// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Colors } from '../../theme';

// Local Imports

interface ProjectTileProps {}

const ProjectTile: FC<ProjectTileProps> = () => {
  return (
    <Grid item sm={12} md={6} lg={4}>
      <Paper
        sx={{
          height: '280px',
          width: '360px',
          margin: 2,
          borderRadius: '12px',
        }}
      >
        <Box
          component="img"
          src={
            'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'
          }
          sx={{
            width: '100%',
            height: '140px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            // height: '65px',
            display: 'grid',
            alignItems: 'center',
            paddingLeft: 1,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, margin: 1 }}>
            3.66 MW poultry litter based power generation project by Raus Power
            in India
          </Typography>
        </Box>
        {/* <Divider /> */}
        <Box
          sx={{
            width: '100%',
            // height: '35px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <LocationOnIcon style={{ margin: 2, color: Colors.textColorLightGreen }} />
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            6430 Hixson Pike, Hixson, TN 37343, USA | 9,900 hectares.
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default ProjectTile
