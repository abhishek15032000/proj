import { Box, Grid, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'

const SectionB2 = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ mt: 4 }}>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#006B5E' }}>
            B.2.1. Temporary deviations from registered monitoring plan or
            applied methodology
          </Typography>
          <TextareaAutosize
            placeholder="(deviations from registered monitoring plan or applied methodology, if any)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={12} xs={12}>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#006B5E' }}>
            B.2.2. Corrections
          </Typography>
          <TextareaAutosize
            placeholder="(Corrections from registered monitoring plan or applied methodology, if any)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#006B5E' }}>
            B.2.3. Permanent changes from registered monitoring plan or applied
            methodology
          </Typography>
          <TextareaAutosize
            placeholder="(Any permanent changes from registered monitoring plan or applied methodology, if any)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#006B5E' }}>
            B.2.4. Changes to project design of registered project activity
          </Typography>
          <TextareaAutosize
            placeholder="(Technical description of the equipment, its specification, supplier name, installed by the project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} xs={12}>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#006B5E' }}>
            B.2.5. Changes to start date of crediting period
          </Typography>
          <TextareaAutosize
            placeholder="(Changes introduced to start date of crediting period, if any.)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8}>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
            B.2.6. Types of changes specific to afforestation or reforestation
            project activity
          </Typography>
          <TextareaAutosize
            placeholder="(Types of changes specific to afforestation or reforestation project activity, if applicable)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB2
