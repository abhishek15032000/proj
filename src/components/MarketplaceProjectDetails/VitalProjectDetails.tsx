// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

// Local Imports

interface VitalProjectDetailsProps {}

const VitalProjectDetails: FC<VitalProjectDetailsProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        margin: 1,
        // height: '120px',
        backgroundColor: '#EEE',
        borderRadius: '8px',
        padding: 2,
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          width: '120px',
        }}
      >
        <Box
          sx={{
            height: '16px',
            width: '16px',
            backgroundColor: '#7ACB9F',
            borderRadius: '10px',
            marginRight: 1,
          }}
        />
        <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
          Project Verified
        </Typography>
      </Box>

      <Typography sx={{ fontSize: 24, fontWeight: 500, marginTop: 1 }}>
        Project : 3.66 MW poultry litter based power generation project by Raus
        Power in India
      </Typography>
      <Box
        sx={{
          display: 'flex',
          // justifyContent: 'center',
          alignItems: 'center',
          width: '130px',
          marginTop: 1,
        }}
      >
        <LocationOnIcon />

        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
          Mumbai, India
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 1,
          marginLeft: 3,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400, width: '200px' }}>
          Project Type :
        </Typography>

        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
          Green Energy
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 1,
          marginLeft: 3,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400, width: '200px' }}>
          Start Date :
        </Typography>

        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
          12 June 2021
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 1,
          marginLeft: 3,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400, width: '200px' }}>
          Duration of the Project :
        </Typography>

        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>1 Year</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: 1,
          marginLeft: 3,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400, width: '200px' }}>
          Project Area :
        </Typography>

        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>Mumbai</Typography>
      </Box>
    </Box>
  )
}

export default VitalProjectDetails
