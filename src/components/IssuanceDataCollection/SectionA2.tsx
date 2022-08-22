import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setCountry,
  setState,
  setCity,
  setLandmark,
  setPincode,
  setFileAttach,
} from '../../redux/Slices/sectionASlice'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import { deleteIndexInArray } from '../../utils/commonFunctions'

const SectionA2 = () => {
  const dispatch = useAppDispatch()

  const country = useAppSelector(
    ({ sectionA }) => sectionA.country,
    shallowEqual
  )
  const city = useAppSelector(({ sectionA }) => sectionA.city, shallowEqual)
  const states = useAppSelector(({ sectionA }) => sectionA.state, shallowEqual)
  const landmark = useAppSelector(
    ({ sectionA }) => sectionA.landmark,
    shallowEqual
  )
  const pincode = useAppSelector(
    ({ sectionA }) => sectionA.pincode,
    shallowEqual
  )
  const file_attach = useAppSelector(
    ({ sectionA }) => sectionA.file_attach,
    shallowEqual
  )

  const onSubmitSectionA = async () => {
    const payload = { _id: '', uuid: '', project_id: '', step2: {} }
    payload._id = 'step2'
    payload.uuid = 'b04782d3-2d4a-4f8d-9854-0deac633b1e4'
    payload.project_id = 'step12355'
    payload.step2 = {}

    try {
      const res = await dataCollectionCalls.updateProjectSectionACall(payload)
      if (res?.success && res?.data) {
        console.log('res', res)
      } else if (res?.error) {
        alert(res?.error)
      }
    } catch (e: any) {
      console.log('Error in authCalls.loginCall api', e)
    }
  }

  return (
    <Grid
      container
      sx={{ width: '100%' }}
      columnSpacing={{ xs: 0, md: 1 }}
      rowSpacing={1}
      xs={12}
      md={12}
      lg={12}
      xl={12}
    >
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
        <Grid item sx={{ mt: 1 }} xs={12} md={12} lg={12} xl={12}>
          <Typography>Location of the project activity</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label=" Country"
            style={{ backgroundColor: ' #FFFFFF', border: '1px solid white' }}
            value={country}
            onChange={(e) => dispatch(setCountry(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label=" Region/ State/ Province"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={states}
            onChange={(e) => dispatch(setState(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="City/Town/District"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Landmark"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={landmark}
            onChange={(e) => dispatch(setLandmark(e.target.value))}
          />
        </Grid>
      </Grid>

      <Grid
        sx={{ mt: 1 }}
        container
        alignItems={'center'}
        spacing={1}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid item xs={12} md={12} lg={6} xl={6}>
          <CCInputField
            label="Pincode"
            sx={{ backgroundColor: ' #FFFFFF' }}
            value={pincode}
            onChange={(e) => dispatch(setPincode(e.target.value))}
          />
        </Grid>
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCDropAndUpload
          mediaTitle={[]}
          title="Upload location map images"
          mediaItem={[]}
          imageArray={file_attach}
          onImageUpload={(item: any) => {
            dispatch(setFileAttach([...file_attach, item]))
          }}
          onDeleteImage={(index: number) => {
            dispatch(setFileAttach(deleteIndexInArray(file_attach, index)))
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SectionA2
