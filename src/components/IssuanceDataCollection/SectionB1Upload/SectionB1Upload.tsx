import React, { useState } from 'react'
import { Grid, Stack, Typography, Modal, Button, Paper } from '@mui/material'
import { Box } from '@mui/system'
import DataIssuanceAdd from '../../../assets/Images/Icons/DataIssuanceAdd.png'
import { sectionB1UploadInterface } from './SectionB1Upload.interface'

const SectionB1UploadImages = (props: sectionB1UploadInterface) => {
  const [open, setOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} alignItems={'center'}>
        {selectedImages &&
          selectedImages.map((img, index) => (
            <Grid item key={index} xl={6} lg={6} md={6} sm={6} xs={12}>
              <Box sx={{ height: '200px' }}>
                {<img src={img} width={'100%'} height="100%" />}
              </Box>
            </Grid>
          ))}
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            View Sample
          </Typography>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="end"
            sx={{
              border: '2px solid black',
              borderStyle: 'dashed',
              height: 190,
            }}
          >
            <Button variant="text" component="label">
              <img src={DataIssuanceAdd} />
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(event) => {
                  if (event?.target?.files?.length) {
                    const selectedFile = event.target.files[0]
                    console.log('selectedFile', selectedFile)
                    const objectUrl = URL.createObjectURL(selectedFile)
                    if (objectUrl) {
                      const selectedImagesCopy = [...selectedImages]
                      selectedImagesCopy.push(objectUrl)
                      setSelectedImages(selectedImagesCopy)
                    }
                  }
                }}
              />
            </Button>
            <Typography sx={{ fontWeight: 500, fontSize: 20, mb: 2 }}>
              Attach More
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          className=""
          sx={{
            //mx: 13,
            //mt: 9,
            //ml: 2,
            width: '80%',
            //height: '500px',
            height: '80%',
          }}
        >
          <Grid container direction="column" spacing={12}>
            <Grid item>
              <Typography sx={{ fontWeight: 600, fontSize: 20, pl: 1, pt: 1 }}>
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <img src={props.image} width="100%" />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}

export default SectionB1UploadImages
