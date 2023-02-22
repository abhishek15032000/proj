// React Imports
import React, { FC, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Button } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CloseIcon from '@mui/icons-material/Close'
import SampleModal from '../SampleModal/SampleModal'
import { ImageUpload } from './ImageHandle'
import { ENDPOINTS } from '../../api/configs/Endpoints'

// Local Imports

interface CCDropAndUploadProps {
  title?: string | number
  sx?: any
  mediaItem?: Array<any>
  mediaTitle?: Array<any>
  imageArray?: any
  onImageUpload?: any
  onDeleteImage?: any
  required?: boolean
  fontSize?: any
}

const CCDropAndUpload: FC<CCDropAndUploadProps> = (props) => {
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)

  const addMoreImageUpload = (event: any) => {
    if (event?.target?.files?.length) {
      const selectedFile = event.target.files[0]
      const objectUrl = URL.createObjectURL(selectedFile)
      const sizeTemp = selectedFile.size / 1000000
      setUploading(true)
      ImageUpload(selectedFile, selectedFile.name)
        .then((result) => {
          result?.success
            ? props.onImageUpload(
                result.data[0].ipfs_hash
                //fileSize: Math.round(sizeTemp * 100) / 100,
              )
            : alert('File not uploaded, please try again')
          setUploading(false)
        })
        .catch((error) => {
          setUploading(false)
        })
    }
  }

  const deleteImage = (index: number) => {
    props.onDeleteImage(index)
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
        <Typography
          sx={{
            fontSize: props?.fontSize || 16,
            fontWeight: 500,
            color: '#1D4B44',
          }}
        >
          {props.title}
          {props?.required && (
            <span style={{ color: 'red', fontSize: '12px' }}>*</span>
          )}
        </Typography>
        {props.mediaItem && props.mediaItem.length > 0 && (
          <Typography
            onClick={() => setShowModal(true)}
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: '#2B2B2B',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Check Sample Data
          </Typography>
        )}
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

      {uploading && (
        <FileTab key={-1} title={'Uploading...'} index={-1} fileSize={0} />
      )}

      {props.imageArray &&
        props.imageArray.map((item: any, index: number) => {
          if (typeof item === 'string') {
            return (
              <FileTab
                key={index}
                title={item}
                index={index}
                deleteImage={deleteImage}
                fileSize={0}
              />
            )
          } else {
            return (
              <FileTab
                key={index}
                title={item.fileName}
                index={index}
                deleteImage={deleteImage}
                fileSize={item.fileSize}
              />
            )
          }
        })}

      <SampleModal
        mediaArray={props.mediaItem ? [...props.mediaItem] : []}
        stringArray={props.mediaTitle ? [...props.mediaTitle] : []}
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
  fileSize: number | string
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
          {props.fileSize > 0 && (
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {props.fileSize} MB
            </Typography>
          )}
        </Box>
      </Box>

      <CloseIcon
        onClick={() => props.deleteImage(props.index)}
        style={{ color: '#388E81', cursor: 'pointer' }}
      />
    </Box>
  )
}

export default CCDropAndUpload
