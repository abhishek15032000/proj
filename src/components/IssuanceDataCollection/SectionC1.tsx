import {
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

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

const SectionC1 = () => {
  return (
    <Box>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xl={9} lg={8} md={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Description of monitoring system *
          </Typography>
          {/*<TextField
            id="outlined-basic"
            //label="Outlined"
            variant="outlined"
            label="(Description of the monitoring system,Organisational Structure of
the team, their roles & responsibilities, Training and Maintenance)"
            required
            sx={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          />*/}
          <TextareaAutosize
            placeholder="(Description of the monitoring system,Organisational Structure of
the team, their roles & responsibilities, Training and Maintenance)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={8} xs={12}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            Monitoring Plan *
          </Typography>
          <TextareaAutosize
            placeholder="(According to registered and the applied methodology, plan of monitoring variables)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          />
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
                }}
              >
                Veiw Sample Data
              </Typography>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Stack
                spacing={0}
                sx={{
                  //background: 'blue',
                  minHeight: '200px',
                  maxHeight: '200px',
                  border: '2px solid black',
                }}
                //alignItems="center"
              >
                <ImageList
                  sx={{
                    gridAutoFlow: 'column',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(160px,1fr)) !important',
                    gridAutoColumns: 'minmax(160px, 1fr)',
                    height: '100vh',
                    //overflow: 'hidden',.
                    //overflowX: 'hidden',
                    overflowX: 'auto',
                  }}
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img src={item.img} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Stack>
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
            Specific Datas Monitored *
          </Typography>
          <TextareaAutosize
            placeholder="(According to registered and the applied methodology, specific datas monitored)"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              maxHeight: '18vh',
              minHeight: '18vh',
              borderRadius: 4,
              border: '2px solid #1D4B44',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SectionC1
