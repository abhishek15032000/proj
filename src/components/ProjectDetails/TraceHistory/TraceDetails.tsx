import { Box, Grid, Paper, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../../hooks/reduxHooks'
import ApproveReport from './AllTraceTabDetails/ApproveReport'
import Buyer from './AllTraceTabDetails/Buyer'
import CreateProject from './AllTraceTabDetails/CreateProject'
import GetVerificationReport from './AllTraceTabDetails/GetVerificationReport'
import RegsitryVerificationReport from './AllTraceTabDetails/RegsitryVerificationReport'
import SubmitVerification from './AllTraceTabDetails/SubmitVerification'
import VerificationProcess from './AllTraceTabDetails/VerificationProcess'
import VerificationReport from './AllTraceTabDetails/VerificationReport'
import VerificationRequest from './AllTraceTabDetails/VerificationRequest'
import { downloadFile } from '../../../utils/commonFunctions'
import CCFileViewer from '../../../atoms/CCFileViewer/CCFileViewer'

export interface TraceDetailsProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
  txID?: ''
}

const TraceDetails: FC<TraceDetailsProps> = (props) => {
  const { traceOption, theme, projectDetails, txID } = props

  const renderTab = [
    <CreateProject key={0} {...props} />, //g Project created
    <SubmitVerification key={1} {...props} />, //g Verifier selected
    <VerificationRequest key={2} {...props} />, //o Verification requested
    <VerificationProcess key={3} {...props} />, //o Verification in progress
    <VerificationReport key={4} {...props} />, //g Project Verified
    <ApproveReport key={5} {...props} />, //o Registration in progress
    <RegsitryVerificationReport key={6} {...props} />, //g Project registered
    <GetVerificationReport key={7} {...props} />, //g Project registered
    // <Buyer key={8} {...props} />,
  ]

  const reportPDF = useAppSelector(
    ({ traceability }) => traceability?.reportPDF,
    shallowEqual
  )

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
        // pr: 12,
        overflowX: 'hidden',
        boxShadow: '0px 5px 20px rgba(45, 95, 87, 0.1)',
      }}
      className="trace-details"
    >
      <Box
        sx={{ width: '100%', pb: 2, mb: 2, borderBottom: '1px solid #E1E3E1' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '10px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: '#006B5E',
            }}
          >
            {projectDetails?.company_name}
          </Box>
          <Box>
            <Typography
              sx={{
                background: '#006B5E',
                color: 'white',
                padding: '2px 4px',
                borderRadius: '4px',
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {moment(projectDetails?.createdAt).format(`DD-MM-YYYY`) +
                ' | ' +
                moment(projectDetails?.createdAt).format(`HH:MM:SS`)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            width: '100%',
            mt: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ color: '#3F4946', fontSize: 14, fontWeight: 400 }}
            >
              Location:{' '}
              <span style={{ fontWeight: 500 }}>
                {projectDetails?.location}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ color: '#3F4946', fontSize: 14, fontWeight: 400 }}
            >
              Reference ID:{' '}
              <span style={{ fontWeight: 500 }}>
                {/* {projectDetails?.location} */}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* {txIDForTab ? (
        <Typography
          sx={{
            color: '#1A8EF5',
            fontSize: 12,
            fontWeight: 500,
            mt: 1,
            wordBreak: 'break-all',
          }}
        >
          <a
            href={`https://mumbai.polygonscan.com/tx/${txIDForTab}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#1A8EF5' }}
          >
            {txIDForTab}
          </a>
        </Typography>
      ) : null} */}
      {txID ? (
        <>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#00201B' }}>
            Transaction hash
          </Typography>
          <Typography
            sx={{
              color: '#1A8EF5',
              fontSize: 12,
              fontWeight: 500,
              wordBreak: 'break-all',
            }}
          >
            <a
              href={`https://mumbai.polygonscan.com/tx/${txID}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#1A8EF5' }}
            >
              {txID}
            </a>
          </Typography>
        </>
      ) : null}

      <Grid container columnSpacing={3}>
        {renderTab[traceOption]}
      </Grid>
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
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        {reportPDF ? (
          // <FileComp theme={theme} filename={'Project Report'} file={reportPDF} />
          <CCFileViewer title={reportPDF} fileSize={0} />
        ) : null}
        {projectDetails?.report?.file_attach &&
          projectDetails?.report?.file_attach.length > 0 &&
          projectDetails?.report?.file_attach.map(
            (file: any, index: number) => (
              <CCFileViewer
                key={index}
                title={file}
                index={index}
                fileSize={0}
              />
              // <FileComp key={index} theme={theme} filename={file} file={file} />
            )
          )}
      </Box>
    </Paper>
  )
}
export default TraceDetails

interface FileCompProps {
  theme: string
  filename: any
  file?: string
}
const FileComp: FC<FileCompProps> = ({ theme, filename, file }) => {
  return (
    <Box
      sx={{
        width: '100%',
        // height: '40px',
        backgroundColor:
          theme === 'dark' ? 'rgba(25, 28, 27, 0.12)' : '#DAF7F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        padding: '4px',
        mt: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pl: 1,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InsertDriveFileOutlinedIcon
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
              {filename}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: theme === 'dark' ? '#CCE8E1' : '#191C1B',
              }}
            ></Typography>
          </Box>
        </Box>
        {file ? (
          <FileDownloadIcon
            sx={{ color: '#388E81', ml: 1, cursor: 'pointer' }}
            onClick={() => {
              downloadFile(file)
            }}
          />
        ) : null}
      </Box>
    </Box>
  )
}
