// React Imports
import React, { FC, useEffect } from 'react'

// MUI Imports
import { Box, Typography } from '@mui/material'

// Local Imports
import ShortenedIDComp from '../../atoms/ShortenedIDComp.tsx/ShortenedIDComp'

interface TitleValueProps {
  title?: any
  value?: any
}

const TitleValue: FC<TitleValueProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',

        justifyContent: 'sleft',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
        {props.title}
      </Typography>

      <Typography sx={{ fontWeight: 400, fontSize: 14, marginLeft: '30px' }}>
        {props.value === undefined || props.value === '' ? '-' : props.value}
      </Typography>
    </Box>
  )
}

export default TitleValue
