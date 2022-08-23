import {
  Box,
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
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setMethodologies } from '../../redux/Slices/sectionASlice'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
interface methodologiesInterface {
  approvedMethodologies: string
  projectType: string
  category: string
  version: string
  toolsReferred: string
}

const SectionA4 = () => {
  const dispatch = useAppDispatch()

  const methodologies = useAppSelector(
    ({ sectionA }) => sectionA.methodologies,
    shallowEqual
  )
  const addMethodology = () => {
    const methodologiesCopy = [...methodologies]
    methodologiesCopy.push({
      approvedMethodologies: '',
      projectType: '',
      category: '',
      version: '',
      toolsReferred: '',
      flag: false,
    })
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleTextChange = (e: any, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleDropDownChange = (e: boolean, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  return (
    <>
      <Typography sx={{ mt: 3 }}>
        The methodologies applied for the project activity under consideration
        are-
      </Typography>

      {methodologies.map((item, index) => (
        <Grid
          key={index}
          container
          sx={{
            border: ' 1px solid #1d4b44',
            borderRadius: '8px',
            padding: '20px',
            marginY: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingX: '5px',
            }}
          >
            <Typography
              sx={{ width: '100%', marginY: '10px', marginLeft: '-10pn' }}
            >
              Methodology {index + 1}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => handleDropDownChange(!item?.flag, index, 'flag')}
            >
              {item?.flag ? <ArrowDropUp /> : <ArrowDropDown />}
            </Box>
          </Box>
          {item?.flag && (
            <>
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
                    label="Select Methodology *"
                    value={item?.approvedMethodologies}
                    onChange={(e) =>
                      handleTextChange(e, index, 'approvedMethodologies')
                    }
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
                    value={item?.projectType}
                    onChange={(e) => handleTextChange(e, index, 'projectType')}
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
                  value={item?.category}
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
                  value={item?.version}
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
                  value={item?.toolsReferred}
                  onChange={(e) => handleTextChange(e, index, 'toolsReferred')}
                  sx={{ background: 'white' }}
                />
              </Grid>
            </>
          )}
        </Grid>
      ))}
      <Grid item sx={{ mt: 2 }} xs={12} md={12} lg={12} xl={12} rowSpacing={1}>
        <CCButton
          sx={{
            backgroundColor: '#F6F9F7',
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
    </>
  )
}

export default SectionA4
