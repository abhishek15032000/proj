import { Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../atoms/CCInputField'
import CCTextarea from '../../atoms/CCTextarea'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { authCalls } from '../../api/authCalls'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
// Redux Imports
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setPurposeAndDescription,
  setBriefDescriptionInstalledTech,
  setConstructionDate,
  setMeasureTakenForGasEmissions,
  setOperationPeriod,
  setTotalGHGEmission,
  setCommissioningDate,
} from '../../redux/Slices/sectionASlice'
const SectionA1 = () => {
  const dispatch = useAppDispatch()
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const purpose_and_description = useAppSelector(
    ({ sectionA }) => sectionA.purpose_and_description,
    shallowEqual
  )

  const measure_taken_for_gas_emissions = useAppSelector(
    ({ sectionA }) => sectionA.measure_taken_for_gas_emissions,
    shallowEqual
  )

  const brief_description_installed_tech = useAppSelector(
    ({ sectionA }) => sectionA.brief_description_installed_tech,
    shallowEqual
  )

  const construction_date = useAppSelector(
    ({ sectionA }) => sectionA.construction_date,
    shallowEqual
  )
  const operation_period = useAppSelector(
    ({ sectionA }) => sectionA.operation_period,
    shallowEqual
  )

  const total_GHG_emission = useAppSelector(
    ({ sectionA }) => sectionA.total_GHG_emission,
    shallowEqual
  )

  const commissioning_date = useAppSelector(
    ({ sectionA }) => sectionA.commissioning_date,
    shallowEqual
  )

  const onSubmitSectionA = async () => {
    const payload = { _id: '', uuid: '', project_id: '', step1: {} }

    payload._id = currentProjectDetails?.section_a?._id
    payload.uuid = currentProjectDetails?.section_a?.uuid
    payload.project_id = currentProjectDetails?.section_a?.project_id
    payload.step1 = {
      purpose_and_description: purpose_and_description,
      measure_taken_for_gas_emissions: measure_taken_for_gas_emissions,
      brief_description_installed_tech: brief_description_installed_tech,
      project_comissioning_date: commissioning_date,
      construction_date: construction_date,
      operation_period: operation_period,
      total_GHG_emission: total_GHG_emission,
    }

    try {
      const res = await dataCollectionCalls.updateProjectSectionACall(payload)
      if (res?.success && res?.data) {
        console.log('res', res)
      } else if (res?.error) {
        alert(res?.error)
      }
    } catch (e: any) {
      console.log('Error in authCalls.loginCall api', e)
    }
  }

  {
    console.log('currentProjectDetails<<<<<', currentProjectDetails)
  }
  return (
    <Grid container sx={{ mt: 3 }} spacing={1} xs={12} md={12} lg={12} xl={12}>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label=" Brief on purpose and general description of project activity "
          placeholder="(Write a brief on the purpose of development of project and general description of project activity"
          value={purpose_and_description}
          onChange={(e) => dispatch(setPurposeAndDescription(e.target.value))}
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label=" Purpose of the project activity and the measures taken to reduce
          greenhouse gas emission "
          placeholder="(Write the purpose of the project activity in details & the measures taken to reduce greenhouse gas emissions and their results, if any)"
          value={measure_taken_for_gas_emissions}
          onChange={(e) =>
            dispatch(setMeasureTakenForGasEmissions(e.target.value))
          }
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label={' Brief description of the installed technology and equipment'}
          placeholder="(Brief description of the installed technology and equipment, its purpose for installation)"
          value={brief_description_installed_tech}
          onChange={(e) =>
            dispatch(setBriefDescriptionInstalledTech(e.target.value))
          }
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <Typography>Relevant dates for the project activity *</Typography>
      </Grid>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="Construction Date"
          value={construction_date}
          onChange={(newValue) => {
            dispatch(setConstructionDate(newValue))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField {...params} style={{ backgroundColor: 'white' }} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DatePicker
          label="Project Commissioning Date"
          value={commissioning_date}
          onChange={(newValue) => {
            dispatch(setCommissioningDate(newValue))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField {...params} style={{ backgroundColor: 'white' }} />
          )}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CCMultilineTextArea
          label="Operation Period"
          placeholder="Enter the period of project operation & details if any"
          value={operation_period}
          onChange={(e) => dispatch(setOperationPeriod(e.target.value))}
        />
      </Grid>
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
