import { Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../atoms/CCInputField'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'

const SectionA5 = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)

  return (
    <>
      <Typography sx={{ mt: 3 }}> Renewable crediting period:</Typography>
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item xs={12} lg={5}>
          <DatePicker
            label="Start date of 1st crediting period "
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
        <Grid item xs={6} lg={3}>
          <DatePicker
            label="Crediting from "
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => <CCInputField {...params} />}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <DatePicker
            label="Crediting end "
            value={toDate}
            onChange={(newValue) => {
              setToDate(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => <CCInputField {...params} />}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <CCMultilineTextArea
            label="Brief on crediting period"
            placeholder="Write a brief on commencement of crediting period"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SectionA5
