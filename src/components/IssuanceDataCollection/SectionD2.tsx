import React, { FC, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'

const SectionD2: FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Grid>
      <Typography sx={{ marginTop: '64px' }}>
      Data and parameters monitored ex-post (actuals)
      </Typography>
      <TextareaAutosize
        // aria-label="minimum height"
        minRows={3}
        placeholder="(If data for this project is monitored and calculated based on an ex-post method, please explain.)"
        style={{
          width: '80%',
          height: '180px',
          borderRadius: '6px',
          marginBottom: '16px',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: '270px',
        }}
      >
        <Typography>Attach datas & parameters fixed ex-ante table</Typography>
        <Typography
          onClick={() => setShowModal(true)}
          sx={{ textDecoration: 'underline' }}
        >
          View Sample Data
        </Typography>
      </Box>
      
      <ImageComponent />

      <SampleModal
        mediaArray={[
          require('../../assets/Images/sample-d2.png'),
          require('../../assets/Images/sample-d3.png'),
          require('../../assets/Images/sample-d4.png'),
        ]}
        stringArray={[
          'Sample Report - Monitored ex - post',
          'Sample Report - Project emissions',
          'Sample Report - Leakage emissions',
        ]}
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Grid>
  )
}

export default SectionD2
