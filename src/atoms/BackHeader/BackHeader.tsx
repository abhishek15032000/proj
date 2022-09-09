import React, { FC } from 'react'

import { Box, formLabelClasses, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Colors } from '../../theme'
import { KeyboardArrowLeft } from '@mui/icons-material'

interface BackHeaderProps {
  title: string
  onClick?: any
  iconDisable?: boolean
  sx?: any
  titleSx?: any
}

const BackHeader: FC<BackHeaderProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...props.sx,
      }}
    >
      {!props.iconDisable && <KeyboardArrowLeft onClick={props.onClick} />}
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 400,
          color: Colors.tertiary,
          ...props.titleSx,
        }}
      >
        {props.title}
      </Typography>
    </Box>
  )
}

export default BackHeader

BackHeader.defaultProps = {
  iconDisable: false,
}
