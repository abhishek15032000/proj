// React Imports
import React, { FC, useEffect, useState } from 'react'
// MUI Imports
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
// Local Imports
import VerifierReportListItem from './VerifierReportListItem'
import CCTable from '../../atoms/CCTable'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import { verifierCalls } from '../../api/verifierCalls.api'
import Spinner from '../../atoms/Spinner'
//image Imports
import illustration4 from '../../assets/Images/illustrations/illustration4.svg'
import { CircleNotifications, KeyboardArrowLeft } from '@mui/icons-material'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import moment from 'moment'
import { addSectionPercentages } from '../../utils/newProject.utils'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { Colors } from '../../theme'
import AddIcon from '@mui/icons-material/Add'
import MonthlyReportUpdate, {
  setCurrentProjectDetails,
} from '../../redux/Slices/MonthlyReportUpdate'
import { useAppDispatch } from '../../hooks/reduxHooks'

import BlockchainCalls from '../../blockchain/Blockchain'
import { getLocalItem } from '../../utils/Storage'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'

interface VerifierReportListProps {
  //data?: any
  //selectedVerifiersData?: []
  currentProjectId: 'string'
  currentProjectUUID: 'string'
}

const VerifierReport: FC<VerifierReportListProps> = (props) => {
  const wallet_address = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )

  const [verifierReports, setVerifierReports] = useState<any>([])
  const [showTable, setShowTable] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [monthlyReportsList, setMonthlyReportsList] = useState<any>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    getVerifierByProject()
    getAllProjects()
  }, [])

  const getAllProjects = () => {
    setLoading(true)

    dataCollectionCalls
      .getAllMonthlyData(props?.currentProjectUUID)
      .then((res: any) => {
        if (res?.success) {
          const modifiedRows = res?.data

          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {'28 May 2020'}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {'28 May 2020'}
                </Typography>,

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
                    <CircleNotifications
                      fontSize="small"
                      style={{ color: '#00A392' }}
                    />
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

                <CCButton
                  key={index}
                  sx={{
                    backgroundColor: Colors.darkPrimary1,
                    padding: '8px 24px',
                    minWidth: '50px',
                    color: '#fff',
                    borderRadius: 10,
                    fontSize: 14,
                    mr: 1,
                  }}
                  onClick={() => addMonthlyData(i)}
                >
                  Resume
                </CCButton>,
              ]
            })
          setMonthlyReportsList(rows)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  const addMonthlyData = (item: any) => {
    navigate(pathNames.MONTHLY_REPORT_UPDATE)

    dispatch(setCurrentProjectDetails(item))
  }

  const getVerifierByProject = () => {
    setLoading(true)
    verifierCalls
      .getVerifierByProjectId(props?.currentProjectId)
      .then((res) => {
        if (res?.success) {
          const finalVerifierData = res?.data.filter((i: any) => {
            return i?.project_status === 3 || i?.project_status === 4
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
    setLoading(true)
    const payload = {
      _id: confirmedVerifier?._id,
      project_id: confirmedVerifier?.project_id,
      project_status: 3,
      verifier_id: confirmedVerifier?.verifier_id,
      verifier_name: confirmedVerifier?.verifier_name,
      verifier_address: confirmedVerifier?.verifier_address,
      verifier_number: confirmedVerifier?.verifier_number,
    }
    verifierCalls
      .updateVerifier(payload)
      .then((res) => {
        if (res?.success) {
          alert('successfully confirmed Verifier')
          getVerifierByProject()
          createProjectContractCall(res?.data?.fileHash)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  const createProjectContractCall = async (fileHash: string) => {
    const { email, uuid } = getLocalItem('userDetails')
    try {
      const contractRes = await BlockchainCalls.contract_caller()
      await contractRes.estimateGas.createProject(uuid, fileHash)
      const createProjectRes = await contractRes.createProject(uuid, fileHash)
      const toPassParam = [wallet_address, email]
      await BlockchainCalls.requestMethodCalls('personal_sign', toPassParam)
      if (createProjectRes) {
        const updateTxPayload = {
          uuid: uuid,
          tx: {
            tx_id: createProjectRes?.hash,
            tx_data: createProjectRes,
          },
        }
        await dataCollectionCalls.updateTx(updateTxPayload)
      }
    } catch (e) {
      console.log('Error in contract_caller().createProject call ~ ', e)
    }
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
          <Grid item xs={12}>
            <Box
              sx={{
                flex: 'display',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                sx={{ fontSize: 16, fontWeight: 500, color: '#005046' }}
              >
                Reports Submitted
              </Typography>

              <CCButton
                variant="contained"
                sx={{
                  backgroundColor: '#F3BA4D',
                  textTransform: 'none',
                  width: '260px',
                  borderRadius: '100px',

                  padding: '10px 24px 10px 16px',
                }}
                startIcon={<AddIcon style={{ color: '#005046' }} />}
                onClick={() =>
                  navigate(pathNames.MONTHLY_REPORT_UPDATE, { replace: true })
                }
              >
                Add Monthly Data
              </CCButton>
            </Box>
            <CCTable headings={headings} rows={monthlyReportsList} />
          </Grid>
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
  'CO2c Sequestered',
  'Report Received',
  'comment Received',
  'Action',
]
