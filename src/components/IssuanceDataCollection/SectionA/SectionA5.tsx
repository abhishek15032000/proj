import { Grid, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useEffect, useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../../atoms/CCInputField'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setA5 } from '../../../redux/Slices/sectionASlice'
import Spinner from '../../../atoms/Spinner'
import moment from 'moment'

const SectionA5 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const A5 = useAppSelector(({ sectionA }) => sectionA.A5, shallowEqual)
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )
  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step5.completed
    ) {
      const { credit_start_period, credit_period, credit_period_description } =
        currentProjectDetails.section_a.step5
      dispatch(
        setA5({
          name: 'credit_start_period',
          value: credit_start_period ? credit_start_period : '',
        })
      )
      dispatch(
        setA5({
          name: ['credit_period', 'start_date'],
          value: credit_period.start_date,
        })
      )
      dispatch(
        setA5({
          name: ['credit_period', 'end_date'],
          value: credit_period.end_date,
        })
      )
      dispatch(
        setA5({
          name: 'credit_period_description',
          value: credit_period_description,
        })
      )
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <>
      <Typography sx={{ mt: 3 }}> Renewable crediting period:</Typography>
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <DatePicker
            label="Start date of 1st crediting period "
            value={A5.credit_start_period}
            onChange={(newValue) => {
              dispatch(
                setA5({
                  name: 'credit_start_period',
                  value: newValue?._isValid ? newValue.toISOString() : '',
                })
              )
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
            value={A5.credit_period.start_date}
            onChange={(newValue) => {
              dispatch(
                setA5({
                  name: ['credit_period', 'start_date'],
                  value: newValue?._isValid ? newValue.toISOString() : '',
                })
              )
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
            value={A5.credit_period.end_date}
            onChange={(newValue) => {
              if (
                moment(newValue).diff(moment(A5.credit_period.start_date)) > 0
              ) {
                dispatch(
                  setA5({
                    name: ['credit_period', 'end_date'],
                    value: newValue?._isValid ? newValue.toISOString() : '',
                  })
                )
              } else {
                alert('End date shoud be greater than start date')
              }
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
            value={A5.credit_period_description}
            name={'credit_period_description'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA5({ value, name }))
            }
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SectionA5
