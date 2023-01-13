import { Paper, Typography } from '@mui/material'
import React from 'react'
import CCTable from '../../atoms/CCTable'
import { Colors } from '../../theme'

const heading = [
  'Reference ID',
  'Received On',
  'Issuer',
  'Project Name',
  'Project Type',
  'C02e Sequestered',
  'Unit Price',
  'Final Price',
  'Status',
]
const Projects = () => {
  const rows: any = []
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 22, color: Colors.darkPrimary1, mb: 2 }}>
        Purchased Projects
      </Typography>
      <CCTable headings={heading} rows={rows} />
    </Paper>
  )
}

export default Projects
