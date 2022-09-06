import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import SectionE7ActualReductionInFirstEmission from '../../assets/Images/SampleData/SectionE7ActualReductionInFirstEmission.png'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setActualEmissionReductions,
  setActualEmissionReductionsImages,
} from '../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import Spinner from '../../atoms/Spinner'
const SectionE7 = () => {
  const dispatch = useAppDispatch()

  const actualEmissionReductions = useAppSelector(
    ({ sectionE }) => sectionE.actualEmissionReductions
  )
  const actualEmissionReductionsImages = useAppSelector(
    ({ sectionE }) => sectionE.actualEmissionReductionsImages
  )

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_e.step7.completed
    ) {
      const { actual_emission_reductions, attach_relevant_docs } =
        currentProjectDetails.section_e.step7

      dispatch(setActualEmissionReductions(actual_emission_reductions))
      dispatch(setActualEmissionReductionsImages(attach_relevant_docs))
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label="Actual emission reductions or net anthropogenic GHG removals during 1st commitment period"
          placeholder="Actual emission reductions or net anthropogenic GHG removals during 1st commitment period, if any"
          value={actualEmissionReductions}
          onChange={(e) =>
            dispatch(setActualEmissionReductions(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - Actual emission reductions in 1st commitment period',
          ]}
          mediaItem={[SectionE7ActualReductionInFirstEmission]}
          imageArray={actualEmissionReductionsImages}
          onImageUpload={(item: any) => {
            dispatch(
              setActualEmissionReductionsImages([
                ...actualEmissionReductionsImages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setActualEmissionReductionsImages(
                deleteIndexInArray(actualEmissionReductionsImages, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE7
