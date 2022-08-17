import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import AttachMore from '../../atoms/AttachMore/AttachMore'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE1GHGEmissionBaseline from '../../assets/Images/SampleData/SectionE1GHGEmissionBaseline.png'
import {
  setCalculationOfBaselineEmissions,
  setCalculationOfBaselineEmissionsImages,
} from '../../redux/Slices/sectionESlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { deleteIndexInArray } from '../../utils/commonFunctions'

const SectionE1 = () => {
  const dispatch = useAppDispatch()

  const calculationOfBaselineEmissions = useAppSelector(
    ({ sectionE }) => sectionE.calculationOfBaselineEmissions,
    shallowEqual
  )

  const calculationOfBaselineEmissionsImages = useAppSelector(
    ({ sectionE }) => sectionE.calculationOfBaselineEmissionsImages
  )

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label="Calculation of baseline emissions or net GHG removals by sinks"
          placeholder="Calculation of baseline emissions or  net GHG removals by sinks, if any"
          value={calculationOfBaselineEmissions}
          onChange={(event) =>
            dispatch(setCalculationOfBaselineEmissions(event.target.value))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={[
            'Sample Report - GHG Emission baseline from renewable energy generation',
          ]}
          mediaItem={[SectionE1GHGEmissionBaseline]}
          imageArray={calculationOfBaselineEmissionsImages}
          onImageUpload={(item: any) => {
            dispatch(
              setCalculationOfBaselineEmissionsImages([
                ...calculationOfBaselineEmissionsImages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setCalculationOfBaselineEmissionsImages(
                deleteIndexInArray(calculationOfBaselineEmissionsImages, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE1
