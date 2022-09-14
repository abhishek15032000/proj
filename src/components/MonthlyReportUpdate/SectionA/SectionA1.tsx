import { Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState, useEffect } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../../atoms/CCInputField'
import CCTextarea from '../../../atoms/CCTextarea'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { authCalls } from '../../../api/authCalls'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setTotalGHGEmission } from '../../../redux/Slices/MonthlyReport/sectionAMonthly'
import { setCurrentProjectDetails } from '../../../redux/Slices/MonthlyReportUpdate'
const SectionA1 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )

  useEffect(() => {
    if (currentProjectDetails?.section_a?.step1?.completed) {
      const { total_GHG_emission } = currentProjectDetails.section_a.step1

      dispatch(setTotalGHGEmission(total_GHG_emission))
    }
  }, [])

  const total_GHG_emission = useAppSelector(
    ({ sectionAMonthly }) => sectionAMonthly.total_GHG_emission,
    shallowEqual
  )

  return (
    <Grid container sx={{ mt: 3 }} spacing={1} xs={12} md={12} lg={12} xl={12}>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CCMultilineTextArea
          label={
            '   Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period'
          }
          placeholder="(Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved during this monitoring period.)"
          value={total_GHG_emission}
          onChange={(e) => dispatch(setTotalGHGEmission(e.target.value))}
        />
      </Grid>
    </Grid>
  )
}

export default SectionA1
