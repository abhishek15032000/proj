import { Box, Grid, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setBriefOnPurpuseB2,
  setChangesToProject,
  setChangesToStart,
  setCorrections,
  setPermanentChanges,
  setTemporaryDeviations,
} from '../../redux/Slices/sectionBSlice'

const SectionB2 = () => {
  const dispatch = useAppDispatch()

  const temporaryDeviations = useAppSelector(
    ({ sectionB }) => sectionB.temporaryDeviations,
    shallowEqual
  )

  const corrections = useAppSelector(
    ({ sectionB }) => sectionB.corrections,
    shallowEqual
  )

  const permanentChanges = useAppSelector(
    ({ sectionB }) => sectionB.permanentChanges,
    shallowEqual
  )

  const briefOnPurpuseB2 = useAppSelector(
    ({ sectionB }) => sectionB.briefOnPurpuseB2,
    shallowEqual
  )

  const changesToProject = useAppSelector(
    ({ sectionB }) => sectionB.changesToProject,
    shallowEqual
  )

  const changesToStart = useAppSelector(
    ({ sectionB }) => sectionB.changesToStart,
    shallowEqual
  )

  return (
    <Box>
      <Grid container sx={{ mt: 4 }} spacing={1}>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Temporary deviations from registered monitoring plan or applied methodology"
            placeholder="Write down the deviations from registered monitoring plan or applied methodology, if any"
            value={temporaryDeviations}
            onChange={(event) =>
              dispatch(setTemporaryDeviations(event.target.value))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Corrections"
            placeholder="Write Corrections from registered monitoring plan or applied methodology, if any"
            value={corrections}
            onChange={(event) => dispatch(setCorrections(event.target.value))}
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Permanent changes from registered monitoring plan or applied methodology"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={permanentChanges}
            onChange={(event) =>
              dispatch(setPermanentChanges(event.target.value))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Brief on purpose and general description of project activity "
            placeholder="Write a brief of the implemented registered project activity"
            value={briefOnPurpuseB2}
            onChange={(event) =>
              dispatch(setBriefOnPurpuseB2(event.target.value))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Changes to project design of registered project activity"
            placeholder="Write the technical description of the equipment, its specification, supplier name, installed by the project activity"
            value={changesToProject}
            onChange={(event) =>
              dispatch(setChangesToProject(event.target.value))
            }
          />
        </Grid>

        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Changes to start date of crediting period"
            placeholder="Changes introduced to start date of crediting period, if any."
            value={changesToStart}
            onChange={(event) =>
              dispatch(setChangesToStart(event.target.value))
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionB2
