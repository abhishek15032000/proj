import { InputAdornment, TextField } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import React from 'react'
import { CCTextFieldProps } from './CCTextField.interface'

const CCTextField = (props: CCTextFieldProps) => {
  return (
    <TextField
      multiline
      fullWidth
      label={props.label}
      onChange={props.onChange}
      placeholder={props.placeholder || props.label}
      value={props.value}
      name={props.name}
      sx={{
        background: '#DAE5E1',
        color: '#006B5E',
        borderRadius: '4px 4px 0 0',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <CancelOutlinedIcon
              sx={{ cursor: 'pointer', marginBottom: '20px' }}
            />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{ style: { color: '#006B5E' } }}
      color="darkPrimary1"
      variant="filled"
    />
  )
}
export default CCTextField
