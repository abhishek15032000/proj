import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import {
  setRemarksOnDifferenceFromEstimatedValue,
  setRemarksOnDifferenceFromEstimatedValueImages,
} from '../../redux/Slices/sectionESlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
const SectionE6 = () => {
  const dispatch = useAppDispatch()

  const remarksOnDifferenceFromEstimatedValue = useAppSelector(
    ({ sectionE }) => sectionE.remarksOnDifferenceFromEstimatedValue
  )
  const remarksOnDifferenceFromEstimatedValueImages = useAppSelector(
    ({ sectionE }) => sectionE.remarksOnDifferenceFromEstimatedValueImages
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
          remark_on_difference_from_estimate_value,
          attach_relevant_docs,
        } = res.data.section_e.step6

        dispatch(
          setRemarksOnDifferenceFromEstimatedValue(
            remark_on_difference_from_estimate_value
          )
        )
        dispatch(
          setRemarksOnDifferenceFromEstimatedValueImages(attach_relevant_docs)
        )
      })
  })

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label="Remarks on difference from estimated value"
          placeholder="Remarks on difference from estimated value, if any"
          value={remarksOnDifferenceFromEstimatedValue}
          onChange={(e) =>
            dispatch(setRemarksOnDifferenceFromEstimatedValue(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title="Attach relevant datas & docs"
          mediaItem={[]}
          mediaTitle={[]}
          imageArray={remarksOnDifferenceFromEstimatedValueImages}
          onImageUpload={(item: any) => {
            dispatch(
              setRemarksOnDifferenceFromEstimatedValueImages([
                ...remarksOnDifferenceFromEstimatedValueImages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setRemarksOnDifferenceFromEstimatedValueImages(
                deleteIndexInArray(
                  remarksOnDifferenceFromEstimatedValueImages,
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

export default SectionE6
