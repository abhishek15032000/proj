// React Imports
import React, { useState, useEffect } from 'react'

// MUI Imports
import { Box, Grid, TextareaAutosize, Typography } from '@mui/material'

// Redux Imports
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setBriefOnPurpuseB2,
  setChangesToProject,
  setChangesToStart,
  setCorrections,
  setPermanentChanges,
  setTemporaryDeviations,
} from '../../redux/Slices/sectionBSlice'

// Local Components
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'

const SectionB2 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  useEffect(() => {
    dataCollectionCalls
      .getProjectData(currentProjectDetails?.section_b?.project_id)
      .then((res: any) => {
        const {
          temporary_deviation,
          corrections,
          permanent_changes_from_registered_monitoring_plan,
          change_project_design,
          change_startDate_creditPeriod,
          typeOf_changes_specific,
        } = res.data.section_b.step2

        dispatch(setBriefOnPurpuseB2(typeOf_changes_specific))
        dispatch(setChangesToProject(change_project_design))
        dispatch(setChangesToStart(change_startDate_creditPeriod))
        dispatch(setCorrections(corrections))
        dispatch(
          setPermanentChanges(permanent_changes_from_registered_monitoring_plan)
        )
        dispatch(setTemporaryDeviations(temporary_deviation))
      })
  }, [])

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
