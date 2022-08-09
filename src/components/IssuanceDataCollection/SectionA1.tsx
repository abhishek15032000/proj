import { Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../atoms/CCInputField'
import CCTextarea from '../../atoms/CCTextarea'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { authCalls } from '../../api/authCalls'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'

const SectionA1 = () => {
  const [constructionDate, setConstructionDate] = useState<Date | null>(null)
  const [projectCommissioningDate, setProjectCommissioningDate] =
    useState<Date | null>(null)
  const [step1, setStep1] = React.useState({
    purpose_and_description: 'sadda',
    measure_taken_for_gas_emissions: 'asdas',
    brief_description_installed_tech: 'asda',
    construction_date: 'asd',
    operation_period: 'asdas',
    total_GHG_emission: 'asdasd',
    additionalProp1: {},
  })

  const onSubmitSectionA = async () => {
    const payload = { _id: '', uuid: '', project_id: '', step1: {} }

    payload._id = 'step1'
    payload.uuid = 'b04782d3-2d4a-4f8d-9854-0deac633b1e4'
    payload.project_id = 'step12355'
    payload.step1 = step1

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

  return (
    <Grid container sx={{ mt: 3 }} spacing={1} xs={12} md={12} lg={12} xl={12}>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label=" Brief on purpose and general description of project activity "
          placeholder="(Write a brief on the purpose of development of project and general description of project activity"
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label=" Purpose of the project activity and the measures taken to reduce
          greenhouse gas emission "
          placeholder="(Write the purpose of the project activity in details & the measures taken to reduce greenhouse gas emissions and their results, if any)"
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCMultilineTextArea
          label={' Brief description of the installed technology and equipment'}
          placeholder="(Brief description of the installed technology and equipment, its purpose for installation)"
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <Typography>Relevant dates for the project activity *</Typography>
      </Grid>
      <Grid item xs={6} md={6}>
        <DatePicker
          label="Construction Date"
          value={constructionDate}
          onChange={(newValue) => {
            setConstructionDate(newValue)
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
          value={projectCommissioningDate}
          onChange={(newValue) => {
            setProjectCommissioningDate(newValue)
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
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CCMultilineTextArea
          label={
            '   Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period'
          }
          placeholder="(Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved during this monitoring period.)"
        />
      </Grid>
    </Grid>
  )
}

export default SectionA1
