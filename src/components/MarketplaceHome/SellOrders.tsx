// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

// Local Imports
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'

interface SellOrdersProps {}

const SellOrders: FC<SellOrdersProps> = (props) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: 16,
          width: '100%',
          fontWeight: 600,
          marginTop: 3,
          marginBottom: 1,
        }}
      >
        Sell Orders
      </Typography>

      <CCTable headings={headings} rows={rows} maxWidth={900} />
    </>
  )
}

export default SellOrders

const rows = [
  [
    '200',
    '11 July, 2022',
    '19:21:28',
    '50',
    '30',
    '1500',
    '10',

    <Box
      key={'1'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <TextButton
        title="Modify"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />

      <TextButton
        title="Cancel"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
          backgroundColor: '#EEE',
        }}
        textStyle={{
          fontSize: 14,
          color: 'black',
        }}
      />
    </Box>,
  ],
  [
    '200',
    '11 July, 2022',
    '19:21:28',
    '50',
    '30',
    '1500',
    '10',

    <Box
      key={'1'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <TextButton
        title="Modify"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />

      <TextButton
        title="Cancel"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
          backgroundColor: '#EEE',
        }}
        textStyle={{
          fontSize: 14,
          color: 'black',
        }}
      />
    </Box>,
  ],
  [
    '200',
    '11 July, 2022',
    '19:21:28',
    '50',
    '30',
    '1500',
    '10',

    <Box
      key={'1'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <TextButton
        title="Modify"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />

      <TextButton
        title="Cancel"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
          backgroundColor: '#EEE',
        }}
        textStyle={{
          fontSize: 14,
          color: 'black',
        }}
      />
    </Box>,
  ],
  [
    '200',
    '11 July, 2022',
    '19:21:28',
    '50',
    '30',
    '1500',
    '10',
    <Box
      key={'1'}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <TextButton
        title="Modify"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />

      <TextButton
        title="Cancel"
        sx={{
          height: '40px',
          width: '100px',
          borderRadius: '24px',
          margin: 0.5,
          backgroundColor: '#EEE',
        }}
        textStyle={{
          fontSize: 14,
          color: 'black',
        }}
      />
    </Box>,
  ],
]

const headings = [
  'Order ID',
  'Date',
  'Time',
  'Quantity',
  'Unit Price',
  'Total Amount',
  'Quantity Left',
  'Action',
]
