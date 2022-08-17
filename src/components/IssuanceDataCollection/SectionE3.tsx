import { Grid } from '@mui/material'
import React from 'react'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE4CalculationSummaryOfEmissionReductions from '../../assets/Images/SampleData/SectionE4CalculationSummaryOfEmissionReductions.png'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import {
  setCalculationOfLeakage,
  setCalculationOfLeakageImages,
} from '../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../utils/commonFunctions'

const SectionE3 = () => {
  const dispatch = useAppDispatch()

  const calculationOfLeakage = useAppSelector(
    ({ sectionE }) => sectionE.calculationOfLeakage
  )
  const calculationOfleakageimages = useAppSelector(
    ({ sectionE }) => sectionE.calculationOfLeakageImages
  )
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
