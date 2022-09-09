import { InputAdornment, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { CCMultilineTextAreaProps } from './CCMultilineTextArea.interface'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const CCMultilineTextArea = (props: CCMultilineTextAreaProps) => {
  const inputRef = useRef<any>(null)

  return (
    <TextField
      inputRef={inputRef}
      inputProps={{ 'data-testid': 'cc-input-field-multiline' }}
      multiline
      minRows={6}
      fullWidth
      sx={{
        background: '#FFFFFF',
        color: '#3F4946',
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
      color={props?.color ? props?.color : 'darkPrimary1'}
      required
      {...props}
    />
  )
}
export default CCMultilineTextArea
