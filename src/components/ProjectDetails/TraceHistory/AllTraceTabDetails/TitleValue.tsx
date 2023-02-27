import { Box, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'

interface TitleValueProps {
  title: string
  value: string | number
  theme?: string
  bolder?: boolean
}

const TitleValue: FC<TitleValueProps> = ({
  title,
  value,
  theme = 'light',
  bolder = false,
}) => {
  return (
    <Grid item xs={6} sx={{ mt: 2 }}>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          color: '#006B5E',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          color: '#3F4946',
          mt: 1,
        }}
      >
        {value === undefined || value === '' ? '-' : value}
      </Typography>
    </Grid>
  )
}

export default TitleValue
