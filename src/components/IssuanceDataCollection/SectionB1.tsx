import {
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  TextareaAutosize,
  Typography,
  Modal,
} from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
]

const SectionB1 = () => {
  const [open, setOpen] = useState(false)
  const [imagesCount, setImagesCount] = useState(0)

  return (
    <Box>
      <Grid container sx={{ mt: 2 }} spacing={1}>
        <Grid
          item
          xl={9}
          lg={8}
          md={8}
          sm={8}
          xs={12}
          sx={
            {
              //backgroundColor: 'aqua'
            }
          }
        >
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Brief on purpose and general description of project activity *
          </Typography>
          <TextareaAutosize
            placeholder="(Description of implemented registered project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          ></TextareaAutosize>
        </Grid>
        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Technical Description
          </Typography>
          <TextareaAutosize
            placeholder="(Technical description of the equipment, its specification, supplier name, installed by the project activity)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          ></TextareaAutosize>
        </Grid>
        <Grid
          item
          xl={9}
          lg={8}
          md={8}
          sx={
            {
              //background: 'red'
            }
          }
        >
          <Grid
            container
            //direction="row"
            //justifyContent="space-between"
            //alignItems="center"
            columnSpacing={2}
          >
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  //background: 'aqua'
                }}
              >
                Attach Data Tables for Technical Description
              </Typography>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              <Typography
                textAlign="end"
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  textDecoration: 'underline',
                  //background: 'blue',
                  cursor: 'pointer',
                }}
                onClick={() => setOpen(true)}
              >
                View Sample Data
              </Typography>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              {/*{uploadedImages()}*/}
              {/*<Stack
                spacing={0}
                sx={{
                  //background: 'blue',
                  minHeight: '200px',
                  maxHeight: '200px',
                  border: '2px solid black',
                }}
                //alignItems="center"
              >
                
              </Stack>*/}
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="space-evenly"
                sx={{
                  height: '200px',
                  //background: 'aqua',
                  border: '2px solid black',
                  borderStyle: 'dashed',
                }}
                onClick={() => setImagesCount(imagesCount + 1)}
              >
                <AddIcon fontSize="large" />
                <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                  Attach More
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={9} lg={8} md={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Operational Description
          </Typography>
          <TextareaAutosize
            placeholder="(Events during the monitoring period,logs, Major shut down details, Timings, reasons)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              minHeight: '20vh',
              maxHeight: '20vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          />
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}

export default SectionB1

//import {
//  Box,
//  Grid,
//  TextareaAutosize,
//  Typography,
//  TextField,
//  Stack,
//  ImageList,
//  ImageListItem,
//} from '@mui/material'
//import React from 'react'
//import AddIcon from '@mui/icons-material/Add'

//const itemData = [
//  {
//    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//    title: 'Breakfast',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//    title: 'Burger',
//  },
//  //{
//  //  img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//  //  title: 'Camera',
//  //},
//  //{
//  //  img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//  //  title: 'Coffee',
//  //},
//  //{
//  //  img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//  //  title: 'Hats',
//  //},
//  {
//    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//    title: 'Honey',
//  },
//  {
//    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//    title: 'Basketball',
//  },
//  //{
//  //  img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//  //  title: 'Fern',
//  //},
//  //{
//  //  img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//  //  title: 'Mushrooms',
//  //},
//  //{
//  //  img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//  //  title: 'Tomato basil',
//  //},
//  //{
//  //  img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//  //  title: 'Sea star',
//  //},
//  //{
//  //  img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//  //  title: 'Bike',
//  //},
//]

//const SectionB1 = () => {
//  return (
//    <Box sx={{ mt: 4, mb: 3 }}>
//      <Grid container spacing={1}>
//        <Grid item xl={9} lg={8} md={8}>
//          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
//            Brief on purpose and general description of project activity *
//          </Typography>
//          <TextareaAutosize
//            placeholder="(Description of implemented registered project activity)"
//            style={{
//              minWidth: '100%',
//              maxWidth: '100%',
//              maxHeight: '100px',
//              minHeight: '100px',
//              borderRadius: 4,
//              border: '2px solid #1D4B44',
//            }}
//          />
//        </Grid>
//        <Grid item xl={9} lg={8} md={8}>
//          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
//            Technical Description
//          </Typography>
//          <TextareaAutosize
//            placeholder="(Technical description of the equipment, its specification, supplier name, installed by the project activity)"
//            style={{
//              minWidth: '100%',
//              maxWidth: '100%',
//              maxHeight: '18vh',
//              minHeight: '18vh',
//              borderRadius: 4,
//              border: '2px solid #1D4B44',
//            }}
//          />
//        </Grid>
//        <Grid item>
//          <Grid
//            container
//            direction="row"
//            alignItems={'center'}
//            justifyContent="space-between"
//            columnSpacing={2}
//            lg={8}
//          >
//            <Grid item lg={12}>
//              <Stack
//                direction="row"
//                //justifyContent="space-between"
//                alignItems="center"
//              >
//                <Typography sx={{ fontSize: 14, width: '100%' }}>
//                  Attach Data Tables for Major shut down details
//                </Typography>
//                <Typography
//                  textAlign="end"
//                  sx={{
//                    fontSize: 14,
//                    width: '100%',
//                    textDecoration: 'underline',
//                  }}
//                >
//                  View Sample Data
//                </Typography>
//              </Stack>
//            </Grid>
//            <Grid item xl={6} lg={6}>
//              {/*<ImageList
//                sx={{
//                  minWidth: '100%',
//                  maxWidth: '100%',
//                  minHeight: '100px',
//                  maxHeight: '1-0px',
//                  display: 'flex',
//                  flexDirection: 'row',
//                  //overflowX: 'hidden',
//                  overflowY: 'none',
//                  flex: '1',
//                }}
//                cols={3}
//                rowHeight={110}
//                gap={4}
//              >
//                {itemData.map((item) => (
//                  <ImageListItem key={item.img} sx={{ height: '25vh' }}>
//                    <img
//                      src={item.img}
//                      //srcSet={`${item.img}?w=104&h=104&fit=crop&auto=format&dpr=2 2x`}
//                      alt={item.title}
//                      //loading="lazy"
//                      width={90}
//                      height={90}
//                    />
//                  </ImageListItem>
//                ))}
//              </ImageList>*/}
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Stack
//                alignItems="center"
//                justifyContent="center"
//                spacing={2}
//                sx={{
//                  border: '2px solid #1D4B44',
//                  borderStyle: 'dashed',
//                  height: 100,
//                }}
//              >
//                <AddIcon />
//                <Typography>Attach More</Typography>
//              </Stack>
//            </Grid>
//          </Grid>
//        </Grid>
//        <Grid item xl={9} lg={8} md={8}>
//          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
//            Operational Description
//          </Typography>
//          <TextareaAutosize
//            placeholder="(Events during the monitoring period,logs, Major shut down details, Timings, reasons)"
//            style={{
//              minWidth: '100%',
//              maxWidth: '100%',
//              maxHeight: '18vh',
//              minHeight: '18vh',
//              borderRadius: 4,
//              border: '2px solid #1D4B44',
//            }}
//          />
//        </Grid>
//        <Grid item>
//          <Grid
//            container
//            direction="row"
//            alignItems={'center'}
//            justifyContent="space-between"
//            columnSpacing={2}
//            lg={12}
//          >
//            <Grid item lg={12}>
//              <Stack
//                direction="row"
//                //justifyContent="space-between"
//                alignItems="center"
//              >
//                <Typography sx={{ fontSize: 14, width: '100%' }}>
//                  Attach Data Tables for Major shut down details
//                </Typography>
//                <Typography
//                  textAlign="end"
//                  sx={{
//                    fontSize: 14,
//                    width: '100%',
//                    textDecoration: 'underline',
//                  }}
//                >
//                  View Sample Data
//                </Typography>
//              </Stack>
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
//                uploaded Images
//              </Box>
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Stack
//                alignItems="center"
//                //justifyContent="space-between"
//                justifyContent="center"
//                spacing={2}
//                sx={{
//                  border: '1px solid black',
//                  borderStyle: 'dashed',
//                  height: 100,
//                }}
//              >
//                <AddIcon />
//                <Typography>Attach More</Typography>
//              </Stack>
//            </Grid>
//          </Grid>
//        </Grid>
//        <Grid item>
//          <Grid
//            container
//            direction="row"
//            alignItems={'center'}
//            justifyContent="space-between"
//            columnSpacing={2}
//            lg={12}
//          >
//            <Grid item lg={12}>
//              <Stack
//                direction="row"
//                //justifyContent="space-between"
//                alignItems="center"
//              >
//                <Typography sx={{ fontSize: 14, width: '100%' }}>
//                  Attach Data Tables for Major shut down details
//                </Typography>
//                <Typography
//                  textAlign="end"
//                  sx={{
//                    fontSize: 14,
//                    width: '100%',
//                    textDecoration: 'underline',
//                  }}
//                >
//                  View Sample Data
//                </Typography>
//              </Stack>
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
//                uploaded Images
//              </Box>
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Stack
//                alignItems="center"
//                justifyContent="center"
//                spacing={2}
//                sx={{
//                  border: '1px solid black',
//                  borderStyle: 'dashed',
//                  height: 100,
//                }}
//              >
//                <AddIcon />
//                <Typography>Attach More</Typography>
//              </Stack>
//            </Grid>
//          </Grid>
//        </Grid>
//        <Grid item>
//          <Grid
//            container
//            direction="row"
//            alignItems={'center'}
//            justifyContent="space-between"
//            columnSpacing={2}
//            lg={12}
//          >
//            <Grid item lg={12}>
//              <Stack
//                direction="row"
//                //justifyContent="space-between"
//                alignItems="center"
//              >
//                <Typography sx={{ fontSize: 14, width: '100%' }}>
//                  Attach Data Tables for Major shut down details
//                </Typography>
//                <Typography
//                  textAlign="end"
//                  sx={{
//                    fontSize: 14,
//                    width: '100%',
//                    textDecoration: 'underline',
//                  }}
//                >
//                  View Sample Data
//                </Typography>
//              </Stack>
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Box sx={{ border: '1px solid black', minHeight: '100px' }}>
//                uploaded Images
//              </Box>
//            </Grid>
//            <Grid item lg={6} sx={{ minWidth: '50%', maxWidth: '50%' }}>
//              <Stack
//                alignItems="center"
//                justifyContent="center"
//                spacing={2}
//                sx={{
//                  border: '1px solid black',
//                  borderStyle: 'dashed',
//                  height: 100,
//                }}
//              >
//                <AddIcon />
//                <Typography>Attach More</Typography>
//              </Stack>
//            </Grid>
//          </Grid>
//        </Grid>
//      </Grid>
//    </Box>
//  )
//}

//export default SectionB1

//{
//  /*<Grid item xl={8} lg={8} sx={{ background: 'aqua' }}>
//          <Grid container direction="row" alignItems="center" spacing={2}>
//            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
//              <Grid item lg={12}>
//                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
//                  Attach Data Tables for Major shut down details
//                </Typography>
//              </Grid>
//              <Box sx={{ border: '2px solid black', height: '100px' }}>
//                uploaded Images
//              </Box>
//            </Grid>
//            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
//              <Typography
//                textAlign="end"
//                sx={{ fontSize: 14, textDecoration: 'underline' }}
//              >
//                View Sample Data
//              </Typography>
//              <Stack
//                direction="column"
//                alignItems="center"
//                sx={{
//                  border: '1px solid black',
//                  borderStyle: 'dashed',
//                  height: '100px',
//                }}
//              >
//                <AddIcon />
//                Attach more
//              </Stack>
//            </Grid>
//          </Grid>
//        </Grid>*/
//}

//-------------
//{/*<Grid container>
//        <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
//          <Grid container direction="column">
//            {/*headings*/}
//            <Grid item xl={9} lg={8}>
//              <Stack direction="row" justifyContent="space-between" spacing={2}>
//                <Typography
//                  sx={{
//                    fontSize: 14,
//                    fontWeight: 400,
//                    background: 'red',
//                    width: '100%',
//                  }}
//                >
//                  Attach Data Tables for Technical Description
//                </Typography>
//                <Typography
//                  textAlign="end"
//                  sx={{
//                    fontSize: 14,
//                    fontWeight: 400,
//                    background: 'blue',
//                    width: '100%',
//                  }}
//                >
//                  View Sample Data
//                </Typography>
//              </Stack>
//            </Grid>
//            <Grid item xl={12} lg={12}>
//              <Stack
//                direction="row"
//                alignItems="center"
//                justifyContent="space-between"
//                spacing={2}
//              >
//                {/*image*/}
//                <Box
//                  sx={{
//                    background: 'red',
//                    width: '100%',
//                    minHeight: '20vh',
//                    maxHeight: '20vh',
//                  }}
//                >
//                  <ImageList
//                    variant="standard"
//                    sx={{ border: '2px solid red' }}
//                  >
//                    {itemData.map((item) => (
//                      <ImageListItem key={item.img}>
//                        <img src={item.img} />
//                      </ImageListItem>
//                    ))}
//                  </ImageList>
//                </Box>
//                {/*attach more*/}
//                <Box
//                  sx={{
//                    background: 'blue',
//                    width: '100%',
//                    minHeight: '20vh',
//                    maxHeight: '20vh',
//                  }}
//                >
//                  <Stack
//                    direction="column"
//                    alignItems="center"
//                    justifyContent="space-evenly"
//                    spacing={3}
//                    sx={{
//                      border: '2px solid #1D4B44',
//                      borderStyle: 'dashed',
//                      //width: '100%',
//                      height: '20vh',
//                    }}
//                  >
//                    <AddIcon fontSize="large" />
//                    <Typography>Attach More</Typography>
//                  </Stack>
//                </Box>
//              </Stack>
//            </Grid>
//          </Grid>
//        </Grid>
//        {/*<Typography>testing</Typography>*/}
//        {/*</Grid>*/}
//      </Grid>*/}
