// React Imports
import React, { FC, useEffect, useState } from 'react'
// MUI Imports
import { Box, Grid, List, ListItem, Stack, Typography } from '@mui/material'
// Local Imports
import VerifierReportListItem from './VerifierReportListItem'
import CCTable from '../../atoms/CCTable'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import { verifierCalls } from '../../api/verifierCalls.api'
//image Imports
import illustration4 from '../../assets/Images/illustrations/illustration4.svg'
interface VerifierReportListProps {
  data?: any
  selectedVerifiersData?: []
  currentProjectId: 'string'
}

const VerifierReport: FC<VerifierReportListProps> = (props) => {
  const [verifierReports, setVerifierReports] = useState<any>([])

  console.log(props?.currentProjectId)

  useEffect(() => {
    getVerifierByProject()
  }, [])

  const getVerifierByProject = () => {
    verifierCalls
      .getVerifierByProjectId(props?.currentProjectId)
      .then((res) => {
        console.log(res)
        if (res?.success) {
          const g = res?.data.filter((i: any, index: number) => {
            return i?.accepted_by_issuer && i?.accepted_by_verifier
          })
          g && g?.length ? setVerifierReports(g) : setVerifierReports(res?.data)
        }
      })
      .catch((err) => console.log(err))
  }

  const updateVerifier = (confirmedVerifier: any) => {
    const payload = {
      _id: confirmedVerifier?._id,
      project_id: confirmedVerifier?.project_id,
      project_status: 'string',
      accepted_by_verifier: true,
      accepted_by_issuer: true,
      verifier_id: confirmedVerifier?.verifier_id,
      verifier_name: confirmedVerifier?.verifier_name,
      verifier_address: confirmedVerifier?.verifier_address,
      verifier_number: confirmedVerifier?.verifier_number,
    }

    //console.log('payload: ', payload)
    verifierCalls
      .updateVerifier(payload)
      .then((res) => {
        console.log(res)
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
        <Grid container rowSpacing={3}>
          {verifierReports &&
            verifierReports?.length &&
            verifierReports?.map((verifier: any, index: number) => (
              <Grid item key={index} xs={12}>
                <VerifierReportListItem
                  data={verifier}
                  updateVerifierAPI={updateVerifier}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mt: 2,
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
      </Grid>
    </Grid>
  )
}

export default VerifierReport
//const headings = [
//  'Submitted On',
//  'Submit By (Set by Verifier)',
//  'Reviewed On (By Verifier)',
//  'Report',
//  'Report Version',
//  'Status',
//  'CO2e Sequestered',
//  'Comments Received',
//]
//const rows = [
//  [
//    '28 May 2020',
//    '28 May 2020',
//    '28 May 2020',
//    <Box
//      key={'1'}
//      sx={{
//        display: 'flex',
//        flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//      }}
//    >
//      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'Project Issuance '}
//      </Typography>
//    </Box>,
//    'V1.0',
//    'Requested for resubmission',
//    '423',
//    <Box
//      key={'1'}
//      sx={{
//        flexDirection: 'row',
//        display: 'flex',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        borderBottom: '2px solid black',
//      }}
//    >
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'View Comments'}
//      </Typography>
//      <ChevronRightIcon style={{ color: '#667080' }} />
//    </Box>,
//  ],
//  [
//    '28 May 2020',
//    '28 May 2020',
//    '28 May 2020',
//    <Box
//      key={'2'}
//      sx={{
//        display: 'flex',
//        flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//      }}
//    >
//      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'Project Issuance '}
//      </Typography>
//    </Box>,
//    'V1.0',
//    'Requested for resubmission',
//    '423',
//    <Box
//      key={'2'}
//      sx={{
//        flexDirection: 'row',
//        display: 'flex',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        borderBottom: '2px solid black',
//      }}
//    >
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'View Comments'}
//      </Typography>
//      <ChevronRightIcon style={{ color: '#667080' }} />
//    </Box>,
//  ],
//  [
//    '28 May 2020',
//    '-',
//    '28 May 2020',
//    <Box
//      key={'3'}
//      sx={{
//        display: 'flex',
//        flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//      }}
//    >
//      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'Project Issuance '}
//      </Typography>
//    </Box>,
//    'V1.0',
//    'Requested for resubmission',
//    '423',
//    <Box
//      key={'3'}
//      sx={{
//        flexDirection: 'row',
//        display: 'flex',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        borderBottom: '2px solid black',
//      }}
//    >
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'View Comments'}
//      </Typography>
//      <ChevronRightIcon style={{ color: '#667080' }} />
//    </Box>,
//  ],
//  [
//    '28 May 2020',
//    '28 May 2020',
//    '28 May 2020',
//    <Box
//      key={'4'}
//      sx={{
//        display: 'flex',
//        flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//      }}
//    >
//      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'Project Issuance '}
//      </Typography>
//    </Box>,
//    'V1.0',
//    'Requested for resubmission',
//    '423',
//    <Box
//      key={'4'}
//      sx={{
//        flexDirection: 'row',
//        display: 'flex',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        borderBottom: '2px solid black',
//      }}
//    >
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'View Comments'}
//      </Typography>
//      <ChevronRightIcon style={{ color: '#667080' }} />
//    </Box>,
//  ],
//  [
//    '28 May 2020',
//    '-',
//    '28 May 2020',
//    <Box
//      key={'5'}
//      sx={{
//        display: 'flex',
//        flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//      }}
//    >
//      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'Project Issuance '}
//      </Typography>
//    </Box>,
//    'V1.0',
//    'Requested for resubmission',
//    '423',
//    <Box
//      key={'5'}
//      sx={{
//        flexDirection: 'row',
//        display: 'flex',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        borderBottom: '2px solid black',
//      }}
//    >
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'View Comments'}
//      </Typography>
//      <ChevronRightIcon style={{ color: '#667080' }} />
//    </Box>,
//  ],
//  [
//    '28 May 2020',
//    '28 May 2020',
//    '28 May 2020',
//    <Box
//      key={'6'}
//      sx={{
//        display: 'flex',
//        flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//      }}
//    >
//      <TextSnippetOutlinedIcon style={{ color: '#667080' }} />
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'Project Issuance '}
//      </Typography>
//    </Box>,
//    'V1.0',
//    'Requested for resubmission',
//    '423',
//    <Box
//      key={'6'}
//      sx={{
//        flexDirection: 'row',
//        display: 'flex',
//        justifyContent: 'space-between',
//        alignItems: 'center',
//        borderBottom: '2px solid black',
//      }}
//    >
//      <Typography
//        sx={{
//          fontFamily: 'Poppins',
//          fontStyle: 'normal',
//          fontWeight: '400',
//          fontSize: '14px',
//          color: '#2B2B2B',
//        }}
//      >
//        {'View Comments'}
//      </Typography>
//      <ChevronRightIcon style={{ color: '#667080' }} />
//    </Box>,
//  ],
//]
