// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

interface MarketDepthProps {}

const MarketDepth: FC<MarketDepthProps> = (props) => {
  return (
    <Box sx={{ position: 'absolute', top: -50, width: '100%', }} >
      <Typography
        sx={{
          fontSize: 16,
          width: '100%',
          fontWeight: 600,
          marginTop: 3,
          marginBottom: 2,
        }}
      >
        Market Depth
      </Typography>

      <Box
        sx={{
          width: '100%',
          borderRadius: '12px',
          paddingBottom: 2,
          border: '2px solid',
        }}
      >
        <MarketDepthGen price="Price" qty="Qty" fontWeight={500} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
        <MarketDepthGen price="200" qty="2" fontWeight={400} />
      </Box>
    </Box>
  )
}

const MarketDepthGen: FC<MarketDepthGenProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px',
        // margin: 1,
        ...props.sx,
      }}
    >
      <Box sx={{ width: '50%', paddingLeft: '24px', ...props.textStyle }}>
        <Typography sx={{ fontSize: 14, fontWeight: props.fontWeight }}>
          {props.price}
        </Typography>
      </Box>

      <Box sx={{ width: '50%', paddingLeft: 2, ...props.textStyle }}>
        <Typography sx={{ fontSize: 14, fontWeight: props.fontWeight }}>
          {props.qty}
        </Typography>
      </Box>
    </Box>
  )
}

interface MarketDepthGenProps {
  price?: string | number
  qty?: string | number
  fontWeight?: string | number
  sx?: any
  textStyle?: any
}

export default MarketDepth
