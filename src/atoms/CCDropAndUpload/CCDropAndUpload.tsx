// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Button, Paper } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CloseIcon from '@mui/icons-material/Close'
import SampleModal from '../SampleModal/SampleModal'
import { ImageUpload } from './ImageHandle'
import { ENDPOINTS } from '../../api/configs/Endpoints'
import { resizeFile } from '../../utils/Filehandler.util'
import CCDocViewer from '../CCDocViewer'
import { fileUploadCalls } from '../../api/fileUpload.api'

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
  multiple?: boolean
}

const CCDropAndUpload: FC<CCDropAndUploadProps> = (props) => {
  const hiddenFileInput = React.useRef<any>(null)
  const { multiple = true } = props
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleClick = (event: any) => {
    hiddenFileInput.current.click()
  }

  const addMoreImageUpload = async (event: any) => {
    if (event?.target?.files?.length) {
      let all_files: any = [...props.imageArray]
      Promise.all(
        Array.from(event?.target?.files).map(async (selectedFile: any) => {
          const image = await resizeFile(selectedFile)
          setUploading(true)

          // const objectUrl = URL.createObjectURL(image)
          // const sizeTemp = selectedFile.size / 1000000

          return ImageUpload(image, selectedFile?.name)
            .then((result) => {
              setUploading(false)
              all_files = result?.success
                ? [...all_files, result.data[0].ipfs_hash]
                : null
              console.log(
                '🚀 ~ file: CCDropAndUpload.tsx ~ line 49 ~ .then ~ all_files',
                all_files
              )
              return all_files
            })
            .catch((error) => {
              console.log(
                '🚀 ~ file: CCDropAndUpload.tsx ~ line 56 ~ Promise.all ~ error',
                error
              )
              // setUploading(false)
            })
        })
      ).then(() => props.onImageUpload([...all_files]))
    }
  }

  const deleteImage = (index: number) => {
    props.onDeleteImage(index)
  }

  return (
    <Box sx={{ ...props.sx }}>
      <div style={{position:'relative'}}>
        <input
          ref={hiddenFileInput}
          style={{
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
          accept=".png,.jpeg,.pdf,.jpg"
          multiple={multiple}
          type="file"
          onChange={(event: any) => {
            addMoreImageUpload(event)
          }}
        />
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
          onClick={handleClick}
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
          disabled={uploading}
          onClick={handleClick}
        >
          {uploading ? 'Uploading' : 'Upload'}
        </Button>
      </div>

      {/* {uploading && (
        <FileTab key={-1} title={'Uploading...'} index={-1} fileSize={0} />
      )} */}

      {props.imageArray &&
        props.imageArray.length ?
        props.imageArray.map((item: any, index: number) => {
          if (typeof item === 'string') {
            return (
              <FileTab
                key={index.toString()}
                title={item}
                index={index}
                deleteImage={deleteImage}
                fileSize={0}
              />
            )
          } else {
            return (
              <FileTab
                key={index.toString()}
                title={item.fileName}
                index={index}
                deleteImage={deleteImage}
                fileSize={item.fileSize}
              />
            )
          }
        }): null}

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
  const item: any = props.title
  const [file, setFile] = useState<any>()
  useEffect(() => {
    getImages()
  }, [item])
  const getImages = async () => {
    try {
      // setLoading(true)
      if (item) {
        fileUploadCalls.getFile(item).then((res: any) => {
          console.log(
            '🚀 ~ file: SliderComponent.tsx ~ line 20 ~ fileUploadCalls.getFile ~ res',
            res
          )
          const image = URL.createObjectURL(res)
          console.log(
            '🚀 ~ file: SliderComponent.tsx ~ line 22 ~ fileUploadCalls.getFile ~ image',
            image
          )
          setFile(image)
          return image
        })
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: SliderComponent.tsx ~ line 59 ~ getImages ~ error',
        error
      )
    } finally {
      // setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        // height: '40px',
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

        <Box sx={{ height: 50, width: 50, m: 1, background: 'white' }}>
          {file ? (
            <CCDocViewer
              documents={[
                {
                  uri: file,
                  fileName: props.title,
                },
              ]}
              width={50}
              height={50}
            />
          ) : null}
        </Box>

        <Box
          sx={{
            ml: 1,
            flexDirection: 'row',
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
