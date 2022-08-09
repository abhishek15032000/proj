import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { Colors } from '../../theme'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { Box } from '@mui/system'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const projectTypes = [
  'Methane Destruction- Landfill gas',
  'Methane Destruction- Livestock',
  'Methane Destruction- Coal mine methane',
  'Methane Avoidance',
  'Methane capture',
  'Industrial gases- ODS',
  'Industrial gases- ODS',
  'Forestry- Avoided conversion/ deforestation',
  'Forestry- Improved forest management',
  'Forestry- Wetland restoration',
  'Afforestation and reforestation',
  'Regenerative agriculture',
]

const ListNewProject = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [projectType, setProjectType] = useState<string[]>([])
  const [companyName, setCompanyName] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [projectDuration, setProjectDuration] = useState('')
  const [projectArea, setProjectArea] = useState('')

  const handleChange = (event: SelectChangeEvent<typeof projectType>) => {
    const {
      target: { value },
    } = event
    setProjectType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  console.log('projectType', projectType)

  const handleSaveAndNext = () => {
    console.log('Handle Save And Next button clicked')
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'companyName') {
      setCompanyName(e?.target?.value)
    } else if (type === 'projectLocation') {
      setProjectLocation(e?.target?.value)
    } else if (type === 'projectDuration') {
      setProjectDuration(e?.target?.value)
    } else if (type === 'projectArea') {
      setProjectArea(e?.target?.value)
    }
  }

  return (
    <>
      <Grid container xs={12} spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <CCInputField
            label="Company Name/ Project Name"
            placeholder="Enter Company/ Project Name"
            value={companyName}
            onChange={(e) => handleTextChange(e, 'companyName')}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={projectType}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              sx={{
                color: '#006B5E',
                borderRadius: '4px 4px 0 0',
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Box
                      key={value}
                      sx={{
                        display: 'flex',
                        backgroundColor: '#1D4B44',
                        color: '#fff',
                        borderRadius: '16px',
                        fontSize: 14,
                        py: 1,
                        px: 2,
                      }}
                    >
                      <Typography>{value}</Typography>
                      <CancelPresentationIcon sx={{ ml: 1 }} />
                    </Box>
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {projectTypes.map((item) => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={projectType.includes(item)} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <CCInputField
            label="Project Location"
            placeholder="Enter Project Location"
            value={projectLocation}
            onChange={(e) => handleTextChange(e, 'projectLocation')}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => <CCInputField {...params} />}
          />
        </Grid>
        <Grid item xs={12}>
          <CCInputField
            label="Duration of the Project"
            placeholder="Enter Project Duration"
            value={projectDuration}
            onChange={(e) => handleTextChange(e, 'projectDuration')}
          />
        </Grid>
        <Grid item xs={12}>
          <CCInputField
            label="Project Area"
            placeholder="Enter Project Area"
            value={projectArea}
            onChange={(e) => handleTextChange(e, 'projectArea')}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ListNewProject
