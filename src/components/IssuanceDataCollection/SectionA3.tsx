import { SelectChangeEvent } from '@mui/material'
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import CCButton from '../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setProjectParticipants } from '../../redux/Slices/sectionASlice'
interface dataInterface {
  partyInvolved: string
  participantType: string
  isProjectParticipant: string
}

const SectionA3 = () => {
  const dispatch = useAppDispatch()
  const onSubmitSectionA = async () => {
    const payload = { _id: '', uuid: '', project_id: '', step3: {} }

    payload._id = 'step'
    payload.uuid = 'b04782d3-2d4a-4f8d-9854-0deac633b1e4'
    payload.project_id = 'step12355'
    payload.step3 = {}

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
  const projectParticipants = useAppSelector(
    ({ sectionA }) => sectionA.projectParticipants,
    shallowEqual
  )

  const addRow = () => {
    const dataCopy = [...projectParticipants]
    dataCopy.push({
      partyInvolved: '',
      participantType: '',
      isProjectParticipant: 'Select from dropdown',
    })
    dispatch(setProjectParticipants(dataCopy))
  }

  const handleTextChange = (e: any, index: number, type: string) => {
    const dataCopy = [...projectParticipants]
    let objectToChange = dataCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    dataCopy[index] = objectToChange
    dispatch(setProjectParticipants(dataCopy))
  }

  const handleSelectChange = (e: SelectChangeEvent, index: number) => {
    const dataCopy = [...projectParticipants]
    dataCopy[index].isProjectParticipant = e.target.value
    dispatch(setProjectParticipants(dataCopy))
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography>Parties & project participants involved</Typography>

      <Grid
        container
        sx={{ mt: 1 }}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        spacing={1}
        className="table-with-div-heading"
      >
        <Grid item xs={4}>
          Party involved ((host) indicates a host Party)
        </Grid>
        <Grid item xs={4}>
          Private and/or public entity(ies) project participants (as applicable)
        </Grid>
        <Grid item xs={4}>
          Indicate if the Party involved wishes to be considered as project
          participant{' '}
        </Grid>
      </Grid>
      {projectParticipants?.map((item, index) => (
        <Grid
          key={index}
          className={
            // index % 2 !== 0 ? 'table-with-div-td_green' :
            'table-with-div-td'
          }
          container
          xs={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ mt: 1 }}
          spacing={1}
        >
          <Grid item xs={4}>
            <input
              style={{
                height: '100%',
                width: '100%',
                border: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              placeholder="Enter host party name"
              value={item?.partyInvolved}
              onChange={(e) => handleTextChange(e, index, 'partyInvolved')}
            />
          </Grid>
          <Grid item xs={4}>
            <input
              style={{
                height: '100%',
                width: '100%',
                border: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              placeholder="Enter private/public entity name"
              value={item?.participantType}
              onChange={(e) => handleTextChange(e, index, 'participantType')}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                className="select_option_border_contain"
                // sx={{
                //   background: 'white',
                //   color: '#006B5E',
                //   borderWidth: '0px',
                //   borderColor: 'white',
                // }}

                // label="Select from dropdown"
                defaultValue={'Select from dropdown'}
                placeholder="Select from dropdown"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={item?.isProjectParticipant}
                onChange={(e) =>
                  handleTextChange(e, index, 'isProjectParticipant')
                }
              >
                <MenuItem value={'no'}>No</MenuItem>
                <MenuItem value={'yes'}>Yes</MenuItem>
                <MenuItem value={'maybe'}>Maybe</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ))}
      <CCButton
        sx={{
          mt: 2,
          color: '#006B5E;',
          padding: '5px 15px',
          borderRadius: '14px',
          backgroundColor: '#F6F9F7',
        }}
        variant="contained"
        onClick={addRow}
      >
        + Add more participants
      </CCButton>
    </Box>
  )
}

export default SectionA3
