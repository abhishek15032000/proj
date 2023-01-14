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

interface TraceDetailsProps {
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
    <CreateProject
      key={0}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <SubmitVerification
      key={1}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <VerificationRequest
      key={2}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <VerificationProcess
      key={3}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <VerificationReport
      key={4}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <ApproveReport
      key={5}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <RegsitryVerificationReport
      key={6}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <GetVerificationReport
      key={7}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
    <Buyer
      key={8}
      traceOption={traceOption}
      setTraceOption={(item: any) => setTraceOption(item)}
      theme={theme}
      projectId={projectId}
      projectDetails={projectDetails}
      traceTab={traceTab}
    />,
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

        width: '70%',
        mt: '20px',
        height: '520px',
        py: 5,
        overflowX: 'hidden',
      }}
      // className="scroll-container"
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
        projectDetails?.report?.file_attach.map((item: any, index: number) => (
          <Box
            key={index}
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
                  // border:
                  //   theme === 'dark'
                  //     ? '2px solid #388E81'
                  //     : '2px solid #388E81',
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
                  {/* {props.title} */}
                  {'Project introduction file.'}
                </Typography>
                {/* {props.fileSize > 0 && ( */}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: theme === 'dark' ? '#CCE8E1' : '#191C1B',
                  }}
                >
                  {/* {props.fileSize} MB */}
                  {'0.5 MB'}
                </Typography>
                {/* )} */}
              </Box>
            </Box>
          </Box>
        ))}
    </Paper>
  )
}
export default TraceDetails
