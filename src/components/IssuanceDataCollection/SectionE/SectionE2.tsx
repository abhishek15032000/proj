import { Grid, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import SectionE2CalculationOfProjectEmission from '../../../assets/Images/SampleData/SectionE2CalculationOfProjectEmission.png'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import { setE2 } from '../../../redux/Slices/sectionESlice'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import { shallowEqual } from 'react-redux'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'

const SectionE2 = () => {
  const dispatch = useAppDispatch()

  const E2 = useAppSelector(({ sectionE }) => sectionE.E2)
  const { attach_relevant_docs } = E2

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_e.step2.completed
    ) {
      const {
        calculation_of_projectEmissions_or_net_GHG,
        attach_relevant_docs,
      } = currentProjectDetails.section_e.step2

      dispatch(
        setE2({
          name: 'calculation_of_projectEmissions_or_net_GHG',
          value: calculation_of_projectEmissions_or_net_GHG,
        })
      )
      dispatch(
        setE2({ name: 'attach_relevant_docs', value: attach_relevant_docs })
      )
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
          label="Calculation of project emissions or actual net GHG removals by sinks"
          placeholder="Calculation of project emissions or actual net GHG removals by sinks, if any"
          value={E2.calculation_of_projectEmissions_or_net_GHG}
          name={'calculation_of_projectEmissions_or_net_GHG'}
          onChange={({ target: { value, name } }) =>
            dispatch(setE2({ name, value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          title={'Attach relevant datas & docs'}
          mediaTitle={['Sample Report - Calculation of project emissions']}
          mediaItem={[SectionE2CalculationOfProjectEmission]}
          imageArray={E2.attach_relevant_docs}
          onImageUpload={(item: any) => {
            dispatch(
              setE2({
                name: 'attach_relevant_docs',
                value: [...attach_relevant_docs, item],
              })
            )
          }}
          onDeleteImage={(index: number) => {
            dispatch(
              setE2({
                name: 'attach_relevant_docs',
                value: deleteIndexInArray(attach_relevant_docs, index),
              })
            )
          }}
        />
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.E2}
        issuanceVisible={true}
      />
    </Grid>
  )
}

export default SectionE2
