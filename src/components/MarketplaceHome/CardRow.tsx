import { Box, Grid } from '@mui/material'
import React, { FC } from 'react'

interface CardRowProps {
  title: string
  value: string
  titleStyle?: any
  valueStyle?: any
}

const CardRow: FC<CardRowProps> = ({
  title,
  value,
  titleStyle,
  valueStyle,
}) => {
  return (
    <Grid container justifyContent={'space-between'} mt={1}>
      <Grid item xs={9}>
        <Box sx={{ fontWeight: 500, fontSize: 16, ...titleStyle }}>{title}</Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          sx={{
            fontWeight: 500,
            fontSize: 16,
            textAlign: 'right',
            ...valueStyle,
          }}
        >
          {value}
        </Box>
      </Grid>
    </Grid>
  )
}

export default CardRow
