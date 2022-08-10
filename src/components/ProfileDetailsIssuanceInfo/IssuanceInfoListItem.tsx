// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'

// Local Imports

interface IssuanceInfoListItemProps {
  // title?: string
  // status?: boolean
  data: any
}

const IssuanceInfoListItem: FC<IssuanceInfoListItemProps> = (props) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#E8F3EF',
        mt: 1,
        p: 2,
      }}
    >
      <Grid item xs={7} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
        <CircleIcon sx={{ fontSize: 10, mr: 1 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          {props.data.title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography
          sx={{
            fontSize: 14,
            color:
              props?.data?.completionPercent === 100 ? '#006B5E' : '#BA1B1B',
          }}
        >
          {props?.data?.completionPercent}% Complete
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          {props?.data?.completionPercent === 100 ? (
            <CheckCircleIcon sx={{ color: '#7ACB9F', mr: 1 }} />
          ) : (
            <CircleIcon sx={{ color: '#F7CA56', mr: 1 }} />
          )}
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {props?.data?.completionPercent === 100 ? 'Complete' : 'Incomplete'}
          </Typography>
        </Box>
      </Grid>
      <Grid item container xs={1} justifyContent="flex-end">
        <Box sx={{ marginRight: 5, display: 'flex', alignItems: 'end' }}>
          <ChevronRightIcon sx={{ color: '#388E81' }} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default IssuanceInfoListItem
