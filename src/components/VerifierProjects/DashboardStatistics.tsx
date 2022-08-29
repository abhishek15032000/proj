// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'

interface DashboardStatisticsProps {
  data?: any
}

const DashboardStatistics: FC<DashboardStatisticsProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 1,
      }}
    >
      {props.data.map((item: any, index: any) => (
        <DashboardStatisticTile
          key={index}
          title={item.title}
          value={item.value}
          color={item.color}
        />
      ))}
    </Box>
  )
}

export default DashboardStatistics

interface DashboardStatisticTileProps {
  title?: string
  value?: string
  color?: string
}

const DashboardStatisticTile: FC<DashboardStatisticTileProps> = (props) => {
  return (
    <Paper
      sx={{
        width: '260px',
        height: '120px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        mr: 2,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 400 }}>
          {props.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 400,
            color: Colors.textColorBrightRed,
            mt: 1,
          }}
        >
          {props.value}
        </Typography>
      </Box>
      <Box
        sx={{
          height: '80px',
          width: '80px',
          borderRadius: '20px',
          boxShadow: '1px 1px 2px 2px #EEE',
          backgroundColor: props.color,
        }}
      ></Box>
    </Paper>
  )
}
