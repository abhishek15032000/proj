import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Box, Paper } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import StatusChips from '../../atoms/StatusChips/StatusChips'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'

const headings: any = [
  'Submitted On',
  'Next Submission Dt',
  'Report Name',
  'Report Version',
  'Status',
  'Verifier Report',
  'VCOTs Authorised',
  'Action',
]

const Reports = () => {
  const navigate = useNavigate()

  const renderStatusChips = (status: number) => {
    // let bac
    switch (status) {
      case 1: {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor="#E1E3E1"
            cirlceColor="#A8ACAA"
          />
        )
      }
      case 3: {
        return (
          <StatusChips
            text="Completed"
            textColor=""
            backgroundColor="#75F8E4"
            cirlceColor="#00A392"
          />
        )
      }
    }
  }
  const rows: any = [
    [
      moment().format('l'),
      moment().format('l'),
      <Box key={1} sx={{ display: 'flex' }}>
        <img
          src={Images.FileIcon}
          width="20px"
          height={'20px'}
          style={{ cursor: 'pointer' }}
        />
        Monitoring Report
        <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} />
      </Box>,
      'v1',
      renderStatusChips(1),
      <Box key={1} sx={{ display: 'flex' }}>
        <img
          src={Images.FileIcon}
          width="20px"
          height={'20px'}
          style={{ cursor: 'pointer' }}
        />
        Project Issuance
        {/* <FileDownloadOutlinedIcon sx={{ color: '#388E81' }} /> */}
      </Box>,
      '--',
      <CCButton
        key={1}
        sx={{
          background: '#006B5E',
          color: '#FFFFFF',
          borderRadius: '32px',
          fontSize: 14,
          px: 3,
          py: 1,
          // padding: '4px 8px',
          minWidth: '150px',
        }}
        onClick={() => navigate(pathNames.REGISTRY_REVIEW_REPORT)}
      >
        Start review
      </CCButton>,
    ],
  ]
  return (
    <>
      <Paper sx={{ borderRadius: '8px', padding: 2, mt: 4, mb: 1 }}>
        <Box sx={{ fontSize: 22, color: Colors.darkPrimary1 }}>
          Report received
        </Box>
        <CCTable headings={headings} rows={rows} />
      </Paper>
    </>
  )
}

export default Reports
