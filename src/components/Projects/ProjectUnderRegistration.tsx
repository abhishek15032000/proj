import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CCTable from '../../atoms/CCTable'
import CreateIcon from '@mui/icons-material/Create'
import { ForkLeft } from '@mui/icons-material'
const rows = [
  [
    4337,
    '12/04/21',
    'Trueno River Hydroelectric Power Plant',
    'Vilcum, Chile',
    '+Finalised',
    'Climate Finance',
    <CreateIcon key={1} />,
  ],
]
const headings = [
  'Reference ID',
  'Created Dt',
  'Project Name',
  'Location',
  'Verifier Status',
  'Verifier',
  'Action',
]

const ProjectsUnderRegistration = () => {
  return (
    <Grid container sx={{ background: 'red' }}>
      <Grid item md={2}>
        Reference ID
      </Grid>
      <Grid item md={10} sx={{ overflow: 'auto' }}>
        <Grid container>
          <Grid item md={2}>
            Created Dt
          </Grid>
          <Grid item md={2}>
            Project Name
          </Grid>
          <Grid item md={2}>
            Location
          </Grid>
          <Grid item md={2}>
            Verifier Status
          </Grid>
          <Grid item md={2}>
            Verifier
          </Grid>
          <Grid item md={2}>
            Action
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    //<Box>
    //  <CCTable headings={headings} rows={rows} />
    //</Box>
  )
}

export default ProjectsUnderRegistration
