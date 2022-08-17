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
import CCInputField from '../../atoms/CCInputField'

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

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    methodologiesCopy[index] = objectToChange
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
          <Typography
            sx={{ width: '100%', marginY: '10px', marginLeft: '-10pn' }}
          >
            Methodology {index + 1}
          </Typography>
          <Grid
            item
            sx={{ mt: 2 }}
            xs={12}
            md={12}
            lg={12}
            xl={12}
            rowSpacing={1}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Methodology *
              </InputLabel>
              <Select
                placeholder="Select Approved Methodologies"
                sx={{
                  background: 'white',
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
          <Grid
            item
            sx={{ mt: 1 }}
            xs={12}
            md={12}
            lg={12}
            xl={12}
            rowSpacing={1}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Project Type *
              </InputLabel>
              <Select
                placeholder="Select Project Types"
                sx={{
                  background: 'white',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={country}
                label="Project Type *"

                // onChange={handleCountryChange}
              >
                <MenuItem
                  value={'AMS-I.A'}
                  sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                >
                  AMS-I.A
                </MenuItem>
                <MenuItem
                  value={'AMS-I.B'}
                  sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                >
                  AMS-I.B
                </MenuItem>
                <MenuItem
                  value={'AMS-I.C'}
                  sx={{ background: 'rgba(0, 107, 94, 0.12)' }}
                >
                  AMS-I.C
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sx={{ mt: 1 }}
            xs={12}
            md={12}
            lg={12}
            xl={12}
            rowSpacing={1}
          >
            <CCInputField
              label="Category"
              placeholder="Enter Category of Project Type"
              onChange={(e) => handleTextChange(e, index, 'category')}
              sx={{ background: 'white' }}
            />
          </Grid>
          <Grid
            item
            sx={{ mt: 1 }}
            xs={12}
            md={12}
            lg={12}
            xl={12}
            rowSpacing={1}
          >
            <CCInputField
              label="Version"
              placeholder="Enter version of the baseline and monitoring methodology"
              onChange={(e) => handleTextChange(e, index, 'version')}
              sx={{ background: 'white' }}
            />
          </Grid>
          <Grid
            item
            sx={{ mt: 1 }}
            xs={12}
            md={12}
            lg={12}
            xl={12}
            rowSpacing={1}
          >
            <CCInputField
              label="Tools referred"
              placeholder="Enter tools to calculate or determine the baseline and monitoring methodology"
              onChange={(e) => handleTextChange(e, index, 'toolsReferred')}
              sx={{ background: 'white' }}
            />
          </Grid>
          {index + 1 === methodologies.length && (
            <Grid
              item
              sx={{ mt: 2 }}
              xs={12}
              md={12}
              lg={12}
              xl={12}
              rowSpacing={1}
            >
              <CCButton
                sx={{
                  backgroundColor: '#fff',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  color: '#006B5E',
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
