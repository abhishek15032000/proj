import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE4CalculationSummaryOfEmissionReductions from '../../../assets/Images/SampleData/SectionE4CalculationSummaryOfEmissionReductions.png'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import {
  setCalculationOfLeakage,
  setCalculationOfLeakageImages,
} from '../../../redux/Slices/MonthlyReport/sectionEMonthly'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import { shallowEqual } from 'react-redux'

const SectionE3 = () => {
  const dispatch = useAppDispatch()

  const calculationOfLeakage = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.calculationOfLeakage
  )
  const calculationOfleakageimages = useAppSelector(
    ({ sectionEMonthly }) => sectionEMonthly.calculationOfLeakageImages
  )

  const currentProjectDetails = useAppSelector(
    ({ MonthlyReportUpdate }) => MonthlyReportUpdate.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    if (currentProjectDetails.section_e.step3.completed) {
      const { calculation_of_leakage, attach_relevant_docs } =
        currentProjectDetails.section_e.step3

      dispatch(setCalculationOfLeakage(calculation_of_leakage))
      dispatch(setCalculationOfLeakageImages(attach_relevant_docs))
    }
  }, [])

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item sm={12}>
        <CCMultilineTextArea
          label="Calculation of leakage"
          placeholder="Calculation of leakage emissions, if any"
          value={calculationOfLeakage}
          onChange={(e) => dispatch(setCalculationOfLeakage(e.target.value))}
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title="Attach relevant datas & docs"
          mediaTitle={[
            'Sample Report - Calculation summary of emission reductions',
          ]}
          mediaItem={[SectionE4CalculationSummaryOfEmissionReductions]}
          imageArray={calculationOfleakageimages}
          onImageUpload={(item: any) => {
            dispatch(
              setCalculationOfLeakageImages([
                ...calculationOfleakageimages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setCalculationOfLeakageImages(
                deleteIndexInArray(calculationOfleakageimages, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE3
