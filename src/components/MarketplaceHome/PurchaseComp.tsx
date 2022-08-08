// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

// Local Imports
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import TextButton from '../../atoms/TextButton/TextButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'


interface PurchaseCompProps {}

const PurchaseComp: FC<PurchaseCompProps> = (props) => {
  return (
    <Box
      sx={{
        height: '300px',
        width: '100%',
        minWidth: '800px',
        borderRadius: '12px',
        border: '2px solid',
        marginTop: 2,
        display: 'flex',
        // margin: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <Box
        sx={{
          borderRight: '2px solid',
          height: '100%',
          width: '50%',
          position: 'relative',
        }}
      >
        <CCTitleValue
          title="Tokens Available for Purchase :"
          value="04"
          fontWeight={600}
          fontSize={16}
          sx={{
            marginTop: 1,
            padding: 1,
            paddingLeft: 2,
            paddingRight: 10,
          }}
        />

        <LabelInput
          label="Quantity"
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 2 }}
          textFieldSx={{ width: '85%' }}
        />

        <CCTitleValue
          title="Unit Price"
          value="144"
          sx={{ padding: 1, paddingLeft: 2, paddingRight: 10 }}
        />

        <CCTitleValue
          title="Total amount to be paid:"
          value="288"
          sx={{ padding: 1, paddingLeft: 2, paddingRight: 10 }}
        />

        <TextButton
          title="Buy"
          sx={{ position: 'absolute', bottom: 15, right: 30 }}
        />
      </Box>

      <Box sx={{ height: '100%', width: '50%', position: 'relative' }}>
        <CCTitleValue
          title="Tokens Available for Sale :"
          value="04"
          fontWeight={600}
          fontSize={16}
          sx={{
            marginTop: 1,
            padding: 1,
            paddingLeft: 2,
            paddingRight: 10,
          }}
        />

        <LabelInput
          label="Quantity"
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 2 }}
          textFieldSx={{ width: '85%' }}
        />

        <LabelInput
          label="Unit Price"
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 2 }}
          textFieldSx={{ width: '85%' }}
        />

        <TextButton
          title="Sell"
          sx={{ position: 'absolute', bottom: 15, right: 30 }}
        />
      </Box>
    </Box>
  )
}

export default PurchaseComp
