import React, { FC, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import ImageComponent from '../../atoms/ImageComponent/ImageComponent'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
//import sectionD1SampleUploadDataAndParameters from '../../assets/Images/SampleData/sectionD1SampleUploadDataAndParameters.png'

const SectionD1: FC = () => {
  //const [showModal, setShowModal] = useState(false)

  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <CCMultilineTextArea
          label="Data and parameters fixed ex ante or at renewal of crediting period"
          placeholder="If data for this project is monitored and calculated based on an ex-ante method, please explain"
        />
      </Grid>
      <Grid item xs={12}>
        <CCDropAndUpload
          mediaTitle={['Sample Report - Data and parameters at ex-ante']}
          title={'Attach relevant datas & docs'}
          mediaItem={
            [
              //sectionD1SampleUploadDataAndParameters,
              //sectionD1SampleUploadDataAndParameters,
            ]
          }
        />
      </Grid>
    </Grid>
  )
}

export default SectionD1
{
  /*<Grid>
      <Typography sx={{ marginTop: '64px' }}>
        Data and parameters fixed ex ante or at renewal of crediting period
      </Typography>
      <TextareaAutosize
        // aria-label="minimum height"
        minRows={3}
        placeholder="(If data for this project is monitored and calculated based on an ex-ante method, please explain.)"
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
          require('../../assets/Images/sample-d1.png'),
        ]}
        stringArray={[
          'Sample Report - Baseline Emissions',
        ]}
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Grid>*/
}
