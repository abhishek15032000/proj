import { Grid, Typography } from '@mui/material'
import React, { FC } from 'react'

interface TitleValueProps {
  title: string
  value: string
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
    <Grid container sx={{ mt: 2 }}>
      <Grid item md={5}>
        <Typography
          sx={{
            fontWeight: bolder ? 600 : 500,
            fontSize: 14,
            color: theme === 'light' ? '#2B2B2B' : '#CCE8E1',
          }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item md={7}>
        <Typography
          sx={{
            fontWeight: bolder ? 600 : 400,
            fontSize: 14,
            color: theme === 'light' ? '#2B2B2B' : '#CCE8E1',
          }}
        >
          {value === undefined || value === '' ? '-' : value}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default TitleValue
