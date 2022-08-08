import { InputAdornment, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { CCInputFieldProps } from './CCInputField.interface'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const CCInputField = (props: CCInputFieldProps) => {
  const inputRef = useRef<any>(null)

  return (
    <TextField
      variant="outlined"
      inputRef={inputRef}
      fullWidth
      sx={{
        // background: '#DAE5E1',
        color: '#006B5E',
        borderRadius: '4px 4px 0 0',
      }}
      InputProps={{
        endAdornment: props?.defaultValue ? (
          <InputAdornment
            position="end"
            onClick={() => {
              inputRef.current.value = null
              props.clearFn()
            }}
          >
            <CancelOutlinedIcon sx={{ cursor: 'pointer' }} />
          </InputAdornment>
        ) : null,
      }}
      InputLabelProps={{ style: { color: '#006B5E' } }}
      color="darkPrimary1"
      required
      {...props}
    />
  )
}
export default CCInputField
