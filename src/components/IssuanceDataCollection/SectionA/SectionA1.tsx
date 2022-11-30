import { Grid, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useEffect, useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../../atoms/CCInputField'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setA1 } from '../../../redux/Slices/sectionASlice'
import Spinner from '../../../atoms/Spinner'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'

const SectionA1 = () => {
  const dispatch: any = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const A1 = useAppSelector(({ sectionA }) => sectionA.A1)

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step1.completed
    ) {
      const {
        purpose_and_description,
        measure_taken_for_gas_emissions,
        brief_description_installed_tech,
        project_comissioning_date,
        construction_date,
        operation_period,
        total_GHG_emission,
      } = currentProjectDetails.section_a.step1

      dispatch(
        setA1({
          name: 'purpose_and_description',
          value: purpose_and_description,
        })
      )
      dispatch(
        setA1({
          name: 'measure_taken_for_gas_emissions',
          value: measure_taken_for_gas_emissions,
        })
      )
      dispatch(
        setA1({
          name: 'brief_description_installed_tech',
          value: brief_description_installed_tech,
        })
      )
      dispatch(
        setA1({
          name: 'project_comissioning_date',
          value: project_comissioning_date,
        })
      )
      dispatch(
        setA1({
          name: 'construction_date',
          value: construction_date,
        })
      )
      dispatch(
        setA1({
          name: 'operation_period',
          value: operation_period,
        })
      )
      dispatch(
        setA1({
          name: 'total_GHG_emission',
          value: total_GHG_emission,
        })
      )
    }
  }, [currentProjectDetails])
  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container sx={{ mt: 3 }} spacing={1} xs={12} md={12} lg={12} xl={12}>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label=" Brief on purpose and general description of project activity "
          placeholder="(Write a brief on the purpose of development of project and general description of project activity"
          value={A1.purpose_and_description}
          name={'purpose_and_description'}
          onChange={({ target: { name, value } }) =>
            dispatch(setA1({ value, name }))
          }
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label=" Purpose of the project activity and the measures taken to reduce
          greenhouse gas emission "
          placeholder="(Write the purpose of the project activity in details & the measures taken to reduce greenhouse gas emissions and their results, if any)"
          value={A1.measure_taken_for_gas_emissions}
          name={'measure_taken_for_gas_emissions'}
          onChange={({ target: { name, value } }) =>
            dispatch(setA1({ value, name }))
          }
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label={' Brief description of the installed technology and equipment'}
          placeholder="(Brief description of the installed technology and equipment, its purpose for installation)"
          value={A1.brief_description_installed_tech}
          name={'brief_description_installed_tech'}
          onChange={({ target: { name, value } }) =>
            dispatch(setA1({ value, name }))
          }
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <Typography>Relevant dates for the project activity *</Typography>
      </Grid>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="Construction Date"
          value={A1.construction_date}
          onChange={(newValue) => {
            dispatch(
              setA1({
                name: 'construction_date',
                value: newValue?._isValid ? newValue.toISOString() : '',
              })
            )
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
          value={A1.project_comissioning_date}
          onChange={(newValue) => {
            dispatch(
              setA1({
                name: 'project_comissioning_date',
                value: newValue?._isValid ? newValue.toISOString() : '',
              })
            )
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
          value={A1.operation_period}
          name={'operation_period'}
          onChange={({ target: { name, value } }) =>
            dispatch(setA1({ value, name }))
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CCMultilineTextArea
          label={
            '   Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period'
          }
          placeholder="(Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved during this monitoring period.)"
          value={A1.total_GHG_emission}
          name={'total_GHG_emission'}
          onChange={({ target: { name, value } }) =>
            dispatch(setA1({ value, name }))
          }
          required={false}
        />
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.A1}
        issuanceVisible={true}
      />
    </Grid>
  )
}

export default SectionA1
