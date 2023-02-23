// React Imports
import React, { FC, useEffect, useState } from 'react'
// MUI Imports
import { Grid, Box, Typography, Button, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
// Comp Imports
import CCDocViewer from '../CCDocViewer'
// API Imports
import { fileUploadCalls } from '../../api/fileUpload.api'

interface CCFileViewerProps {
  title?: string | number
  index?: number
  deleteImage?: any
  fileSize: number | string
}

const CCFileViewer: FC<CCFileViewerProps> = (props) => {
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
        width: '116px',
        height: '140px',
        backgroundColor: '#E5F2FF',
        display: 'inline-block',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '4px',

        mt: 1,
        mr: 2,
      }}
    >
      <Box
        sx={{
          px: 1,
        }}
      >
        <Box
          sx={{
            py: 1,
            position: 'relative',
          }}
        >
          {file ? (
            <CCDocViewer
              documents={[
                {
                  uri: file,
                  fileName: props.title,
                },
              ]}
              background={"#E5F2FF"}
              width={100}
              height={100}
            />
          ) :  <Box
          sx={{
            py: 1,
            background: 'white',
            width: 100,
            height: 100,
            borderRadius:"2px"
          }}
        />}
         {props?.deleteImage && <CloseIcon
            onClick={() => props.deleteImage(props?.index)}
            style={{
              color: '#001E31',
              cursor: 'pointer',
              position: 'absolute',
              top: 6,
              right: 0,
              fontSize: 20,
            }}
          />}
        </Box>
        <Box
          sx={{
            pb: 1,
            flexDirection: 'row',
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              width: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {props.title}
          </Typography>
          {/* {props.fileSize > 0 && (
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {props.fileSize} MB
            </Typography>
          )} */}
        </Box>
      </Box>
    </Box>
  )
}

export default CCFileViewer
