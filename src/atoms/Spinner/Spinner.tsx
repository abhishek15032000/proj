import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { SpinnerProps } from './Spinner.interface'
const Spinner = (props: SpinnerProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress disableShrink size={50} />
    </Box>
  )
}
export default Spinner
