// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Box, Grid, Paper, Typography } from '@mui/material'

// Local Imports
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import TextButton from '../../atoms/TextButton/TextButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { Colors } from '../../theme'

interface PurchaseCompProps {}

const PurchaseComp: FC<PurchaseCompProps> = (props) => {
  return (
    <Box
      sx={{
        height: '300px',
        width: '100%',
        minWidth: '800px',
        borderRadius: '12px',
        marginTop: 2,
        display: 'flex',
        // margin: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          height: '100%',
          width: '50%',
          position: 'relative',
          borderRadius: '4px',
          marginRight: 2,
          paddingBottom: 10,
        }}
      >
        <CCTitleValue
          title="Tokens Available for Purchase :"
          value="04"
          fontWeight={600}
          fontSize={16}
          titleFontColor={Colors.lightPrimary1}
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
          titleFontColor={Colors.darkPrimary1}
          sx={{ padding: 1, paddingLeft: 2, paddingRight: 10 }}
        />

        <CCTitleValue
          title="Total amount to be paid:"
          value="288"
          titleFontColor={Colors.darkPrimary1}
          sx={{ padding: 1, paddingLeft: 2, paddingRight: 10 }}
        />

        <TextButton
          title="Buy"
          sx={{ position: 'absolute', bottom: 25, right: 30 }}
        />
      </Paper>

      <Paper sx={{ height: '100%', width: '50%', position: 'relative', borderRadius: '4px' }}>
        <CCTitleValue
          title="Tokens Available for Sale :"
          value="04"
          fontWeight={600}
          titleFontColor={Colors.lightPrimary1}
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
          sx={{ position: 'absolute', bottom: 25, right: 30 }}
        />
      </Paper>
    </Box>
  )
}

export default PurchaseComp
