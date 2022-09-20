// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import ArticleIcon from '@mui/icons-material/Article'
import DownloadIcon from '@mui/icons-material/Download'

// Local Imports
import TabSelector from '../../atoms/TabSelector/TabSelector'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import { Colors } from '../../theme'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'

const headings = [
  'Submitted On',
  'Next Submission date',
  'Report',
  'Report Version',
  'Status',
  'Conclusive Report',
  'CO2c Authorised',
  'Action',
]

interface ReportsTableProps {
  data?: any
}

const ReportsTable: FC<ReportsTableProps> = (props) => {
  const navigate = useNavigate()

  const [tabIndex, setTabIndex] = useState(1)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const reportsData: any = []

    props.data?.map((item: any, index: any) => {

      reportsData.push([
        moment(item.createdAt).format('DD/MM/YYYY'),
        moment(item.next_date).format('DD/MM/YYYY'),
        <Box
          key={'1'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              ml: 1,
              textAlign: 'left',
            }}
          >
            -
          </Typography>
          <ArticleIcon
            style={{ color: Colors.lightPrimary1, marginRight: 2 }}
          />
          <DownloadIcon style={{ color: Colors.lightPrimary1 }} />
        </Box>,
        '-',
        <ApprovalChip
          key={'1'}
          variant={item.status === 0 ? 'Pending' : 'Verified'}
        />,
        <Box
          key={'1'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              ml: 1,
              textAlign: 'left',
            }}
          >
            -
          </Typography>
          <ArticleIcon style={{ color: Colors.lightPrimary1 }} />
        </Box>,
        item.quantity,
        item.status === 0 ? (
          <TextButton
            key={'1'}
            sx={{ width: '90px' }}
            title="Verify"
            onClick={() =>
              navigate(pathNames.VERIFIER_VERIFY_REPORT, {
                state: {
                  project: item?.project_id,
                  pdf: item?.project_id?.project_pdf,
                },
              })
            }
          />
        ) : (
          '-'
        ),
      ])
    })

    setRows(reportsData)
  }, [props])

  return (
    <Paper
      sx={{
        p: 2,
        pt: 0,
        borderRadius: '8px',
        mb: 2,
        ml: 1,
        width: '100%',
        // pt: 3,
        pb: 3,
        mt: 2,
        // display: 'flex',
      }}
    >
      <TabSelector
        tabArray={['Reports']}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />

      <Typography sx={{ fontSize: 16, fontWeight: 500, mt: 2, mb: 2 }}>
        Reports Received
      </Typography>

      <CCTable
        headings={headings}
        rows={rows}
        sx={{ minWidth: 100 }}
        tableSx={{ minWidth: 100 }}
      />
    </Paper>
  )
}

export default ReportsTable
