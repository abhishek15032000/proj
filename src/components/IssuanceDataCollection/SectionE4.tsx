import { Grid } from '@mui/material'
import React from 'react'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import SectionE4CalculationSummaryOfEmissionReductions from '../../assets/Images/SampleData/SectionE4CalculationSummaryOfEmissionReductions.png'
import {
  setCalculationSummaryOfEmission,
  setCalculationSummaryOfEmissionImages,
} from '../../redux/Slices/sectionESlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { deleteIndexInArray } from '../../utils/commonFunctions'
const SectionE4 = () => {
  const dispatch = useAppDispatch()

  const calculationSummaryOfEmission = useAppSelector(
    ({ sectionE }) => sectionE.calculationSummaryOfEmission
  )
  const calculationSummaryOfEmissionImages = useAppSelector(
    ({ sectionE }) => sectionE.calculationSummaryOfEmissionImages
  )
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label={
            'Summary of calculation of emission reductions or net anthropogenic GHG removals by sinks'
          }
          placeholder="Summary of calculation of emission reductions or net anthropogenic GHG removals by sinks, if any"
          value={calculationSummaryOfEmission}
          onChange={(e) =>
            dispatch(setCalculationSummaryOfEmission(e.target.value))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - Calculation summary of emission reductions',
          ]}
          mediaItem={[SectionE4CalculationSummaryOfEmissionReductions]}
          imageArray={calculationSummaryOfEmissionImages}
          onImageUpload={(item: any) => {
            dispatch(
              setCalculationSummaryOfEmissionImages([
                ...calculationSummaryOfEmissionImages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setCalculationSummaryOfEmissionImages(
                deleteIndexInArray(calculationSummaryOfEmissionImages, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE4
