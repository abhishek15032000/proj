import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import AttachMore from '../../atoms/AttachMore/AttachMore'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE5ComparisonOfActualEmissionReductions from '../../assets/Images/SampleData/SectionE5ComparisonOfActualEmissionReductions.png'
import {
  setComparisionOfActualEmissionReductions,
  setComparisionOfActualEmissionReductionsImages,
} from '../../redux/Slices/sectionESlice'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
const SectionE5 = () => {
  const dispatch = useAppDispatch()

  const comparisionOfActualEmissionReductions = useAppSelector(
    ({ sectionE }) => sectionE.comparisionOfActualEmissionReductions
  )
  const comparisionOfActualEmissionReductionsimages = useAppSelector(
    ({ sectionE }) => sectionE.comparisionOfActualEmissionReductionsImages
  )

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    dataCollectionCalls
      .getProjectData(currentProjectDetails?.section_e?.project_id)
      .then((res) => {
        const {
          comparison_of_actual_emission_reduction,
          attach_relevant_docs,
        } = res.data.section_e.step5

        dispatch(
          setComparisionOfActualEmissionReductions(
            comparison_of_actual_emission_reduction
          )
        )
        dispatch(
          setComparisionOfActualEmissionReductionsImages(attach_relevant_docs)
        )
      })
  })

  return (
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
