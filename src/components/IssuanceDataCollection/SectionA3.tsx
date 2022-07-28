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
      <Typography>Parties and project participants *</Typography>
      <Grid container sx={{ mt: 1 }} lg={10}>
        <Grid item className="table-with-div-heading" xs={4}>
          Party involved ((host) indicates a host Party)
        </Grid>
        <Grid item className="table-with-div-heading" xs={4}>
          Private and/or public entity(ies) project participants (as applicable)
        </Grid>
        <Grid item className="table-with-div-heading" xs={4}>
          Indicate if the Party involved wishes to be considered as project
          participant{' '}
        </Grid>
      </Grid>
      {data?.map((item, index) => (
        <Grid key={index} container lg={10}>
          <Grid item className="table-with-div-td" xs={4}>
            <textarea
              style={{ height: '100%', width: '100%' }}
              placeholder="Private and/or public entity(ies) project participants (as applicable)"
              onChange={(e) => handleTextChange(e, index, 'partyInvolved')}
            />
          </Grid>
          <Grid item className="table-with-div-td" xs={4}>
            <textarea
              style={{ height: '100%', width: '100%' }}
              placeholder="Indicate if the Party involved wishes to be considered as project
              participant"
              onChange={(e) => handleTextChange(e, index, 'participantType')}
            />
          </Grid>
          <Grid item className="table-with-div-td" xs={4}>
            <FormControl fullWidth>
              <Select
                sx={{
                  background: '#DAE5E1',
                  color: '#006B5E',
                  borderRadius: '4px 4px 0 0',
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={item?.isProjectParticipant}
                label="Country"
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
        sx={{ mt: 2, color: '#fff', padding: '5px 15px', borderRadius: '14px' }}
        variant="contained"
        onClick={addRow}
      >
        + Add Row
      </CCButton>
    </Box>
  )
}

export default SectionA3
