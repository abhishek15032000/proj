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
import React, { useEffect } from 'react'
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

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )

  useEffect(() => {
    if (currentProjectDetails?.section_a?.step1?.completed) {
      const { end_date, createdAt } = currentProjectDetails.section_a.step1

      dispatch(setStartDate(createdAt))
      dispatch(setEndDate(end_date))
    }
  }, [])

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
