import { Box } from '@mui/material'
import React from 'react'
import Spinner from '../../atoms/Spinner'
import { LoderOverlayProps } from './LoderOverlay.interface'
const LoderOverlay = (props: LoderOverlayProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgb(218 247 240 / 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
      }}
    >
      <Spinner />
    </Box>
  )
}
export default LoderOverlay
