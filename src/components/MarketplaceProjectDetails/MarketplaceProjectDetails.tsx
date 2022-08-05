// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import CCTitleValue from '../../atoms/CCTitleValue/CCTitleValue'
import LocationOnIcon from '@mui/icons-material/LocationOn'

// Local Imports

interface MarketplaceProjectDetailsProps {}

const MarketplaceProjectDetails: FC<MarketplaceProjectDetailsProps> = (
  props
) => {
  return (
    <Box sx={{ p: 0 }}>
      <Grid
        container
        xs={12}
        sx={{ p: 0, border: '0px solid' }}
        justifyContent={'space-between'}
      >
        <BackHeader title="Project Details" iconDisable />

        <Box
          sx={{
            width: '100%',
            margin: 1,
            // height: '120px',
            backgroundColor: '#EEE',
            borderRadius: '8px',
            padding: 2,
            marginTop: 2
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
            Project : 3.66 MW poultry litter based power generation project by
            Raus Power in India
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

            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              1 Year
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
              Project Area :
            </Typography>

            <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
              Mumbai
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', margin: 1 }}>
          <CCTitleValue
            title="Total CO2C Tokens :"
            value="981"
            fontSize={16}
            fontWeight={500}
            sx={{ marginTop: 3, width: '240px', marginBottom: 1.5 }}
          />

          <Typography sx={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>
            Documentation
          </Typography>
          <CCTable headings={headings} rows={rows} maxWidth={900} />
        </Box>
      </Grid>
    </Box>
  )
}

export default MarketplaceProjectDetails

const rows = [
  [
    'Issuance',
    'Issuance',
    '17 July, 2021',
    <Typography
      key={1}
      sx={{ fontSize: 16, fontWeight: 600, textDecoration: 'underline' }}
    >
      View Document
    </Typography>,
  ],
  [
    'Issuance',
    'Issuance',
    '17 July, 2021',
    <Typography
      key={1}
      sx={{ fontSize: 16, fontWeight: 600, textDecoration: 'underline' }}
    >
      View Document
    </Typography>,
  ],
  [
    'Issuance',
    'Issuance',
    '17 July, 2021',
    <Typography
      key={1}
      sx={{ fontSize: 16, fontWeight: 600, textDecoration: 'underline' }}
    >
      View Document
    </Typography>,
  ],
  [
    'Issuance',
    'Issuance',
    '17 July, 2021',
    <Typography
      key={1}
      sx={{ fontSize: 16, fontWeight: 600, textDecoration: 'underline' }}
    >
      View Document
    </Typography>,
  ],
]

const headings = [
  'Document Name',
  'Document Type',
  'Date of Upload',
  'Documents',
]
