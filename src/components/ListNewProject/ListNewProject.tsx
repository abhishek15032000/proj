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
  'AFOLU (Agriculture and Forestry Projects) projects',
  'Afforestation, Reforestation and Revegetation (ARR)',
  'Renewable energy- Biomass/Biogas',
  'Reduced Emissions from Deforestation and Degradation (REDD)',
]

const ListNewProject = () => {
  const [progress, setProgress] = useState(10)
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
      <Grid
        container
        md={12}
        lg={10}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Grid item container alignItems={'center'} xs={6}>
          <ArrowBackIcon />
          <Typography sx={{ fontSize: 20, fontWeight: 500, color: '#F15D5F' }}>
            List Project
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid
            container
            justifyContent={'space-between'}
            sx={{ width: '100%', mr: 1, color: Colors.darkPrimary1 }}
          >
            <Grid item xs={12} md={6}>
              <Typography>Progress</Typography>
            </Grid>
            <Grid item xs={12} md={6} alignSelf={'end'}>
              <Typography sx={{ textAlign: 'right' }}>{progress}%</Typography>
            </Grid>
          </Grid>
          <LinearProgress
            sx={{ marginTop: '4px' }}
            color="inherit"
            variant="determinate"
            value={progress}
          />
        </Grid>
      </Grid>
      <Grid
        container
        md={12}
        lg={10}
        justifyContent={'space-between'}
        sx={{ mt: 2 }}
        alignItems={'center'}
      >
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#1D4B44' }}>
            Project Introduction
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <CCButton
            sx={{
              color: '#fff',
              padding: '8px 15px',
              width: '100%',
              minWidth: 0,
            }}
            variant="contained"
            onClick={handleSaveAndNext}
          >
            Save & Next
          </CCButton>
        </Grid>
      </Grid>
      <Grid container md={12} lg={10} spacing={2} sx={{ mt: 2 }}>
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
                background: '#DAE5E1',
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
              {projectTypes.map((projectType) => (
                <MenuItem key={projectType} value={projectType}>
                  <Checkbox checked={projectType.indexOf(projectType) > -1} />
                  <ListItemText primary={projectType} />
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <CCInputField
            label="Duration of the Project"
            placeholder="Enter Project Duration"
            value={projectDuration}
            onChange={(e) => handleTextChange(e, 'projectDuration')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
