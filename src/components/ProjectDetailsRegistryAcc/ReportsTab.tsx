import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import Reports from './Reports'

interface ReportsTabProps {
  projectDetails: any
}
const ReportsTab: FC<ReportsTabProps> = ({ projectDetails }) => {
  return (
    <Box>
      {projectDetails?.project_status === 4 ||
      projectDetails?.project_status === 3 ? (
        <Box
          sx={{
            p: 4,
            mt: 1,
            background: '#FFF',
            color: Colors.darkPrimary1,
            fontSize: 22,
            fontWeight: 500,
            borderRadius: '8px',
            boxShadow: '0px 5px 20px rgba(45, 95, 87, 0.1)',
          }}
        >
          {projectDetails?.project_status === 4
            ? 'Verifier Yet to be confirmed from Issuer side'
            : 'Please Approve or Reject Project Developer request'}
        </Box>
      ) : null}
      {projectDetails?.project_status > 4 ? (
        <Reports projectDetails={projectDetails} />
      ) : null}
    </Box>
  )
}

export default ReportsTab
