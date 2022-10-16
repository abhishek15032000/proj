// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'
import { Colors } from '../../theme'
import CircleIcon from '@mui/icons-material/Circle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import moment from 'moment'

// Local Imports

interface NotificationTileProps {
  status?: any
  title?: any
  time?: any
}

const NotificationTile: FC<NotificationTileProps> = (props) => {
  return (
    <>
      <Box
        sx={{
          // border: '2px solid',
          height: '110px',
          width: '100%',
          p: 2,
          display: 'flex',
        }}
      >
        <CircleIcon style={{ height: 18, color: Colors.textButtonColor }} />
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: Colors.textButtonColor,
              ml: 1,
            }}
          >
            {props.status}
          </Typography>

          <Typography sx={{ fontSize: 15, fontWeight: 400, mt: 1, ml: 1 }}>
            {props.title}
          </Typography>

          <Box
            sx={{
              mt: 1,
              display: 'flex',
              ml: 0.3,
              // alignItems: 'center',
            }}
          >
            <ScheduleIcon
              style={{ height: 18, color: Colors.mediumGreyBackground }}
            />
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: Colors.mediumGreyBackground,
              }}
            >
              {moment(props.time).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

export default NotificationTile
