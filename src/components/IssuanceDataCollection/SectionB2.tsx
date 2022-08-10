import { Box, Grid, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'

const SectionB2 = () => {
  const [temporaryDeviations, setTemporaryDeviations] = useState('')

  const [corrections, setCorrections] = useState('')

  const [permanentChanges, setPermanentChanges] = useState('')

  const [briefOnPurpuse, setBriefOnPurpuse] = useState('')

  const [changesToProject, setChangesToProject] = useState('')

  const [changesToStart, setChangesToStart] = useState('')

  return (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Temporary deviations from registered monitoring plan or applied methodology"
            placeholder="Write down the deviations from registered monitoring plan or applied methodology, if any"
            value={temporaryDeviations}
            onChange={(event) => setTemporaryDeviations(event.target.value)}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Corrections"
            placeholder="Write Corrections from registered monitoring plan or applied methodology, if any"
            value={corrections}
            onChange={(event) => setCorrections(event.target.value)}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Permanent changes from registered monitoring plan or applied methodology"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={permanentChanges}
            onChange={(event) => setPermanentChanges(event.target.value)}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Brief on purpose and general description of project activity "
            placeholder="Write a brief of the implemented registered project activity"
            value={briefOnPurpuse}
            onChange={(event) => setBriefOnPurpuse(event.target.value)}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Changes to project design of registered project activity"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={changesToProject}
            onChange={(event) => setChangesToProject(event.target.value)}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Changes to start date of crediting period"
            placeholder="Changes introduced to start date of crediting period, if any."
            value={changesToStart}
            onChange={(event) => setChangesToStart(event.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB2
