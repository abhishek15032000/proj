import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import CCTable from '../../atoms/CCTable'
import StatusChips from '../../atoms/StatusChips/StatusChips'
import { pathNames } from '../../routes/pathNames'
import { limitTitle } from '../../utils/commonFunctions'

const headings: any = [
  'Created on',
  'Received on',
  'Project Developer',
  'Project name',
  'Monthly Report Submission Dt',
  'Review Status',
  'Action',
]

const ProjectTable = () => {
  const navigate = useNavigate()

  const renderStatusChips = (status: number) => {
    // let bac
    switch (status) {
      case 1: {
        return (
          <StatusChips
            text="Pending"
            textColor=""
            backgroundColor=""
            cirlceColor=""
          />
        )
      }
      case 2: {
        return (
          <StatusChips
            text="In progress"
            textColor=""
            backgroundColor="rgba(243, 186, 77, 0.24)"
            cirlceColor="#E6A603"
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
      <Box
        key={'1'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WorkOutlineIcon />
        <Typography sx={{ fontSize: 14, fontWeight: 400, ml: 1 }}>
          {/* {item.verifier_details_id?.verifier_name} */}
          ABC verifier
        </Typography>
      </Box>,
      limitTitle(
        '33.66 MW poultry litter based power generation project by Raus Power in India',
        20
      ),
      moment().format('l'),
      renderStatusChips(1),
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
          minWidth: 0,
        }}
        onClick={() => navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC)}
      >
        Start review
      </CCButton>,
    ],
  ]

  return (
    <>
      <CCTable headings={headings} rows={rows} />
    </>
  )
}

export default ProjectTable
