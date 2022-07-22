import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CCButton from '../../atoms/CCButton'
import CCTextField from '../../atoms/CCTextField'

interface methodologiesInterface {
  approvedMethodologies: string
  projectType: string
  category: string
  version: string
  toolsReferred: string
}

const SectionA4 = () => {
  const [methodologies, setMethodologies] = useState<methodologiesInterface[]>([
    {
      approvedMethodologies: '',
      projectType: '',
      category: '',
      version: '',
      toolsReferred: '',
    },
  ])

  const addMethodology = () => {
    const methodologiesCopy = [...methodologies]
    methodologiesCopy.push({
      approvedMethodologies: '',
      projectType: '',
      category: '',
      version: '',
      toolsReferred: '',
    })
    setMethodologies(methodologiesCopy)
  }
  return (
    <>
      <Typography sx={{ mt: 3 }}>
        The methodologies applied for the project activity under consideration
        are-
      </Typography>
      {methodologies.map((methodology, index) => (
        <Grid key={index} container>
          <Grid item sx={{ mt: 2 }} xs={12} lg={10} rowSpacing={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Methodology *
              </InputLabel>
              <Select
                placeholder="Select Approved Methodologies"
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={country}
                label="Select Methodology *"
                // onChange={handleCountryChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12} lg={10} rowSpacing={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Project Type *
              </InputLabel>
              <Select
                placeholder="Select Project Types"
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={country}
                label="Project Type *"
                // onChange={handleCountryChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12} lg={10} rowSpacing={1}>
            <CCTextField
              label="Category *"
              placeholder="Enter Category of Project Type"
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12} lg={10} rowSpacing={1}>
            <CCTextField
              label="Version *"
              placeholder="Enter version of the baseline and monitoring methodology"
            />
          </Grid>
          <Grid item sx={{ mt: 1 }} xs={12} lg={10} rowSpacing={1}>
            <CCTextField
              label="Tools referred *"
              placeholder="Enter tools to calculate or determine the baseline and monitoring methodology"
            />
          </Grid>
          {index + 1 === methodologies.length && (
            <Grid item sx={{ mt: 2 }} xs={12} lg={10} rowSpacing={1}>
              <CCButton
                sx={{
                  color: '#fff',
                  padding: '8px 15px',
                  borderRadius: '20px',
                }}
                variant="contained"
                onClick={addMethodology}
              >
                + Add More Methodology
              </CCButton>
            </Grid>
          )}
        </Grid>
      ))}
    </>
  )
}

export default SectionA4
