import {
  createTheme,
  InputAdornment,
  TextField,
  ThemeProvider,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { CCInputFieldProps } from './CCInputField.interface'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { initialState } from '../../redux/Slices/themeSlice'

const CCInputField = (props: CCInputFieldProps) => {
  const inputRef = useRef<any>(null)

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: 'red',
          },
        },
      },
    },
    ...initialState,
  })
  return (
    <ThemeProvider theme={theme}>
      <TextField
        inputProps={{ 'data-testid': 'cc-input-field' }}
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
        InputLabelProps={{
          style: { color: props?.disabled ? '#BFC9C6' : '#006B5E' },
        }}
        color={props?.color ? props?.color : 'darkPrimary1'}
        required={props?.notRequired ? false : true}
        {...props}
      />
    </ThemeProvider>
  )
}
export default CCInputField
