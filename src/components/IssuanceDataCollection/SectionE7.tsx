import { Grid } from '@mui/material'
import React from 'react'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import SectionE7ActualReductionInFirstEmission from '../../assets/Images/SampleData/SectionE7ActualReductionInFirstEmission.png'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setActualEmissionReductions,
  setActualEmissionReductionsImages,
} from '../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../utils/commonFunctions'
const SectionE7 = () => {
  const dispatch = useAppDispatch()

  const actualEmissionReductions = useAppSelector(
    ({ sectionE }) => sectionE.actualEmissionReductions
  )
  const actualEmissionReductionsImages = useAppSelector(
    ({ sectionE }) => sectionE.actualEmissionReductionsImages
  )

  return (
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
