import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../theme'
import Reports from './Reports'

interface ReportsTabProps {
  projectDetails: any
}
const ReportsTab: FC<ReportsTabProps> = ({ projectDetails }) => {
  return (
    <Box>
      {projectDetails?.project_status === 4 ? (
        <Box
          sx={{
            p: 4,
            mt: 1,
            background: '#FFF',
            color: Colors.darkPrimary1,
            fontSize: 22,
            fontWeight: 500,
            borderRadius: '8px',
          }}
        >
          Verifier Yet to be confirmed from Issuer side
        </Box>
      ) : null}
      {projectDetails?.project_status > 4 ? (
        <Reports projectDetails={projectDetails} />
      ) : null}
    </Box>
  )
}

export default ReportsTab
