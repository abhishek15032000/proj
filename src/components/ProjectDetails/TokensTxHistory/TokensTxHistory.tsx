import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CWTable from '../../../atoms/CWTable/CWTable'
import { limitTitle } from '../../../utils/commonFunctions'

const headings = [
  'TX HASH',
  'ORDER ID',
  'PROJECT',
  'DATE',
  'TIME',
  'QUANTITY AVAILABLE',
  'QUANTITY RETIRED',
  'QUANTITY CANCELLED',
  'UNIT PRICE',
  'TOTAL AMOUNT',
  'QUANTITY LEFT',
]
const rows = [
  [
    limitTitle('tx7685tgvytrt', 7),
    'AS6TR69',
    limitTitle(
      '3.66 MW poultry litter based power generation project by Raus Power in India',
      20
    ),
    '11/07/2022',
    '19:21:28',
    '500',
    '50',
    '-',
    '122',
    '-',
    '-',
  ],
  [
    limitTitle('tx7685tgvytrt', 7),
    'AS6TR69',
    limitTitle(
      '3.66 MW poultry litter based power generation project by Raus Power in India',
      20
    ),
    '11/07/2022',
    '19:21:28',
    '500',
    '50',
    '-',
    '122',
    '-',
    '-',
  ],
  [
    limitTitle('tx7685tgvytrt', 7),
    'AS6TR69',
    limitTitle(
      '3.66 MW poultry litter based power generation project by Raus Power in India',
      20
    ),
    '11/07/2022',
    '19:21:28',
    '500',
    '50',
    '-',
    '122',
    '-',
    '-',
  ],
  [
    limitTitle('tx7685tgvytrt', 7),
    'AS6TR69',
    limitTitle(
      '3.66 MW poultry litter based power generation project by Raus Power in India',
      20
    ),
    '11/07/2022',
    '19:21:28',
    '500',
    '50',
    '-',
    '122',
    '-',
    '-',
  ],
]
const TokensTxHistory = () => {
  return (
    <Box sx={{ background: '#111E17', padding: '56px 6vw', color: '#fff' }}>
      <Typography sx={{ fontSize: '32px', color: '#55DBC8' }}>
        Tokens Transaction History
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CWTable headings={headings} rows={rows} pagination={true} />
      </Box>
    </Box>
  )
}

export default TokensTxHistory
