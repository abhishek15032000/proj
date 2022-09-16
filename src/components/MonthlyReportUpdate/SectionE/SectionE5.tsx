import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
  Stack,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../../atoms/SampleModal/SampleModal'
import AttachMore from '../../../atoms/AttachMore/AttachMore'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE5ComparisonOfActualEmissionReductions from '../../../assets/Images/SampleData/SectionE5ComparisonOfActualEmissionReductions.png'
import {
  setComparisionOfActualEmissionReductions,
  setComparisionOfActualEmissionReductionsImages,
} from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import Spinner from '../../../atoms/Spinner'
const SectionE5 = () => {
  const dispatch = useAppDispatch()

  const comparisionOfActualEmissionReductions = useAppSelector(
    ({ sectionEMonthly }) =>
      sectionEMonthly.comparisionOfActualEmissionReductions
  )
  const comparisionOfActualEmissionReductionsimages = useAppSelector(
    ({ sectionEMonthly }) =>
      sectionEMonthly.comparisionOfActualEmissionReductionsImages
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    if (currentProjectDetails.section_e.step5.completed) {
      const { comparison_of_actual_emission_reduction, attach_relevant_docs } =
        currentProjectDetails.section_e.step5

      dispatch(
        setComparisionOfActualEmissionReductions(
          comparison_of_actual_emission_reduction
        )
      )
      dispatch(
        setComparisionOfActualEmissionReductionsImages(attach_relevant_docs)
      )
    }
  })
  const loading = useAppSelector(
    ({ selectDate }) => selectDate.loading,
    shallowEqual
  )
  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label="Comparison of actual emission reductions or net anthropogenic GHG removals by sinks with estimates in registered PDD"
          placeholder="Comparison of actual emission reductions or net anthropogenic GHG removals by sinks with estimates in registered PDD, if any"
          value={comparisionOfActualEmissionReductions}
          onChange={(e) =>
            dispatch(setComparisionOfActualEmissionReductions(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - Comparison of actual emission reductions',
          ]}
          mediaItem={[SectionE5ComparisonOfActualEmissionReductions]}
          imageArray={comparisionOfActualEmissionReductionsimages}
          onImageUpload={(item: any) => {
            dispatch(
              setComparisionOfActualEmissionReductionsImages([
                ...comparisionOfActualEmissionReductionsimages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setComparisionOfActualEmissionReductionsImages(
                deleteIndexInArray(
                  comparisionOfActualEmissionReductionsimages,
                  index
                )
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE5
