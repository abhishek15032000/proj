// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'

// Local Imports

interface NoDataProps {}

const NoData: FC<NoDataProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 500 }}>No Data</Typography>
    </Box>
  )
}

export default NoData
