import React, { FC } from 'react'

import { Box, formLabelClasses, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface BackHeaderProps {
  title: string
  onClick?: object
  iconDisable?: boolean
  sx?: any
}

const BackHeader: FC<BackHeaderProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.sx,
      }}
    >
      {!props.iconDisable && <ArrowBackIcon />}
      <Typography sx={{ fontSize: 20, marginLeft: '10px', fontWeight: 500 }}>
        {props.title}
      </Typography>
    </Box>
  )
}

export default BackHeader

BackHeader.defaultProps = {
  iconDisable: false,
}
