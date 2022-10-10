// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, Paper } from '@mui/material'

// Local Imports
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'
import CardRow from './CardRow'

interface PurchaseCompProps {}

const PurchaseComp: FC<PurchaseCompProps> = (props) => {
  return (
    <Grid container mt={2} columnSpacing={2}>
      <Grid item xs={6}>
        <Paper
          sx={{
            height: '100%',
            borderRadius: '4px',
            p: 2,
          }}
        >
          <CardRow
            title="Tokens Available for Purchase :"
            titleStyle={{
              color: Colors.lightPrimary1,
              fontSize: 16,
              fontWeight: 600,
            }}
            valueStyle={{
              fontSize: 16,
              fontWeight: 600,
            }}
            value="04 VCOT"
          />
          <LabelInput label="Quantity" sx={{ width: '100%' }} />
          <CardRow title="Unit Price :" value="04 USD" />
          <CardRow title="Total amount to be paid :" value="24 USD" />
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CCButton
              sx={{
                mt: 3,
                alignSelf: 'end',
                bgcolor: Colors.darkPrimary1,
                color: Colors.white,
                padding: '8px 24px',
                borderRadius: '30px',
                fontSize: 14,
                minWidth: '120px',
              }}
            >
              Buy
            </CCButton>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper
          sx={{
            height: '100%',
            borderRadius: '4px',
            p: 2,
          }}
        >
          <CardRow
            title="Tokens Available for Sale :"
            titleStyle={{
              color: Colors.lightPrimary1,
              fontSize: 16,
              fontWeight: 600,
            }}
            valueStyle={{
              fontSize: 16,
              fontWeight: 600,
            }}
            value="04 VCOT"
          />
          <LabelInput label="Quantity" />

          <LabelInput label="Unit Price" />

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <CCButton
              sx={{
                mt: 3,
                alignSelf: 'end',
                bgcolor: Colors.darkPrimary1,
                color: Colors.white,
                padding: '8px 24px',
                borderRadius: '30px',
                fontSize: 14,
                minWidth: '120px',
              }}
            >
              Sell
            </CCButton>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default PurchaseComp
