// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper } from '@mui/material'

// Local Imports
import NoProjectsListed from '../../assets/Images/illustrations/NoProjectsListed.png'
import { Colors } from '../../theme'
import NoSellOrders from '../../assets/Images/illustrations/NoSellOrder.png'

interface EmptyComponentProps {
  title?: any
  photoType?: any
  sx?: any
}

const EmptyComponent: FC<EmptyComponentProps> = (props) => {
  return (
    <Paper
      sx={{
        height: '540px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        borderRadius: '8px',
        ...props.sx
      }}
    >
      <Box
        sx={{ height: '50%' }}
        component={'img'}
        src={props.photoType === 1 ? NoProjectsListed : NoSellOrders}
      />

      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: Colors.textColorDarkGreen,
          mt: 3,
        }}
      >
        {props.title}
      </Typography>
    </Paper>
  )
}

export default EmptyComponent
