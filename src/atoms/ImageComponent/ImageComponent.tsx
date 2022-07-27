import React, { FC, useState } from 'react'
import { Box, Grid, TextareaAutosize, Typography, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SampleModal from '../../atoms/SampleModal/SampleModal'

const ImageComponent: FC = () => {
    const [imageArray, setImageArray]: Array<any> = useState([])
  
    return (
      <Grid container>
        {itemData.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              component="img"
              sx={{
                height: '250px',
                width: '420px',
                margin: '20px',
                // border: '2px solid',
              }}
              src={item.img}
            />
          )
        })}
  
        {/* <Input
          // component="input"
          type="file"
          // display="flex"
          // justifyContent="center"
          // alignItems="center"
          sx={{
            height: '250px',
            width: '420px',
            border: '2px dashed',
            marginLeft: '10px',
            margin: '20px',
          }}
          onChange={(event: any) => {
            console.log(event.target.files[0])
  
            setImageArray([...imageArray, event.target.files[0]])
            // setSelectedImage(event.target.files[0]);
          }}
        /> */}
        {/* <AddIcon />
          <Typography sx={{ fontSize: 20 }}>Attach More</Typography>
        </Input> */}
  
        <Box
          // component="input"
          // type="file"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '250px',
            width: '420px',
            border: '2px dashed',
            marginLeft: '10px',
            margin: '20px',
          }}
        >
          <AddIcon />
          <Typography sx={{ fontSize: 20 }}>Attach More</Typography>
        </Box>
       
      </Grid>
    )
  }
  
  export default ImageComponent


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
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
  ]
  