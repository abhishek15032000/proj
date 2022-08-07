// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'

// Local Imports
import CCTable from '../../atoms/CCTable'

interface DocumentationListProps {}

const DocumentationList: FC<DocumentationListProps> = (props) => {
  return <CCTable headings={headings} rows={rows} maxWidth={900} />
}

export default DocumentationList

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
