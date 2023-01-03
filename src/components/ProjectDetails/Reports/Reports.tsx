import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CWTable from '../../../atoms/CWTable/CWTable'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

const headings = ['DATE', 'REPORT NAME', 'REPORT ISSUER', '']

interface ReportTdProps {
  name: string
}
const ReportTd: React.FC<ReportTdProps> = ({ name }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <DescriptionOutlinedIcon />
      {name}
    </Box>
  )
}

interface ReportIssuerTdProps {
  name: string
}
const ReportIssuerTd: React.FC<ReportIssuerTdProps> = ({ name }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <PersonOutlineOutlinedIcon />
      {name}
    </Box>
  )
}

const rows = [
  [
    '11/07/2022',
    <ReportTd key="Verification Report 1" name="Verification Report 1" />,
    <ReportIssuerTd key="Issuer Name 1" name="Issuer Name 1" />,
    <Box
      key={1}
      sx={{
        background: '#fff',
        py: 1,
        color: '#000',
        borderRadius: '32px',
        cursor: 'pointer',
      }}
    >
      View Report
    </Box>,
  ],
  [
    '11/07/2022',
    <ReportTd key="Verification Report 1" name="Verification Report 1" />,
    <ReportIssuerTd key="Issuer Name 1" name="Issuer Name 1" />,
    <Box
      key={1}
      sx={{
        background: '#fff',
        py: 1,
        color: '#000',
        borderRadius: '32px',
        cursor: 'pointer',
      }}
    >
      View Report
    </Box>,
  ],
  [
    '11/07/2022',
    <ReportTd key="Verification Report 1" name="Verification Report 1" />,
    <ReportIssuerTd key="Issuer Name 1" name="Issuer Name 1" />,
    <Box
      key={1}
      sx={{
        background: '#fff',
        py: 1,
        color: '#000',
        borderRadius: '32px',
        cursor: 'pointer',
      }}
    >
      View Report
    </Box>,
  ],
]

const Reports = () => {
  return (
    <Box
      sx={{
        background: '#111E17',
        padding: '2vw 6vw',
        color: '#fff',
        width: '100%',
      }}
    >
      <Typography sx={{ fontSize: '32px', color: '#55DBC8' }}>
        Reports
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CWTable headings={headings} rows={rows} pagination={rows.length > 3} />
      </Box>
    </Box>
  )
}

export default Reports
