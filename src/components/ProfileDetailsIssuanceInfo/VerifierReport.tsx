// React Imports
import React, { FC, useEffect, useState } from 'react'
// MUI Imports
import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
// Local Imports
import VerifierReportListItem from './VerifierReportListItem'
import CCTable from '../../atoms/CCTable'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import { verifierCalls } from '../../api/verifierCalls.api'
import Spinner from '../../atoms/Spinner'
//image Imports
import illustration4 from '../../assets/Images/illustrations/illustration4.svg'
import { CircleNotifications } from '@mui/icons-material'
interface VerifierReportListProps {
  //data?: any
  //selectedVerifiersData?: []
  currentProjectId: 'string'
}

const VerifierReport: FC<VerifierReportListProps> = (props) => {
  const [verifierReports, setVerifierReports] = useState<any>([])
  const [showTable, setShowTable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getVerifierByProject()
  }, [])

  const getVerifierByProject = () => {
    setLoading(true)
    verifierCalls
      .getVerifierByProjectId(props?.currentProjectId)
      .then((res) => {
        if (res?.success) {
          const finalVerifierData = res?.data.filter((i: any) => {
            return i?.accepted_by_issuer && i?.accepted_by_verifier
          })
          finalVerifierData && finalVerifierData?.length
            ? setVerifierReports(finalVerifierData)
            : setVerifierReports(res?.data)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  const updateVerifier = (confirmedVerifier: any) => {
    const payload = {
      _id: confirmedVerifier?._id,
      project_id: confirmedVerifier?.project_id,
      project_status: confirmedVerifier?.project_status,
      verifier_id: confirmedVerifier?.verifier_id,
      verifier_name: confirmedVerifier?.verifier_name,
      verifier_address: confirmedVerifier?.verifier_address,
      verifier_number: confirmedVerifier?.verifier_number,
    }

    verifierCalls
      .updateVerifier(payload)
      .then((res) => {
        if (res?.success) {
          if (res?.data.acknowledged) {
            alert('successfully confirmed Verifier')
            getVerifierByProject()
          }
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          Verifiers Selected
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {loading === true ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 250 }}
          >
            <Spinner />
          </Stack>
        ) : (
          <Grid container rowSpacing={3}>
            {verifierReports &&
              verifierReports?.length > 0 &&
              verifierReports?.map((verifier: any, index: number) => (
                <Grid item key={index} xs={12}>
                  <VerifierReportListItem
                    data={verifier}
                    updateVerifierAPI={updateVerifier}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        {showTable ? (
          <CCTable headings={headings} rows={rows} />
        ) : (
          <Box
            sx={{
              height: '330px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E8F3EF',
            }}
          >
            <Typography sx={{ mb: 3, fontSize: 16, fontWeight: 500 }}>
              Your project’s review report will show up here
            </Typography>
            <img src={illustration4} />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default VerifierReport
const headings = [
  'Submitted On',
  'Next Submission',
  'Report',
  'Version',
  'Status',
  'CO2e Sequestered',
  'Report Received',
  'comment Received',
  'Action',
]
const rows = [
  [
    '28 May 2020',
    '28 May 2020',
    //'28 May 2020',
    <Box
      key={'1'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '14px',
          color: '#2B2B2B',
        }}
      >
        {'Project Issuance '}
      </Typography>
    </Box>,
    'V1.0',
    <Chip
      sx={{ backgroundColor: '#75F8E4' }}
      key="1"
      icon={
        <CircleNotifications fontSize="small" style={{ color: '#00A392' }} />
      }
      label={'Finalised'}
    />,
    '420',
    <Box
      key={'1'}
      sx={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid black',
      }}
    >
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
    </Box>,
    <Typography
      key="1"
      sx={{
        color: '#006B5E',
        fontSize: 16,
        fontWeight: 600,
        textDecoration: 'underline',
      }}
    >
      View
    </Typography>,
    '-',
  ],
  [
    '28 May 2020',
    '28 May 2020',
    //'28 May 2020',
    <Box
      key={'1'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '14px',
          color: '#2B2B2B',
        }}
      >
        {'Project Issuance '}
      </Typography>
    </Box>,
    'V1.0',
    <Chip
      sx={{ backgroundColor: '#75F8E4' }}
      key="1"
      icon={
        <CircleNotifications fontSize="small" style={{ color: '#00A392' }} />
      }
      label={'Finalised'}
    />,
    '420',
    <Box
      key={'1'}
      sx={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid black',
      }}
    >
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
    </Box>,
    <Typography
      key="1"
      sx={{
        color: '#006B5E',
        fontSize: 16,
        fontWeight: 600,
        textDecoration: 'underline',
      }}
    >
      View
    </Typography>,
    '-',
  ],
  [
    '28 May 2020',
    '28 May 2020',
    //'28 May 2020',
    <Box
      key={'1'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '14px',
          color: '#2B2B2B',
        }}
      >
        {'Project Issuance '}
      </Typography>
    </Box>,
    'V1.0',
    <Chip
      sx={{ backgroundColor: '#75F8E4' }}
      key="1"
      icon={
        <CircleNotifications fontSize="small" style={{ color: '#00A392' }} />
      }
      label={'Finalised'}
    />,
    '420',
    <Box
      key={'1'}
      sx={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid black',
      }}
    >
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
      <TextSnippetOutlinedIcon sx={{ color: '#388E81' }} />
    </Box>,
    <Typography
      key="1"
      sx={{
        color: '#006B5E',
        fontSize: 16,
        fontWeight: 600,
        textDecoration: 'underline',
      }}
    >
      View
    </Typography>,
    '-',
  ],
]
