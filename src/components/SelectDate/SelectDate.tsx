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
import { setEndDate, setStartDate } from '../../redux/Slices/SelectDateSlice'

const SelectDate = () => {
  const dispatch = useAppDispatch()

  const startDate = useAppSelector(
    ({ selectDate }) => selectDate.startDate,
    shallowEqual
  )

  const endDate = useAppSelector(
    ({ selectDate }) => selectDate.endDate,
    shallowEqual
  )

  // const handleChange = (event: SelectChangeEvent<typeof projectType>) => {
  //   const {
  //     target: { value },
  //   } = event
  //   dispatch(
  //     setProjectType(
  //       // On autofill we get a stringified value.
  //       typeof value === 'string' ? value.split(',') : value
  //     )
  //   )
  // }

  // const handleTextChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   type: string
  // ) => {
  //   if (type === 'projectName') {
  //     dispatch(setProjectName(e?.target?.value))
  //   } else if (type === 'projectLocation') {
  //     dispatch(setProjectLocation(e?.target?.value))
  //   } else if (type === 'projectDuration') {
  //     //Allow only no.s upto 2 decimal places
  //     const regexp = /^\d+(\.\d{0,2})?$/
  //     if (regexp.test(e?.target?.value) || e?.target?.value === '') {
  //       dispatch(setProjectDuration(e?.target?.value))
  //     }
  //   } else if (type === 'projectArea') {
  //     //Allow only no.s upto 2 decimal places
  //     const regexp = /^\d+(\.\d{0,2})?$/
  //     if (regexp.test(e?.target?.value) || e?.target?.value === '') {
  //       dispatch(setProjectArea(e?.target?.value))
  //     }
  //   }
  // }

  return (
    <Grid container xs={12} spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            dispatch(setStartDate(newValue))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => <CCInputField {...params} />}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            dispatch(setEndDate(newValue))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => <CCInputField {...params} />}
        />
      </Grid>
    </Grid>
  )
}

export default SelectDate
