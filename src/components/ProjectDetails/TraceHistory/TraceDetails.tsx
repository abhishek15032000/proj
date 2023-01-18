import { Grid, Typography, Box, Radio, Paper } from '@mui/material'
import { borderColor } from '@mui/system'

import React, { FC, useEffect, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import { Colors, Images } from '../../../theme'
import TitleValue from '../../Profile/TitleValue'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import moment from 'moment'
import { PROJECT_STATUS } from '../../../config/constants.config'
import CreateProject from './AllTraceTabDetails/CreateProject'
import SubmitVerification from './AllTraceTabDetails/SubmitVerification'
import Buyer from './AllTraceTabDetails/Buyer'
import VerificationReport from './AllTraceTabDetails/VerificationReport'
import RegsitryVerificationReport from './AllTraceTabDetails/RegsitryVerificationReport'
import ApproveReport from './AllTraceTabDetails/ApproveReport'
import VerificationRequest from './AllTraceTabDetails/VerificationRequest'
import VerificationProcess from './AllTraceTabDetails/VerificationProcess'
import GetVerificationReport from './AllTraceTabDetails/GetVerificationReport'

export interface TraceDetailsProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
}

const TraceDetails: FC<TraceDetailsProps> = (props) => {
  const {
    traceOption,
    setTraceOption,
    theme,
    projectId,
    projectDetails,
    traceTab,
  } = props

  const renderTab = [
    <CreateProject key={0} {...props} />,
    <SubmitVerification key={1} {...props} />,
    <VerificationRequest key={2} {...props} />,
    <VerificationProcess key={3} {...props} />,
    <VerificationReport key={4} {...props} />,
    <ApproveReport key={5} {...props} />,
    <RegsitryVerificationReport key={6} {...props} />,
    <GetVerificationReport key={7} {...props} />,
    <Buyer key={8} {...props} />,
  ]
  return (
    <Paper
      sx={{
        background: theme === 'dark' ? 'rgba(0, 107, 94, 0.08)' : '#FAFDFA',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        p: 4,

        width: '100%',
        height: '520px',
        py: 5,
        overflowX: 'hidden',
        boxShadow: '0px 5px 20px rgba(45, 95, 87, 0.1)',
      }}
      className="trace-details"
    >
      <Typography
        sx={{
          color: theme === 'dark' ? '#75F8E4' : '#006B5E',
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {moment(projectDetails?.createdAt).format(`DD/MM/YY`) +
          ' | ' +
          moment(projectDetails?.createdAt).format(`HH:MM:SS`)}
      </Typography>
      <Typography
        sx={{
          color: '#1A8EF5',
          fontSize: 12,
          fontWeight: 400,
          mt: 1,
        }}
      >
        {projectDetails?.tx && projectDetails?.tx?.lenght > 0
          ? projectDetails?.tx?.transaction_id
          : '-'}
      </Typography>

      {renderTab[traceOption]}
      <Typography
        sx={{
          color: theme === 'dark' ? '#75F8E4' : '#006B5E',
          fontSize: 16,
          fontWeight: 500,
          mt: '20px',
        }}
      >
        {'Relevant docs'}
      </Typography>
      {projectDetails?.report?.file_attach &&
        projectDetails?.report?.file_attach.length > 0 &&
        projectDetails?.report?.file_attach.map((file: any, index: number) => (
          <FileComp key={index} theme={theme} filename={file} />
        ))}
    </Paper>
  )
}
export default TraceDetails

interface FileCompProps {
  theme: string
  filename: any
}
const FileComp: FC<FileCompProps> = ({ theme, filename }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '40px',
        backgroundColor:
          theme === 'dark' ? 'rgba(25, 28, 27, 0.12)' : '#DAF7F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        pr: 1,
        mt: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
        }}
      >
        <InsertDriveFileIcon
          style={{
            color: '#388E81',
          }}
        />

        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              color: theme === 'dark' ? '#CCE8E1' : '#191C1B',
            }}
          >
            {/* {'Project introduction file.'} */}
            {filename}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              color: theme === 'dark' ? '#CCE8E1' : '#191C1B',
            }}
          >
            {/* {'0.5 MB'} */}
          </Typography>
          {/* )} */}
        </Box>
      </Box>
    </Box>
  )
}
