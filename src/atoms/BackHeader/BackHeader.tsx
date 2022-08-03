import React, { FC } from 'react'

import { Box, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface BackHeaderProps {
  title: string,
  onClick?: object,
}

const BackHeader: FC<BackHeaderProps> = (props) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ArrowBackIcon />
      <Typography sx={{ fontSize: 20, marginLeft: '10px', fontWeight: 500 }}>
        {props.title}
      </Typography>
    </Box>
  )
}

export default BackHeader
