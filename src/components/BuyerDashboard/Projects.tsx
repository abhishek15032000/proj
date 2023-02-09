import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { marketplaceCalls } from '../../api/marketplaceCalls.api'
import CCTable from '../../atoms/CCTable'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import { Colors, Images } from '../../theme'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'

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
  const [tableRows, setTableRows] = useState([])
  useEffect(() => {
    getPurchasedProject()
  }, [])

  const getPurchasedProject = async () => {
    const res = await marketplaceCalls.getPurchasedProject()
    if (res?.success) {
      const tableBodyData = res?.data.map((item: any, index: number) => {
        return [
          item?.uuid,
          moment(item?.receive_on).format('DD/MM/YYYY'),
          item?.issuer,
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Images.BriefcaseIcon} />
            <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
              {item?.name}
            </Typography>
          </Box>,
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
            {item?.type.map((type: string, index: number) => {
              return <Box key={index}>{type} </Box>
            })}
          </Box>,
          <Typography key={index} textAlign={'end'} sx={{ pr: '12%' }}>
            {item?.Co2_Sequestered}
          </Typography>,
          <Typography key={index} textAlign={'end'} sx={{ pr: '12%' }}>
            ${item?.unitPrice}
          </Typography>,
          <Typography key={index} textAlign={'end'} sx={{ pr: '12%' }}>
            ${item?.finalPrice}
          </Typography>,
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item?.status === 'success' && (
              <ApprovalChip variant={'Approved'} />
            )}
            {item?.status !== 'success' && (
              <ApprovalChip variant={'Rejected'} />
            )}
            <ChevronRightIcon sx={{ cursor: 'pointer' }} key="1" />
          </Box>,
        ]
      })
      setTableRows(tableBodyData)
    }
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography sx={{ fontSize: 22, color: Colors.darkPrimary1, mb: 2 }}>
        Purchased Projects
      </Typography>
      {tableRows.length === 0 && <CCTableSkeleton />}
      {tableRows.length > 0 && <CCTable headings={heading} rows={tableRows} />}
    </Paper>
  )
}

export default Projects
