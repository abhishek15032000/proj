import { SelectChangeEvent, Stack } from '@mui/material'
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import CCButton from '../../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setProjectParticipants } from '../../../redux/Slices/sectionASlice'
import Spinner from '../../../atoms/Spinner'

const SectionA3 = () => {
  const dispatch = useAppDispatch()

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const party_and_project_participants = useAppSelector(
    ({ sectionA }) => sectionA.party_and_project_participants,
    shallowEqual
  )

  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step3.completed
    ) {
      const { party_and_project_participants } =
        currentProjectDetails.section_a.step3
      let step3Data = []
      step3Data = party_and_project_participants.map((item: any) => {
        return {
          party_involved: item?.party_involved,
          private_or_public_project_participant:
            item?.private_or_public_project_participant,
          indicate_party_involved: item?.indicate_party_involved,
        }
      })
      dispatch(setProjectParticipants(step3Data))
    }
  }, [currentProjectDetails])

  const addRow = () => {
    const dataCopy = [...party_and_project_participants]
    dataCopy.push({
      partyInvolved: '',
      participantType: '',
      isProjectParticipant: 'Select from dropdown',
    })
    dispatch(setProjectParticipants(dataCopy))
  }

  const handleTextChange = (e: any, index: number, type: string) => {
    const dataCopy = [...party_and_project_participants]
    let objectToChange = dataCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    dataCopy[index] = objectToChange
    dispatch(setProjectParticipants(dataCopy))
  }

  const handleSelectChange = (e: SelectChangeEvent, index: number) => {
    const dataCopy = [...party_and_project_participants]
    dataCopy[index].isProjectParticipant = e.target.value
    dispatch(setProjectParticipants(dataCopy))
  }

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
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
          Party involved ((host) indicates a host Party) *
        </Grid>
        <Grid item xs={4}>
          Private and/or public entity(ies) project participants (as
          applicable)*
        </Grid>
        <Grid item xs={4}>
          Indicate if the Party involved wishes to be considered as project
          participant *
        </Grid>
      </Grid>
      {party_and_project_participants?.map((item: any, index: number) => (
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
              value={item?.party_involved}
              onChange={(e) => handleTextChange(e, index, 'party_involved')}
              required
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
              value={item?.private_or_public_project_participant}
              onChange={(e) =>
                handleTextChange(
                  e,
                  index,
                  'private_or_public_project_participant'
                )
              }
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
                value={item?.indicate_party_involved}
                onChange={(e) =>
                  handleTextChange(e, index, 'indicate_party_involved')
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
