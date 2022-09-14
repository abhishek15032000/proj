import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import {
  setRemarksOnDifferenceFromEstimatedValue,
  setRemarksOnDifferenceFromEstimatedValueImages,
} from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
const SectionE6 = () => {
  const dispatch = useAppDispatch()

  const remarksOnDifferenceFromEstimatedValue = useAppSelector(
    ({ sectionEMonthly }) =>
      sectionEMonthly.remarksOnDifferenceFromEstimatedValue
  )
  const remarksOnDifferenceFromEstimatedValueImages = useAppSelector(
    ({ sectionEMonthly }) =>
      sectionEMonthly.remarksOnDifferenceFromEstimatedValueImages
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    if (currentProjectDetails.section_e.step6.completed) {
      const { remark_on_difference_from_estimate_value, attach_relevant_docs } =
        currentProjectDetails.section_e.step6

      dispatch(
        setRemarksOnDifferenceFromEstimatedValue(
          remark_on_difference_from_estimate_value
        )
      )
      dispatch(
        setRemarksOnDifferenceFromEstimatedValueImages(attach_relevant_docs)
      )
    }
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
