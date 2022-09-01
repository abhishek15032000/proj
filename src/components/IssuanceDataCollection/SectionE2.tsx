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
import SectionE2CalculationOfProjectEmission from '../../assets/Images/SampleData/SectionE2CalculationOfProjectEmission.png'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import {
  setCalculationOfProjectEmissions,
  setCalculationOfProjectEmissionsImages,
} from '../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../utils/commonFunctions'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import { shallowEqual } from 'react-redux'

const SectionE2 = () => {
  const dispatch = useAppDispatch()

  const calculationOfProjectEmissions = useAppSelector(
    ({ sectionE }) => sectionE.calculationOfProjectEmissions
  )

  const calculationOfProjectEmissionsImages = useAppSelector(
    ({ sectionE }) => sectionE.calculationOfProjectEmissionsImages
  )

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    if (currentProjectDetails.section_e.step2.completed) {
      const {
        calculation_of_projectEmissions_or_net_GHG,
        attach_relevant_docs,
      } = currentProjectDetails.section_e.step2

      dispatch(
        setCalculationOfProjectEmissions(
          calculation_of_projectEmissions_or_net_GHG
        )
      )
      dispatch(setCalculationOfProjectEmissionsImages(attach_relevant_docs))
    }
  }, [])

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label="Calculation of project emissions or actual net GHG removals by sinks"
          placeholder="Calculation of project emissions or actual net GHG removals by sinks, if any"
          value={calculationOfProjectEmissions}
          onChange={(event) =>
            dispatch(setCalculationOfProjectEmissions(event.target.value))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={['Sample Report - Calculation of project emissions']}
          mediaItem={[SectionE2CalculationOfProjectEmission]}
          imageArray={calculationOfProjectEmissionsImages}
          onImageUpload={(item: any) => {
            dispatch(
              setCalculationOfProjectEmissionsImages([
                ...calculationOfProjectEmissionsImages,
                item,
              ])
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setCalculationOfProjectEmissionsImages(
                deleteIndexInArray(calculationOfProjectEmissionsImages, index)
              )
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionE2
