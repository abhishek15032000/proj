import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Input,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'
import AttachMore from '../../atoms/AttachMore/AttachMore'
const SectionE2 = () => {
  const [imagedata, addMoreImages] = useState<
    Array<{ key: number; imageUrl: string }>
  >([])

  const [index, setindex] = useState(-1)
  const [showModal, setShowModal] = useState(false)
  const addMoreImageUpload = (event: any) => {
    if (event?.target?.files?.length) {
      const selectedFile = event.target.files[0]
      console.log('selectedFile', selectedFile)
      const objectUrl = URL.createObjectURL(selectedFile)
      console.log('selectedFile', selectedFile)
      if (objectUrl) {
        const imageTempobj = {
          key: index + 1,
          imageUrl: objectUrl,
        }
        const arr = [...imagedata]
        arr.push(imageTempobj)
        addMoreImages(arr)
        setindex(index + 1)
      }
    }
  }
  return (
    <Grid container flexDirection="column" xs={12} height={'100vh'}>
      <Typography
        sx={{
          fontSize: '16px',
          color: ' #667080',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '500',
          marginTop: '30px',
          marginBottom: '5px',
          width: '79%',
        }}
      >
        Calculation of project emissions or actual net GHG removals by sinks
      </Typography>
      <TextareaAutosize
        placeholder="(Calculation of project emissions or actual net GHG removals by sinks, if any)"
        style={{
          height: '150px',
          width: '79%',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '14px',
          color: '#667080;',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '79%',
          marginTop: '20px',
        }}
      >
        <Typography
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            color: '#667080',
          }}
        >
          Attach relevant datas & docs
        </Typography>
        <Typography
          onClick={() => setShowModal(true)}
          sx={{
            textDecoration: 'underline',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '14px',
            color: '#667080',
          }}
        >
          View Sample Data
        </Typography>
      </Box>
      <AttachMore
        imagedata={imagedata}
        addMoreImageUpload={(event: any) => {
          addMoreImageUpload(event)
        }}
      />
      <SampleModal
        mediaArray={[require('../../assets/Images/SectionE2.png')]}
        stringArray={[
          'Sample Report - Calculation of project emissions or actual net GHG removals',
        ]}
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Grid>
  )
}

export default SectionE2
