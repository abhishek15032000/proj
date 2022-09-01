import React, { FC, useEffect, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setBriefDescription } from '../../redux/Slices/sectionDSlice'

const SectionD3: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useAppDispatch()
  const briefDescription = useAppSelector(
    ({ sectionD }) => sectionD.briefDescription,
    shallowEqual
  )

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  useEffect(() => {
    if (currentProjectDetails.section_d.step3.completed) {
      const { implementation_of_sampling_plan } =
        currentProjectDetails.section_d.step3

      dispatch(setBriefDescription(implementation_of_sampling_plan))
    }
  }, [])
  {
    console.log('briefDescription', briefDescription)
  }
  return (
    <Grid>
      <Typography sx={{ marginTop: '64px' }}></Typography>
      <CCMultilineTextArea
        label={'Implementation of sampling plan'}
        placeholder="Process of Implementation of sampling plan, if applicable"
        value={briefDescription}
        onChange={(e) => setBriefDescription(e?.target?.value)}
      />
    </Grid>
  )
}

export default SectionD3
