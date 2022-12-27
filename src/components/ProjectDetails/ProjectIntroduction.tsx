import { Grid, Typography } from '@mui/material'
import React from 'react'
import CCButton from '../../atoms/CCButton'

const ProjectIntroduction = () => {
  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Typography sx={{ color: '#F15D5F', fontSize: 20, fontWeight: 500 }}>
            ProjectIntroduction
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
export default ProjectIntroduction
