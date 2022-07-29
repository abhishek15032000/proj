import { Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CCInputField from '../../atoms/CCInputField'
import CCTextarea from '../../atoms/CCTextarea'

const SectionA3 = () => {
  const [constructionDate, setConstructionDate] = useState<Date | null>(null)
  const [projectCommissioningDate, setProjectCommissioningDate] =
    useState<Date | null>(null)

  return (
    <Grid container sx={{ mt: 3 }} spacing={1} xs={12} md={11} lg={10}>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <Typography>
          Brief on purpose and general description of project activity *
        </Typography>
        <CCTextarea
          aria-label="empty textarea"
          placeholder="(Write a brief on the purpose of development of project and general description of project activity)"
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <Typography>
          Purpose of the project activity and the measures taken to reduce
          greenhouse gas emissions *
        </Typography>
        <CCTextarea
          aria-label="empty textarea"
          placeholder="(Write the purpose of the project activity in details & the measures taken to reduce greenhouse gas emissions and their results, if any)"
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <Typography>
          Brief description of the installed technology and equipment *
        </Typography>
        <CCTextarea
          aria-label="empty textarea"
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
          renderInput={(params) => <CCInputField {...params} />}
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
          renderInput={(params) => <CCInputField {...params} />}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CCInputField
          label="Operation Period"
          placeholder="Enter the period of project operation & details if any"
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography>
          Total GHG emission reductions or net anthropogenic GHG removals by
          sinks achieved in this monitoring period *
        </Typography>
        <CCTextarea
          aria-label="empty textarea"
          placeholder="(Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved during this monitoring period.)"
        />
      </Grid>
    </Grid>
  )
}

export default SectionA3
