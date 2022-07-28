import {
  Button,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
  Modal,
  Paper,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import DataIssuanceAdd from '../../../assets/Images/Icons/DataIssuanceAdd.png'
import SectionCOrganisationalStructure from '../../../assets/Images/SampleData/SectionCOrganisationalStructure.png'

const SectionC1 = () => {
  const [open, setOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  return (
    <>
      <Grid container spacing={1} sx={{ mt: 4 }}>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#006B5E' }}>
            Description of monitoring system *
          </Typography>

          <TextareaAutosize
            placeholder="(Description of the monitoring system,Organisational Structure of
the team, their roles & responsibilities, Training and Maintenance)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#006B5E' }}>
            Monitoring Plan *
          </Typography>
          <TextareaAutosize
            placeholder="(According to registered and the applied methodology, plan of monitoring variables)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #006B5E',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Grid item lg={6}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}
            >
              Attach Organizational Structure & Responsibilities Chart
            </Typography>
          </Grid>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            alignItems={'center'}
          >
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
                  textDecorationColor: '#006B5E',
                  cursor: 'pointer',
                  color: '#006B5E',
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
                  border: '2px solid #006B5E',
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
            mb: 3,
            width: '80%',
            height: '80%',
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography
                sx={{ fontWeight: 600, fontSize: 20, pl: 1, pt: 1, pb: 1 }}
              >
                Sample Report - Organizational Structure & Responsibilities
                Chart
              </Typography>
            </Grid>
            <Stack alignItems="center">
              <img
                src={SectionCOrganisationalStructure}
                width="70%"
                height="430px"
              />
            </Stack>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}

export default SectionC1
