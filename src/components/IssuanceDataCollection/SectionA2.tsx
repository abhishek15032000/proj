import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'

interface coordinatesInterface {
  latitude: string
  longitude: string
}

const SectionA2 = () => {
  const [country, setCountry] = React.useState('')
  const [state, setState] = React.useState('')
  const [pincodes, setPincodes] = React.useState<string>('')
  const [city, setCity] = React.useState<string>('')
  const [landmark, setLandmark] = React.useState<string>('')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [coordinates, setCoordinates] = useState<coordinatesInterface[]>([
    { latitude: '', longitude: '' },
  ])

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value)
  }
  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value)
  }

  const onSubmitSectionA = async () => {
    const payload = { _id: '', uuid: '', project_id: '', step2: {} }
    payload._id = 'step2'
    payload.uuid = 'b04782d3-2d4a-4f8d-9854-0deac633b1e4'
    payload.project_id = 'step12355'
    payload.step2 = {
      country: country,
      state: state,
      city: city,
      pincode: pincodes,
      landmark: landmark,
      file_attach: [''],
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionACall(payload)
      if (res?.success && res?.data) {
        console.log('res', res)
      } else if (res?.error) {
        alert(res?.error)
      }
    } catch (e: any) {
      console.log('Error in authCalls.loginCall api', e)
    }
  }

  return (
    <>
      <Grid
        container
        sx={{ width: '100%', mt: 3 }}
        columnSpacing={{ xs: 0, md: 1 }}
        rowSpacing={1}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid item sx={{ mt: 1 }} xs={12} md={12} lg={12} xl={12}>
          <Typography>Location of the project activity</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              sx={{
                background: ' #FFFFFF',
                color: '#006B5E',
                borderRadius: '4px 4px 0 0',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={handleCountryChange}
            >
              <MenuItem value={'india'}>India</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Region/ State/ Province
            </InputLabel>
            <Select
              // MenuProps={{
              //   sx: {
              //     '&& .Mui-selected': {
              //       backgroundColor: 'pink',
              //     },
              //   },
              // }}
              sx={{
                background: ' #FFFFFF',
                color: '#006B5E',
                borderRadius: '4px 4px 0 0',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label=" Region/ State/ Province"
              onChange={handleStateChange}
            >
              <MenuItem value={'maharashtra'}>Maharashtra</MenuItem>
              <MenuItem value={'karnataka'}>Karnataka</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="City/Town/District"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={city}
            onChange={(value) => setCity(value)}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Landmark"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={landmark}
            onChange={(e) => setLandmark(e)}
          />
        </Grid>
      </Grid>

      <Grid
        sx={{ mt: 1 }}
        container
        alignItems={'center'}
        spacing={1}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Pincode"
            value={pincodes}
            sx={{ backgroundColor: ' #FFFFFF' }}
            onChange={(e) => setPincodes(e)}
          />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ mt: 1 }}
        spacing={1}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Typography>Upload location map images</Typography>
        <Grid container rowSpacing={2} columnSpacing={2} alignItems={'center'}>
          {selectedImages &&
            selectedImages.length > 0 &&
            selectedImages.map((image, index) => (
              <Grid item key={index} xs={12} md={12} lg={12} xl={12}>
                <Box sx={{ height: '200px', border: '2px solid black' }}>
                  {<img src={image} width={'100%'} height="100%" />}
                </Box>
              </Grid>
            ))}
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            justifyContent="center"
            alignItems={'center'}
            direction="column"
          >
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-evenly"
              sx={{
                border: '2px solid black',
                borderStyle: 'dashed',
                height: 190,
              }}
            >
              {/* <AddIcon fontSize="large" /> */}
              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  if (event?.target?.files?.length) {
                    const selectedFile = event.target.files[0]
                    console.log('selectedFile', selectedFile)
                    const objectUrl = URL.createObjectURL(selectedFile)
                    if (objectUrl) {
                      const selectedImagesCopy = [...selectedImages]
                      selectedImagesCopy.push(objectUrl)
                      setSelectedImages(selectedImagesCopy)
                    }
                  }
                }}
              />
            </Stack>
          </Grid>
          <Grid item spacing={1} xs={12} md={12} lg={12} xl={12}>
            <CCButton
              sx={{
                padding: '8px 15px',
                width: '100%',
                minWidth: 0,
              }}
              variant="contained"
            >
              Upload
            </CCButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default SectionA2
