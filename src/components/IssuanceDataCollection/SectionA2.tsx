import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CCButton from '../../atoms/CCButton'
import CCTextField from '../../atoms/CCTextField'

interface abc {
  latitude: string
  longitude: string
}

const SectionA2 = () => {
  const [country, setCountry] = React.useState('')
  const [state, setState] = React.useState('')
  const [pincodes, setPincodes] = React.useState([''])

  const [coordinates, setCoordinates] = useState<abc[]>([
    { latitude: '', longitude: '' },
  ])

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value)
  }
  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value)
  }

  const addPincode = () => {
    const pincodesCopy = [...pincodes]
    pincodesCopy.push('')
    setPincodes(pincodesCopy)
  }

  const handlePincodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const pincodesCopy = [...pincodes]
    pincodesCopy[index] = e.target.value
    setPincodes(pincodesCopy)
  }

  const addCoordinates = () => {
    const coordinatesCopy = [...coordinates]
    coordinatesCopy.push({ latitude: '', longitude: '' })
    setCoordinates(coordinatesCopy)
  }

  const handleCoordinatesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    coordinateType: string
  ) => {
    const coordinatesCopy = [...coordinates]
    const temp = coordinatesCopy[index]
    if (coordinateType === 'latitude') {
      temp.latitude = e.target.value
    } else {
      temp.longitude = e.target.value
    }
    setCoordinates(coordinatesCopy)
  }

  return (
    <>
      <Grid
        container
        sx={{ width: '100%', mt: 2 }}
        columnSpacing={{ xs: 0, md: 1 }}
        rowSpacing={1}
        xs={12}
        lg={10}
      >
        <Grid item xs={12} md={6} lg={5}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              sx={{
                background: '#DAE5E1',
                color: '#006B5E',
                borderRadius: '4px 4px 0 0',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={handleCountryChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              // MenuProps={{
              //   sx: {
              //     '&& .Mui-selected': {
              //       backgroundColor: 'pink',
              //     },
              //   },
              // }}
              sx={{
                background: '#DAE5E1',
                color: '#006B5E',
                borderRadius: '4px 4px 0 0',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="State"
              onChange={handleStateChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <CCTextField label="City/Town/District *" />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <CCTextField label="Village *" />
        </Grid>
      </Grid>
      {pincodes.map((pincode, index) => (
        <Grid
          key={index}
          sx={{ mt: 1 }}
          container
          alignItems={'center'}
          spacing={1}
          lg={10}
        >
          <Grid item xs={12} md={6} lg={5}>
            <CCTextField
              label="Pincode *"
              value={pincode}
              onChange={(e) => handlePincodeChange(e, index)}
            />
          </Grid>
          {index + 1 === pincodes.length && (
            <Grid item xs={12} md={6} lg={5}>
              <CCButton
                sx={{
                  color: '#fff',
                  padding: '2px 2px',
                  borderRadius: '14px',
                }}
                variant="contained"
                onClick={addPincode}
              >
                + Add Pincode
              </CCButton>
            </Grid>
          )}
        </Grid>
      ))}
      <Typography sx={{ mt: 2 }}>GPS Coordinates</Typography>
      {coordinates.map((coordinate, index) => (
        <Grid key={index} container spacing={1} lg={10}>
          <Grid item xs={12} md={6} lg={5}>
            <CCTextField
              label="Latitude"
              name="latitude"
              value={coordinate.latitude}
              onChange={(e) => handleCoordinatesChange(e, index, 'latitude')}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <CCTextField
              label="Longitude"
              name="longitude"
              value={coordinate.longitude}
              onChange={(e) => handleCoordinatesChange(e, index, 'longitude')}
            />
          </Grid>
        </Grid>
      ))}
      <Grid container sx={{ mt: 1 }} spacing={1} lg={10}>
        <Grid item xs={12} md={6} lg={5}>
          <CCButton
            sx={{ color: '#fff', padding: '2px 2px', borderRadius: '14px' }}
            variant="contained"
            onClick={addCoordinates}
          >
            + Add Coordinates
          </CCButton>
        </Grid>
      </Grid>
    </>
  )
}

export default SectionA2
