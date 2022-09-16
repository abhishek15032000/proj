import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'

interface TokenAndContractProjectListProps {
  data: any
  background: string
}

const TokenAndContractProjectList = (
  props: TokenAndContractProjectListProps
) => {
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)

  //static table rows for reports
  const rows = [
    [
      <Typography key={'1'} sx={{ fontSize: 14, fontWeight: 400 }}>
        21/11/2022 - 26/12/2022
      </Typography>,
      <Typography
        key={'1'}
        textAlign="center"
        sx={{ pr: 1, fontSize: 14, fontWeight: 400 }}
      >
        420
      </Typography>,
      '31/12/2022',
      <Typography
        key={'1'}
        onClick={() => navigate(pathNames.REPORT_VIEW_COMMENTS)}
        sx={{
          fontSize: 16,
          fontWeight: 600,
          textDecoration: 'underline',
          textDecorationColor: '#006B5E',
          color: '#006B5E',
          cursor: 'pointer',
        }}
      >
        View
      </Typography>,
    ],
    [
      '21/11/2022 - 26/12/2022',
      <Typography
        key={'1'}
        textAlign="center"
        sx={{ pr: 1, fontSize: 14, fontWeight: 400 }}
      >
        420
      </Typography>,
      '31/12/2022',
      <Typography
        key={'1'}
        onClick={() => navigate(pathNames.REPORT_VIEW_COMMENTS)}
        sx={{
          fontSize: 16,
          fontWeight: 600,
          textDecoration: 'underline',
          textDecorationColor: '#006B5E',
          color: '#006B5E',
          cursor: 'pointer',
        }}
      >
        View
      </Typography>,
    ],
    [
      '21/11/2022 - 26/12/2022',
      <Typography
        key={'1'}
        textAlign="center"
        sx={{ pr: 1, fontSize: 14, fontWeight: 400 }}
      >
        420
      </Typography>,
      '31/12/2022',
      <Typography
        key={'1'}
        onClick={() => navigate(pathNames.REPORT_VIEW_COMMENTS)}
        sx={{
          fontSize: 16,
          fontWeight: 600,
          textDecoration: 'underline',
          textDecorationColor: '#006B5E',
          color: '#006B5E',
          cursor: 'pointer',
        }}
      >
        View
      </Typography>,
    ],
  ]
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
        <Box sx={{ pt: 1 }}>
          <Typography sx={{ pl: 2, fontWeight: 500, fontSize: 14 }}>
            Reports
          </Typography>
          <TableContainer sx={{ pl: 2, pb: 2, pt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: '#CCE8E1' }}>
                  {headings &&
                    headings.length &&
                    headings.map((tdCell: any, index: number) => (
                      <TableCell
                        key={index}
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        {tdCell}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.length &&
                  rows.map((row: any, index: number) => (
                    <TableRow key={index} sx={{ background: '#FAFDFA' }}>
                      {row.map((tdValue: any, index: number) => (
                        <TableCell
                          key={index}
                          sx={{ border: 'none', fontSize: 14, fontWeight: 400 }}
                        >
                          {tdValue}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  )
}

export default TokenAndContractProjectList

const headings = [
  <Typography key="1" sx={{ fontWeight: 500, fontSize: 12, minWidth: '10vw' }}>
    Date of Report Submission
  </Typography>,
  <Typography key="1" sx={{ fontWeight: 500, fontSize: 12, minWidth: '10vw' }}>
    No of Co2c Authorised
  </Typography>,
  'Date of Verification',
  'Comments',
]
