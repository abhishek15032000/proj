import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
//MUI imports
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CCTable from '../../atoms/CCTable'
import { Box } from '@mui/system'

interface TokenAndContractProjectListProps {
  data: any
  background: string
}

const TokenAndContractProjectList = (
  props: TokenAndContractProjectListProps
) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Grid
        container
        columns={14}
        direction="row"
        sx={{
          //pt: 2,
          background: props?.background,
          //border: '2px solid black',
          py: 2,
        }}
      >
        <Grid item xs={2} sx={{ pl: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.date}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.type}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
            {props?.data?.Location}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{ pl: 4, cursor: 'pointer' }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Grid>
      </Grid>
      {showDetails && (
        <Box sx={{ pl: 2, pt: 2 }}>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
            Reports
          </Typography>
        </Box>
      )}
    </>
  )
}

export default TokenAndContractProjectList

const headings = [
  'Date of Report Submission',
  'No of Co2e Authorised',
  'Date of Verification',
  'Comments',
]
const rows = [['21/11/2022 - 26/12/2022', '420', '31/12/2022', 'View']]
