// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Box, Grid, List, ListItem, Typography } from '@mui/material'

// Local Imports
import VerifierReportListItem from './VerifierReportListItem'
import CCTable from '../../atoms/CCTable'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
interface VerifierReportListProps {
  data?: any
}

const VerifierReport: FC<VerifierReportListProps> = (props) => {
  const headings = [
    'Submitted On',
    'Submit By (Set by Verifier)',
    'Reviewed On (By Verifier)',
    'Report',
    'Report Version',
    'Status',
    'CO2e Sequestered',
    'Comments Received',
  ]
  const rows = [
    [
      '28 May 2020',
      '28 May 2020',
      '28 May 2020',
      <Box
        key={'1'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'Project Issuance '}
        </Typography>
      </Box>,
      'V1.0',
      'Requested for resubmission',
      '423',
      <Box
        key={'1'}
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'View Comments'}
        </Typography>
        <ChevronRightIcon style={{ color: '#667080' }} />
      </Box>,
    ],
    [
      '28 May 2020',
      '28 May 2020',
      '28 May 2020',
      <Box
        key={'2'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'Project Issuance '}
        </Typography>
      </Box>,
      'V1.0',
      'Requested for resubmission',
      '423',
      <Box
        key={'2'}
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'View Comments'}
        </Typography>
        <ChevronRightIcon style={{ color: '#667080' }} />
      </Box>,
    ],
    [
      '28 May 2020',
      '-',
      '28 May 2020',
      <Box
        key={'3'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'Project Issuance '}
        </Typography>
      </Box>,
      'V1.0',
      'Requested for resubmission',
      '423',
      <Box
        key={'3'}
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'View Comments'}
        </Typography>
        <ChevronRightIcon style={{ color: '#667080' }} />
      </Box>,
    ],
    [
      '28 May 2020',
      '28 May 2020',
      '28 May 2020',
      <Box
        key={'4'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'Project Issuance '}
        </Typography>
      </Box>,
      'V1.0',
      'Requested for resubmission',
      '423',
      <Box
        key={'4'}
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'View Comments'}
        </Typography>
        <ChevronRightIcon style={{ color: '#667080' }} />
      </Box>,
    ],
    [
      '28 May 2020',
      '-',
      '28 May 2020',
      <Box
        key={'5'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'Project Issuance '}
        </Typography>
      </Box>,
      'V1.0',
      'Requested for resubmission',
      '423',
      <Box
        key={'5'}
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'View Comments'}
        </Typography>
        <ChevronRightIcon style={{ color: '#667080' }} />
      </Box>,
    ],
    [
      '28 May 2020',
      '28 May 2020',
      '28 May 2020',
      <Box
        key={'6'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'Project Issuance '}
        </Typography>
      </Box>,
      'V1.0',
      'Requested for resubmission',
      '423',
      <Box
        key={'6'}
        sx={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid black',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            color: '#2B2B2B',
          }}
        >
          {'View Comments'}
        </Typography>
        <ChevronRightIcon style={{ color: '#667080' }} />
      </Box>,
    ],
  ]

  return (
    <Grid container>
      {props.data?.map((item: any, index: number) => (
        <VerifierReportListItem key={index} data={item} />
      ))}
      <Box
        sx={{
          mt: 2,
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E8F3EF',
        }}
      >
        <Typography>Your project’s review report will show up here</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <CCTable headings={headings} rows={rows} />
      </Box>
    </Grid>
  )
}

export default VerifierReport
