// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { WalletStats } from '../../config/constants.config'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'

interface DashboardStatisticsProps {
  data?: any
  loading?: any
}

const DashboardStatisticsCustom: FC<DashboardStatisticsProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 1,
      }}
    >
      {props.loading &&
        props.data.map((item: any, index: any) => (
          <DashboardStatisticSkeleton key={index} />
        ))}

      {!props.loading &&
        props.data &&
        props.data.map((item: any, index: any) => {
          console.log('index')
          console.log(JSON.stringify(index, null, 4))
          if (index !== 0) {
            return (
              <DashboardStatisticTile
                key={index}
                title={item.title}
                value={item.value}
                color={item.color}
              />
            )
          } else {
            return (
              <DashboardStatisticTileFirst
                key={index}
                title={item.title}
                value={item.value}
                color={item.color}
              />
            )
          }
        })}
    </Box>
  )
}

export default DashboardStatisticsCustom

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
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
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
      {props.title !== WalletStats.WALLET_BALANCE && (
        <Box
          sx={{
            height: '80px',
            minWidth: '80px',
            borderRadius: '20px',
            boxShadow: '1px 1px 2px 2px #EEE',
            backgroundColor: props.color,
          }}
        ></Box>
      )}
    </Paper>
  )
}

interface DashboardStatisticSkeletonProps {}

const DashboardStatisticSkeleton: FC<DashboardStatisticSkeletonProps> = (
  props
) => {
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
        <Skeleton
          sx={{ fontSize: '1rem', bgcolor: '#CCE8E1', width: '100px', mb: 2 }}
          variant="text"
        />
        <Skeleton
          sx={{ fontSize: '1rem', bgcolor: '#CCE8E1', width: '100px' }}
          variant="text"
        />
      </Box>

      <Skeleton
        sx={{
          height: '80px',
          width: '80px',
          borderRadius: '20px',
          boxShadow: '1px 1px 2px 2px #EEE',
          backgroundColor: '#CCE8E1',
        }}
        variant="rectangular"
      />
    </Paper>
  )
}

const DashboardStatisticTileFirst: FC<DashboardStatisticTileProps> = (
  props
) => {
  const navigate = useNavigate()

  return (
    <Paper
      sx={{
        width: '360px',
        height: '120px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        mr: 2,
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
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
      <Typography
        onClick={() => navigate(pathNames.BANK_DETAILS)}
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: Colors.textColorLightGreen,
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >
        View Account Details
      </Typography>
    </Paper>
  )
}
