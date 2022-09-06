import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import CCInputField from '../../atoms/CCInputField'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setProjectArea,
  setProjectDuration,
  setProjectLocation,
  setProjectName,
  setProjectType,
  setStartDate,
} from '../../redux/Slices/newProjectSlice'
import Spinner from '../../atoms/Spinner'

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
  'Forestry- Avoided conversion/ deforestation',
  'Forestry- Improved forest management',
  'Forestry- Wetland restoration',
  'Afforestation and reforestation',
  'Regenerative agriculture',
]

const ListNewProject = () => {
  const dispatch = useAppDispatch()

  const projectName = useAppSelector(
    ({ newProject }) => newProject.projectName,
    shallowEqual
  )
  const projectType = useAppSelector(
    ({ newProject }) => newProject.projectType,
    shallowEqual
  )
  const projectLocation = useAppSelector(
    ({ newProject }) => newProject.projectLocation,
    shallowEqual
  )
  const startDate = useAppSelector(
    ({ newProject }) => newProject.startDate,
    shallowEqual
  )
  const projectDuration = useAppSelector(
    ({ newProject }) => newProject.projectDuration,
    shallowEqual
  )
  const projectArea = useAppSelector(
    ({ newProject }) => newProject.projectArea,
    shallowEqual
  )
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const handleChange = (event: SelectChangeEvent<typeof projectType>) => {
    const {
      target: { value },
    } = event
    dispatch(
      setProjectType(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      )
    )
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'projectName') {
      dispatch(setProjectName(e?.target?.value))
    } else if (type === 'projectLocation') {
      dispatch(setProjectLocation(e?.target?.value))
    } else if (type === 'projectDuration') {
      //Allow only no.s upto 2 decimal places
      const regexp = /^\d+(\.\d{0,2})?$/
      if (regexp.test(e?.target?.value) || e?.target?.value === '') {
        dispatch(setProjectDuration(e?.target?.value))
      }
    } else if (type === 'projectArea') {
      //Allow only no.s upto 2 decimal places
      const regexp = /^\d+(\.\d{0,2})?$/
      if (regexp.test(e?.target?.value) || e?.target?.value === '') {
        dispatch(setProjectArea(e?.target?.value))
      }
    }
  }

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />{' '}
    </Stack>
  ) : (
    <Grid container xs={12} spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <CCInputField
          label="Project Name"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => handleTextChange(e, 'projectName')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel
            sx={{
              color: '#006B5E',
            }}
          >
            Project Type
          </InputLabel>
          <Select
            multiple
            value={projectType}
            onChange={handleChange}
            input={
              <OutlinedInput
                sx={{
                  color: '#006B5E',
                }}
                label="Project Type"
              />
            }
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
            dispatch(setStartDate(newValue?.toISOString()))
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
        <Box sx={{ position: 'relative' }}>
          <Box>
            <CCInputField
              label="Project Area"
              placeholder="Enter Project Area"
              value={projectArea}
              onChange={(e) => handleTextChange(e, 'projectArea')}
            />
          </Box>
          <Box
            sx={{ color: '#3F4946', position: 'absolute', top: 16, right: 5 }}
          >
            SqKm
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ListNewProject
