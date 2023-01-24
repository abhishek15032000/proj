import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CardRow from '../../atoms/CardRow/CardRow'
import CCButton from '../../atoms/CCButton'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { Colors } from '../../theme'

const BuyComp = () => {
  return (
    <Grid item sm={12} md={10}>
      <CardRow
        title="Wallet Balance for Purchase :"
        value={`${0} INR`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <CardRow
        title="Approved Token(INR/USD) Balance :"
        value={`${0} INR`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <CardRow
        title="Balance on Exchange :"
        value={`${0} INR`}
        titleStyle={{ color: Colors.lightPrimary1 }}
      />
      <Box sx={{ position: 'relative', pt: 1 }}>
        <Box>
          <LabelInput
            label="Quantity "
            sx={{ width: '100%' }}
            // value={buyQuantityForApprove}
            setValue={(e: any) => {
              //Allow only no.s upto 3 decimal places
              const regexp = /^\d+(\.\d{0,3})?$/
              if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                // dispatch(setBuyQuantityForApprove(e?.target?.value))
              }
            }}
          />
        </Box>
        <Box
          sx={{
            color: '#3F4946',
            position: 'absolute',
            top: '50%',
            right: 10,
          }}
        >
          INR
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <CCButton
          sx={{
            mt: 3,
            alignSelf: 'end',
            bgcolor: Colors.textColorLightGreen,
            color: Colors.white,
            padding: '8px 40px',
            borderRadius: '30px',
            fontSize: 14,
            minWidth: 0,
          }}
          // onClick={onApproveToken}
          // disabled={isThereApproveObject() || !buyQuantityForApprove}
          variant="contained"
        >
          Buy
        </CCButton>
      </Box>
    </Grid>
  )
}

export default BuyComp
