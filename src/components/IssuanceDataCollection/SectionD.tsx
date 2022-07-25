import React, { FC, useState } from 'react'
import {
  Box,
  Grid,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'

const SectionD: FC = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Grid>
      <Typography sx={{ marginTop: '64px' }}>
        Data and parameters fixed ex ante or at renewal of crediting period
      </Typography>
      <TextareaAutosize
        // aria-label="minimum height"
        minRows={3}
        // placeholder="Minimum 3 rows"
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
        <Typography onClick={() => setShowModal(true)} sx={{ textDecoration: 'underline' }}>
          View Sample Data
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '4px' }}>
        <Box sx={{ height: '250px', width: '38%', border: '2px solid' }} />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '250px',
            width: '38%',
            border: '2px dashed',
            marginLeft: '10px',
          }}
        >
          <AddIcon />
          <Typography sx={{ fontSize: 20 }}>Attach More</Typography>
        </Box>
      </Box>

      <SampleModal
        mediaArray={[
          require('../../assets/Images/sample-d1.png'),
          require('../../assets/Images/sample-d2.png'),
          require('../../assets/Images/sample-d3.png'),
          require('../../assets/Images/sample-d4.png'),
        ]}
        stringArray={[
          'Sample Report - Baseline Emissions',
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


export default SectionD
