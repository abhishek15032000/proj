import { Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../atoms/CCInputField'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setStartDate,
  setFromDate,
  setToDate,
  setBriefOnCreditingPeriod,
} from '../../redux/Slices/sectionASlice'
const SectionA5 = () => {
  const dispatch = useAppDispatch()

  const startDate = useAppSelector(
    ({ sectionA }) => sectionA.startDate,
    shallowEqual
  )

  const fromDate = useAppSelector(
    ({ sectionA }) => sectionA.fromDate,
    shallowEqual
  )
  const toDate = useAppSelector(({ sectionA }) => sectionA.toDate, shallowEqual)
  const brief_on_crediting_period = useAppSelector(
    ({ sectionA }) => sectionA.brief_on_crediting_period,
    shallowEqual
  )

  return (
    <>
      <Typography sx={{ mt: 3 }}> Renewable crediting period:</Typography>
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <DatePicker
            label="Start date of 1st crediting period "
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
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <DatePicker
            label="Crediting from "
            value={fromDate}
            onChange={(newValue) => {
              dispatch(setFromDate(newValue))
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => <CCInputField {...params} />}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <DatePicker
            label="Crediting end "
            value={toDate}
            onChange={(newValue) => {
              dispatch(setToDate(newValue))
            }}
            components={{
              OpenPickerIcon: CalendarMonthOutlinedIcon,
            }}
            renderInput={(params) => <CCInputField {...params} />}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
          <CCMultilineTextArea
            label="Brief on crediting period"
            placeholder="Write a brief on commencement of crediting period"
            value={brief_on_crediting_period}
            onChange={(e) =>
              dispatch(setBriefOnCreditingPeriod(e.target.value))
            }
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SectionA5
