// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'
import { PanoramaPhotosphere } from '@mui/icons-material'
import CCTable from '../../atoms/CCTable'

interface MarketDepthProps {}

const MarketDepth: FC<MarketDepthProps> = (props) => {
  return (
    <Box sx={{ position: 'absolute', top: -50, width: '100%' }}>
      <Typography
        sx={{
          fontSize: 16,
          width: '100%',
          fontWeight: 600,
          marginTop: 3,
          marginBottom: 2,
        }}
      >
        Market Depth
      </Typography>

      <Paper
        sx={{
          width: '100%',
          borderRadius: '12px',
          paddingBottom: 2,
          // paddingTop: 1,
          // border: '2px solid',
        }}
      >
        <CCTable
          headings={headings}
          rows={rows}
          sx={{ minWidth: 100 }}
          tableSx={{ minWidth: 100 }}
        />
      </Paper>
    </Box>
  )
}
const rows = [
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
  ['200', '2'],
]

const headings = ['Price', 'Quantity']

export default MarketDepth
