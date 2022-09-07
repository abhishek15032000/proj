// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Box, Chip, Grid, Paper, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

// Functional Imports
import moment from 'moment'

// Local Imports
import BackHeader from '../../atoms/BackHeader/BackHeader'
import { Colors } from '../../theme'
import { VerifierProjectsProps } from './VerifierProjects.interface'
import DashboardStatistics from './DashboardStatistics'
import TabSelectorVerifier from './TabSelectorVerifier'
import CCTable from '../../atoms/CCTable'
import TextButton from '../../atoms/TextButton/TextButton'
import ApprovalChip from '../../atoms/ApprovalChip/ApprovalChip'
import { verifierCalls } from '../../api/verifierCalls.api'

interface ListOfProjectsProps {
  data?: any
}

const headingsNew = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Status',
  'Action',
  '',
]

const headingsRegistered = [
  'Reference ID',
  'Recieved On',
  'Issuer',
  'Project Name',
  'Location',
  'Next Submission Dt',
  'Status',
  'Action',
  '',
]

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(1)
  const [rowsNew, setRowsNew] = useState([])
  const [rowsRegistered, setRowsRegistered] = useState([])

  const updateVerifierStatus = (status: any, data: any) => {
    const payload = {
      _id: data._id,
      project_id: data.project_id._id,
      project_status: status,
      verifier_id: data.verifier_id,
      verifier_name: data.verifier_name,
      verifier_number: data.verifier_number,
      verifier_address: data.verifier_address,
    }

    // console.log('payload')
    // console.log(JSON.stringify(payload, null, 4))

    verifierCalls.updateVerifier(payload).then((response) => {
      console.log('response')
      console.log(JSON.stringify(response.data, null, 4))
    })
  }

  useEffect(() => {
    const newData: any = [],
      registeredData: any = []

    props.data.map((item: any, index: any) => {
      if (
        item.project_status === 1 ||
        item.project_status === 2 ||
        item.project_status === 5 ||
        item.project_status === 6
      ) {
        newData.push([
          item.project_id._id,
          moment(item.createdAt).format('DD/MM/YYYY'),
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WorkOutlineIcon />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                ml: 1,
              }}
            >
              {item.project_id.company_name}
            </Typography>
          </Box>,
          item.verifier_name,
          item.verifier_address,
          item.project_status === 1 ? (
            <ApprovalChip key={index} variant={'Pending'} />
          ) : item.project_status === 2 ? (
            <ApprovalChip key={index} variant={'Approved'} />
          ) : (
            <ApprovalChip key={index} variant={'Rejected'} />
          ),
          item.project_status === 1 ? (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <TextButton sx={{ width: '90px' }} title="Approve" /> */}
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Colors.textColorDarkGreen,
                  ml: 2,
                  cursor: 'pointer',
                }}
                onClick={() => updateVerifierStatus(2, item)}
              >
                Approve
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: Colors.textColorBrightRed2,
                  ml: 2,
                  cursor: 'pointer',
                }}
                onClick={() => updateVerifierStatus(6, item)}
              >
                Reject
              </Typography>
            </Box>
          ) : (
            '-'
          ),
          <ChevronRightIcon key={index} />,
        ])
      }

      if (item.project_status === 3 || item.project_status === 4) {
        registeredData.push([
          item.project_id._id,
          moment(item.createdAt).format('DD/MM/YYYY'),
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WorkOutlineIcon />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                ml: 1,
              }}
            >
              {item.project_id.company_name}
            </Typography>
          </Box>,
          item.verifier_name,
          item.verifier_address,
          moment(item.createdAt).format('DD/MM/YYYY'),
          item.project_status === 3 ? (
            <ApprovalChip key={index} variant={'Pending'} />
          ) : (
            <ApprovalChip key={index} variant={'Verified'} />
          ),
          item.project_status === 3 ? (
            <TextButton key={index} sx={{ width: '90px' }} title="Verify" />
          ) : (
            '-'
          ),
          <ChevronRightIcon key={index} />,
        ])
      }
    })

    setRowsNew(newData)
    setRowsRegistered(registeredData)
  }, [props])

  return (
    <Paper
      sx={{
        width: '100%',
        borderRadius: '8px',
        mt: 4,
        p: 2,
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 400 }}>Projects</Typography>

      <TabSelectorVerifier
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        newProjects={4}
      />

      <CCTable
        headings={tabIndex === 1 ? headingsNew : headingsRegistered}
        rows={tabIndex === 1 ? rowsNew : rowsRegistered}
        sx={{ minWidth: 100 }}
        tableSx={{ minWidth: 100 }}
      />
    </Paper>
  )
}

export default ListOfProjects
