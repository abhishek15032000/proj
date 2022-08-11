// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Button } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CloseIcon from '@mui/icons-material/Close'
import SampleModal from '../SampleModal/SampleModal'

// Local Imports

interface CCDropAndUploadProps {
  title?: string | number
  sx?: any
  mediaItem?: any
  mediaTitle: string
  imageArray?: any
  onImageUpload?: any
  onDeleteImage?: any
}

const CCDropAndUpload: FC<CCDropAndUploadProps> = (props) => {
  const [showModal, setShowModal] = useState(false)

  const addMoreImageUpload = (event: any) => {
    if (event?.target?.files?.length) {
      const selectedFile = event.target.files[0]
      const objectUrl = URL.createObjectURL(selectedFile)
      props.onImageUpload({
        fileName: selectedFile.name,
        fileLocation: objectUrl,
      })
    }
  }

  const deleteImage = (index: number) => {
    // const newImageArray = props.imageArray.filter(
    //   (item: any, i: number) => i !== index
    // )
    props.onDeleteImage(index)
    // props.(newImageArray)
  }

  return (
    <Box sx={{ ...props.sx }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#1D4B44' }}>
          {props.title}
        </Typography>

        <Typography
          onClick={() => setShowModal(true)}
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: '#2B2B2B',
            textDecoration: 'underline',
          }}
        >
          Check Sample Data
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '90px',
          border: '2px dashed #1D4B44',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#141D1B' }}>
          Drop files or upload manually
        </Typography>
      </Box>

      <Button
        sx={{
          backgroundColor: '#F3BA4D',
          textTransform: 'none',
          width: '100%',
          borderRadius: '8px',
          mt: 2,
          mb: 1,
          color: '#005046',
        }}
        variant="contained"
        component="label"
      >
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(event: any) => {
            addMoreImageUpload(event)
          }}
        />
      </Button>

      {props.imageArray.map((item: any, index: number) => (
        <FileTab
          key={index}
          title={item.fileName}
          index={index}
          deleteImage={deleteImage}
        />
      ))}

      <SampleModal
        mediaArray={[props.mediaItem]}
        stringArray={[props.mediaTitle]}
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </Box>
  )
}

interface FileTabProps {
  title?: string | number
  index?: number
  deleteImage?: any
}

const FileTab: FC<FileTabProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '40px',
        backgroundColor: '#DAF7F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        pr: 1,
        mt: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
        }}
      >
        <InsertDriveFileIcon style={{ color: '#388E81' }} />

        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
            {props.title}
          </Typography>

          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>0.5 MB</Typography>
        </Box>
      </Box>

      <CloseIcon
        onClick={() => props.deleteImage(props.index)}
        style={{ color: '#388E81' }}
      />
    </Box>
  )
}

export default CCDropAndUpload
