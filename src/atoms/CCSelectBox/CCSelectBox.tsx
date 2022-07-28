import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { CCSelectBoxProps } from './CCSelectBox.interface'

const CCSelectBox = (props: CCSelectBoxProps) => {
  const [age, setAge] = React.useState('Wallet')

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value)
  // }

  return (
    <FormControl
      variant="outlined"
      fullWidth
      sx={{
        background: '#DAE5E1',
        color: '#006B5E',
        borderRadius: '4px 4px 0 0',
      }}
    >
      {props.label && (
        <InputLabel id="demo-simple-select-label" sx={{ color: '#006B5E' }}>
          {props.label}
        </InputLabel>
      )}
      <Select
        // onChange={props.handleChange}
        labelId="demo-simple-select-label"
        displayEmpty
        inputProps={{ 'aria-label': 'Without label', color: '#006B5E' }}
        {...props}
      >
        {props?.items?.map((item: any, index: number) => {
          return (
            <MenuItem
              key={index.toString()}
              value={item.value}
              sx={{ color: '#006B5E' }}
            >
              {item.value}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default CCSelectBox
