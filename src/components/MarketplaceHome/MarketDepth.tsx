// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'
import { Colors } from '../../theme'

interface MarketDepthProps {}

const MarketDepth: FC<MarketDepthProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Paper
        sx={{
          p: 2,
          width: '100%',
          borderRadius: '12px',
        }}
      >
        <Typography sx={{ fontSize: 18, color: Colors.darkPrimary1 }}>
          Market Sell Orders
        </Typography>
        <Grid
          container
          sx={{
            fontSize: 14,
            fontWeight: 500,
            bgcolor: '#CCE8E1',
            borderRadius: 2,
            px: 1,
            mt: 2,
          }}
        >
          <Grid item xs={6}>
            Price <br />
            (USD)
          </Grid>
          <Grid item xs={6}>
            Quantity <br />(VCOT)
          </Grid>
        </Grid>
        {rows &&
          rows.length &&
          rows?.map(({ price = '', quantity = '' }, index) => (
            <Row key={index} index={index} price={price} quantity={quantity} />
          ))}
      </Paper>
    </Box>
  )
}

interface RowProps {
  price: string
  quantity: string
  index: number
}
const Row: FC<RowProps> = ({ price = '', quantity = '', index }) => {
  return (
    <Grid
      container
      sx={{
        background:
          index % 2 === 0
            ? Colors.white
            : 'linear-gradient(0deg, rgba(0, 107, 94, 0.05), rgba(0, 107, 94, 0.05)), #FAFDFA',
        fontSize: 14,
        fontWeight: 500,
        px: 1,
        py: 2,
        borderRadius: 2,
      }}
    >
      <Grid item xs={6}>
        {price}
      </Grid>
      <Grid item xs={6}>
        {quantity}
      </Grid>
    </Grid>
  )
}
const rows = [
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
  { price: '200', quantity: '2' },
]

export default MarketDepth
