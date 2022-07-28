import React, { FC, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'

const SectionD3: FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Grid>
      <Typography sx={{ marginTop: '64px' }}>
        Implementation of sampling plan
      </Typography>
      <TextareaAutosize
        // aria-label="minimum height"
        minRows={3}
        placeholder="(Process of Implementation of sampling plan, if applicable)"
        style={{
          width: '80%',
          height: '180px',
          borderRadius: '6px',
          marginBottom: '16px',
        }}
      />
    </Grid>
  )
}

export default SectionD3
