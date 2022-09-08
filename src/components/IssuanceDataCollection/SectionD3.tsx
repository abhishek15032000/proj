import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
  Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setBriefDescription } from '../../redux/Slices/sectionDSlice'
import Spinner from '../../atoms/Spinner'

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

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_d.step3.completed
    ) {
      const { implementation_of_sampling_plan } =
        currentProjectDetails.section_d.step3

      dispatch(setBriefDescription(implementation_of_sampling_plan))
    }
  }, [currentProjectDetails])

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Grid
      container
      sx={{ width: '100%', mt: 3 }}
      columnSpacing={{ xs: 0, md: 1 }}
      rowSpacing={1}
      xs={12}
      md={12}
      lg={12}
      xl={12}
    >
      <Typography sx={{ marginTop: '64px' }}></Typography>
      <CCMultilineTextArea
        // aria-label="minimum height"
        label={'Implementation of sampling plan'}
        placeholder="Process of Implementation of sampling plan, if applicable"
        value={briefDescription}
        onChange={(e) => dispatch(setBriefDescription(e?.target?.value))}
      />
    </Grid>
  )
}

export default SectionD3
