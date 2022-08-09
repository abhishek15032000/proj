import { SelectChangeEvent } from '@mui/material'
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import CCButton from '../../atoms/CCButton'

interface dataInterface {
  partyInvolved: string
  participantType: string
  isProjectParticipant: string
}

const SectionA3 = () => {
  const [data, setData] = useState<dataInterface[]>([
    { partyInvolved: '', participantType: '', isProjectParticipant: '' },
  ])

  const addRow = () => {
    const dataCopy = [...data]
    dataCopy.push({
      partyInvolved: '',
      participantType: '',
      isProjectParticipant: '',
    })
    setData(dataCopy)
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
    type: string
  ) => {
    const dataCopy = [...data]
    let objectToChange = dataCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    dataCopy[index] = objectToChange
    setData(dataCopy)
  }

  const handleSelectChange = (e: SelectChangeEvent, index: number) => {
    const dataCopy = [...data]
    dataCopy[index].isProjectParticipant = e.target.value
    setData(dataCopy)
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography>Parties & project participants involved</Typography>
      <Grid container sx={{ mt: 1 }} lg={12} className="table-with-div-heading">
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
      {data?.map((item, index) => (
        <Grid
          key={index}
          className="table-with-div-td"
          container
          lg={12}
          sx={{ mt: 1 }}
        >
          <Grid item xs={4}>
            <textarea
              style={{ height: '100%', width: '95%', border: '0px' }}
              placeholder="Enter host party name"
              onChange={(e) => handleTextChange(e, index, 'partyInvolved')}
            />
          </Grid>
          <Grid item xs={4}>
            <textarea
              style={{ height: '100%', width: '95%', border: '0px' }}
              placeholder="Enter private/public entity name"
              onChange={(e) => handleTextChange(e, index, 'participantType')}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                sx={{
                  background: 'white',
                  color: '#006B5E',
                  borderWidth: '0px',
                  borderColor: 'white',
                }}
                label="Select from dropdown"
                placeholder="Select from dropdown"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={item?.isProjectParticipant}
                onChange={(e) => handleSelectChange(e, index)}
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
