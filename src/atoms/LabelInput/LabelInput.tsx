// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Input, TextField, Typography } from '@mui/material'

// Local Imports

interface LabelInputProps {
  label?: string | number
  value?: string | number
  setValue?: any
  sx?: any
  textFieldSx?: any
}

const LabelInput: FC<LabelInputProps> = (props) => {
  return (
    <Box
      sx={{
        margin: 1,
        ...props.sx,
      }}
    >
      {/* <Typography sx={{ fontSize: 14, fontWeight: 400, marginBottom: 1 }}>
        {props.label}
      </Typography> */}
      <TextField
        id="outlined-basic"
        label={props.label}
        variant="outlined"
        sx={{ ...props.textFieldSx }}
        // {...props} 
      />
    </Box>
  )
}

export default LabelInput
