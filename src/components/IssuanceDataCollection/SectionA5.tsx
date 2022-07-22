import { Grid, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

const SectionA5 = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)

  return (
    <>
      <Typography sx={{ mt: 3 }}>Type: Renewable crediting period</Typography>
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item xs={12} lg={5}>
          <DatePicker
            label="Potential Start date of first crediting period *"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                placeholder="Enter start date"
                InputLabelProps={{ style: { color: '#006B5E', fontSize: 13 } }}
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                {...params}
                variant="filled"
                color="darkPrimary1"
              />
            )}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <DatePicker
            label="Crediting period From *"
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                InputLabelProps={{ style: { color: '#006B5E', fontSize: 13 } }}
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                {...params}
                variant="filled"
                color="darkPrimary1"
              />
            )}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <DatePicker
            label="Crediting period To *"
            value={toDate}
            onChange={(newValue) => {
              setToDate(newValue)
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                placeholder="Enter start date"
                InputLabelProps={{ style: { color: '#006B5E', fontSize: 13 } }}
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                {...params}
                variant="filled"
                color="darkPrimary1"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SectionA5
