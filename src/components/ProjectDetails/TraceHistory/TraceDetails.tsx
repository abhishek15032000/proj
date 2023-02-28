import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { Box, Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCFileViewer from '../../../atoms/CCFileViewer/CCFileViewer'
import StatusChips from '../../../atoms/StatusChips/StatusChips'
import { TRACEABILITY_TAB_NAMES } from '../../../config/constants.config'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { downloadFile } from '../../../utils/commonFunctions'
import Buyer from './AllTraceTabDetails/Buyer'
import CreateProject from './AllTraceTabDetails/CreateProject'
import ProjectMinted from './AllTraceTabDetails/ProjectMinted'
import PDFGenerated from './AllTraceTabDetails/PDFGenerated'
import TokenDeployed from './AllTraceTabDetails/TokenDeployed'
import VerificationReport from './AllTraceTabDetails/VerificationReport'
import VerifierAccept from './AllTraceTabDetails/VerifierAccept'
import VerifierAssign from './AllTraceTabDetails/VerifierAssign'
import VerifierRequest from './AllTraceTabDetails/VerifierRequest'
import VerifierVerified from './AllTraceTabDetails/VerifierVerified'
import RegistryReport from './AllTraceTabDetails/RegistryReport'

export interface TraceDetailsProps {
  traceOption?: any
  setTraceOption?: any
  theme?: any
  projectId?: any
  projectDetails?: any
  traceTab?: any
  txID?: ''
  projectName?: any
  projectLocation?: any
  projectRefID?: any
  tabData?: any
}

const TraceDetails: FC<TraceDetailsProps> = (props) => {
  const {
    traceOption,
    theme,
    projectName,
    projectLocation,
    projectRefID,
    tabData,
  } = props

  const renderTab = [
    <CreateProject key={0} {...props} />,
    <VerifierRequest key={1} {...props} />,
    <VerifierAccept key={2} {...props} />,
    <VerifierAssign key={3} {...props} />,
    <PDFGenerated key={5} {...props} />,
    <VerifierVerified key={6} {...props} />,
    <TokenDeployed key={7} {...props} />,
    <ProjectMinted key={8} {...props} />,
    <RegistryReport key={9} {...props} />,
  ]

  const renderStatusChips = (status: string) => {
    let text = ''

    switch (status) {
      case TRACEABILITY_TAB_NAMES.CREATE_PROJECT.type: {
        text = 'Project Created'
        break
      }
      case TRACEABILITY_TAB_NAMES.VERIFIER_REQUEST.type: {
        text = 'Verifier selection in progress'
        break
      }
      case TRACEABILITY_TAB_NAMES.VERIFIER_ACCEPTED.type: {
        text = 'Verifier accepted Project request'
        break
      }
      case TRACEABILITY_TAB_NAMES.VERIFIER_ASSIGN.type: {
        text = 'Final Verifier selected'
        break
      }
      case TRACEABILITY_TAB_NAMES.UPDATE_PROJECT_FINAL_PDF.type: {
        text = 'Registration Report Created'
        break
      }
      case TRACEABILITY_TAB_NAMES.PROJECT_VERIFIED.type: {
        text = 'Verifier verified Project'
        break
      }
      case TRACEABILITY_TAB_NAMES.DEPLOY_TOKEN.type: {
        text = 'Tokens Deployed'
        break
      }
      case TRACEABILITY_TAB_NAMES.PROJECT_MINTED.type: {
        text = 'Tokens Minted'
        break
      }
      case TRACEABILITY_TAB_NAMES.REGISTRY_UPLOADS_REPORT.type: {
        text = 'Registry verifies Report'
        break
      }
    }
    const greenStatuses = [
      TRACEABILITY_TAB_NAMES.CREATE_PROJECT.type,
      TRACEABILITY_TAB_NAMES.VERIFIER_ASSIGN.type,
      TRACEABILITY_TAB_NAMES.UPDATE_PROJECT_FINAL_PDF.type,
      TRACEABILITY_TAB_NAMES.PROJECT_VERIFIED.type,
      TRACEABILITY_TAB_NAMES.DEPLOY_TOKEN.type,
      TRACEABILITY_TAB_NAMES.PROJECT_MINTED.type,
      TRACEABILITY_TAB_NAMES.REGISTRY_UPLOADS_REPORT.type,
    ]
    const yellowStatuses = [
      TRACEABILITY_TAB_NAMES.VERIFIER_REQUEST.type,
      TRACEABILITY_TAB_NAMES.VERIFIER_ACCEPTED.type,
    ]

    if (greenStatuses.includes(status)) {
      return (
        <StatusChips
          text={text}
          textColor=""
          backgroundColor="#75F8E4"
          cirlceColor="#00A392"
        />
      )
    } else {
      return (
        <StatusChips
          text={text}
          textColor=""
          backgroundColor="rgba(243, 186, 77, 0.24)"
          cirlceColor="#E6A603"
        />
      )
    }
  }

  return (
    <Paper
      sx={{
        background: theme === 'dark' ? 'rgba(0, 107, 94, 0.08)' : '#FAFDFA',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        p: 3,
        width: '100%',
        height: '520px',
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
            {projectName}
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
              {moment(tabData?.createdAt).format(`DD-MM-YYYY | HH:mm:ss`)}
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
              <span style={{ fontWeight: 500 }}>{projectLocation}</span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ color: '#3F4946', fontSize: 14, fontWeight: 400 }}
            >
              Reference ID:{' '}
              <span style={{ fontWeight: 500 }}>{projectRefID}</span>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 1 }}>{renderStatusChips(tabData?.type)}</Box>
      </Box>

      <Grid container columnSpacing={3}>
        {renderTab[traceOption]}
      </Grid>
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
