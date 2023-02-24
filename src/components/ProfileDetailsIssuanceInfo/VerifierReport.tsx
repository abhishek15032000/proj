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
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import { dataCollectionCalls } from '../../api/dataCollectionCalls'
import moment from 'moment'
import {
  addSectionPercentages,
  addSectionPercentagesMonthly,
} from '../../utils/newProject.utils'
import CCButtonOutlined from '../../atoms/CCButtonOutlined'
import { Colors } from '../../theme'
import AddIcon from '@mui/icons-material/Add'
import MonthlyReportUpdate, {
  setCurrentProjectDetails,
  setCurrentProjectDetailsUUID,
  setMainProjectDetails,
  setSectionIndex,
  setSubSectionIndex,
} from '../../redux/Slices/MonthlyReportUpdate'
import { useAppDispatch } from '../../hooks/reduxHooks'
import BlockchainCalls from '../../blockchain/Blockchain'
import { getLocalItem } from '../../utils/Storage'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import LoaderOverlay from '../../components/LoderOverlay'
import MessageModal from '../../atoms/MessageModal/MessageModal'
import { setViewCommentsData } from '../../redux/Slices/reportsViewCommentsSlice'
import DownloadIcon from '@mui/icons-material/Download'
import { downloadFile } from '../../utils/commonFunctions'
import { PROJECT_ALL_STATUS } from '../../config/constants.config'
import LimitedText from '../../atoms/LimitedText/LimitedText'

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
  const [showTable, setShowTable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [verifierLoading, setVerifierLoading] = useState<boolean>(false)
  const [monthlyReportsList, setMonthlyReportsList] = useState<any>([])
  const [mainProjectData, setMainProjectData] = useState<any>([])
  const [contractCallLoading, setContractCallLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  //Action =  updateVerifier api call + createProject contract call + updateTx api call
  const [showActionSuccessModal, setShowActionSuccessModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    getVerifierByProject()
    getAllProjects()
  }, [])

  const handleComments = (i: any) => {
    dispatch(setViewCommentsData(i))
    navigate(pathNames.REPORT_VIEW_COMMENTS)
  }
  const getAllProjects = () => {
    setLoading(true)

    dataCollectionCalls
      .getAllMonthlyData(props?.currentProjectUUID)
      .then((res: any) => {
        if (res?.success) {
          // if (res?.data?.record.length > 0) {

          //   setShowTable(true)
          // }
          const modifiedRows = res?.data?.record.map((i: any) =>
            addSectionPercentagesMonthly(i)
          )

          const mergeArray = modifiedRows.splice(0, 0, res?.data?.main_project)

          // const modifiedRows = res?.data?.record

          const rows =
            modifiedRows &&
            modifiedRows.map((i: any, index: number) => {
              return [
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500, textAlign: 'center' }}
                >
                  {i?.report?.createdAt
                    ? moment(i?.report?.createdAt).format(`DD/MM/YY`)
                    : '-'}
                </Typography>,
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500, textAlign: 'center' }}
                >
                  {i?.project_status ===
                  PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                    ? i?.report?.next_date
                      ? moment(i?.report?.next_date).format(`DD/MM/YY`)
                      : '-'
                    : '-'}
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
                  {/* <TextSnippetOutlinedIcon style={{ color: '#667080' }} /> */}
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#2B2B2B',
                    }}
                  >
                    {'Registration Report'}
                  </Typography>
                  <FileDownloadOutlinedIcon
                    sx={{ color: '#388E81', cursor: 'pointer' }}
                    onClick={() => {
                      if (!i.project_pdf) return
                      downloadFile(i?.project_pdf)
                    }}
                  />
                </Box>,
                'V1.0',
                // <Chip
                //   sx={{ backgroundColor: '#75F8E4' }}
                //   key="1"
                //   icon={
                //     <CircleNotifications
                //       fontSize="small"
                //       style={{ color: '#00A392' }}
                //     />
                //   }
                //   label={'-'}
                // />,
                i?.project_status ===
                PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                  ? 'Verified'
                  : 'In-Progress',
                <Typography
                  key={index}
                  textAlign="start"
                  sx={{ fontSize: 15, fontWeight: 500, textAlign: 'center' }}
                >
                  {i?.project_status ===
                  PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                    ? i?.report?.quantity
                    : '-'}
                </Typography>,
                i?.project_status ===
                PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT ? (
                  <DownloadIcon
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (!i?.report?.file_attach?.length) return
                      i?.report?.file_attach.forEach(
                        (file: any, index: number) => {
                          downloadFile(file)
                        }
                      )
                    }}
                    style={{ color: Colors.lightPrimary1 }}
                  />
                ) : (
                  '-'
                ),

                <Box onClick={() => handleComments(i)} key={index}>
                  <Typography
                    sx={{
                      color: '#006B5E',
                      fontSize: 16,
                      fontWeight: 600,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    View
                  </Typography>
                </Box>,
                i.project_status === PROJECT_ALL_STATUS.CREATED_PROJECT ? (
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
                    onClick={() => addMonthlyData(i, res?.data?.main_project)}
                  >
                    Resume
                  </CCButton>
                ) : (
                  '-'
                ),
              ]
            })

          setMainProjectData(res?.data?.main_project)
          if (res?.data?.main_project) {
            setMonthlyReportsList(rows)
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  const addMonthlyData = (item: any, main: any) => {
    dispatch(setCurrentProjectDetails(item))
    dispatch(setCurrentProjectDetailsUUID(item?.uuid))
    dispatch(setMainProjectDetails(main))
    dispatch(setSectionIndex(0))
    dispatch(setSubSectionIndex(0))

    navigate(pathNames.MONTHLY_REPORT_UPDATE)
  }

  const getVerifierByProject = (showModalAfterGetCall = false) => {
    setVerifierLoading(true)
    verifierCalls
      .getVerifierByProjectId(props?.currentProjectId)
      .then((res) => {
        if (res?.success) {
          const finalVerifierData = res?.data.filter((i: any) => {
            return (
              i?.report?.project_status ===
                PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT ||
              i?.report?.project_status ===
                PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY
            )
          })
          finalVerifierData && finalVerifierData?.length
            ? setVerifierReports(finalVerifierData)
            : setVerifierReports(res?.data)

          if (showModalAfterGetCall) {
            setShowActionSuccessModal(true)
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setVerifierLoading(false)
      })
  }

  const updateVerifier = (confirmedVerifier: any) => {
    const { shineKey = '' } = getLocalItem('userDetails2')

    // if (wallet_address !== shineKey) {
    //   setShowModal(true)
    //   return
    // }

    setVerifierLoading(true)
    const payload = {
      _id: confirmedVerifier?._id,
      project_id: confirmedVerifier?.project_id,
      project_status:
        PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
      verifier_id: confirmedVerifier?.verifier_id,
      verifier_name: confirmedVerifier?.verifier_name,
      verifier_address: confirmedVerifier?.verifier_address,
      verifier_number: confirmedVerifier?.verifier_number,
    }
    verifierCalls
      .updateVerifier(payload)
      .then((res) => {
        if (res?.success) {
          setVerifierLoading(false)
          setShowActionSuccessModal(true)
          // createProjectContractCall(res?.data?.fileHash)
        }
      })
      .catch((err) => {
        console.log(err)
        setVerifierLoading(false)
      })
  }

  // const createProjectContractCall = async (fileHash: string) => {
  //   const { email, uuid } = getLocalItem('userDetails')

  //   try {
  //     setContractCallLoading(true)
  //     const toPassParam = [wallet_address, email]
  //     // await BlockchainCalls.requestMethodCalls('personal_sign', toPassParam)
  //     const contractRes = await BlockchainCalls.contract_caller()
  //     await contractRes.estimateGas.createProject(uuid, fileHash)
  //     const createProjectRes = await contractRes.createProject(uuid, fileHash)
  //     if (createProjectRes) {
  //       const updateTxPayload = {
  //         uuid: uuid,
  //         tx: {
  //           tx_id: createProjectRes?.hash,
  //           tx_data: createProjectRes,
  //         },
  //       }
  //       const updateTxRes = await dataCollectionCalls.updateTx(updateTxPayload)
  //       if (updateTxRes.success) {
  //         getVerifierByProject(true)
  //         // setShowActionSuccessModal(true)
  //         //Setting  setLoading false over here to give user impression that updateVerifier api call and createNewProject contract call is a single call
  //         // setLoading(false)
  //       }
  //     }
  //   } catch (e) {
  //     console.log('Error in contract_caller().createProject call ~ ', e)
  //   } finally {
  //     setContractCallLoading(false)
  //   }
  // }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
            Verifiers Selected
          </Typography>
        </Grid>
        {/* {loading ? <LoaderOverlay /> : null} */}
        <Grid item xs={12}>
          {/* {loading || contractCallLoading ? ( */}
          {verifierLoading ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: 150 }}
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
          {mainProjectData?.project_status >=
            PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY &&
          monthlyReportsList &&
          monthlyReportsList.length > 0 ? (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                  Reports Submitted
                </Typography>

                <CCButton
                  variant="contained"
                  sx={{
                    backgroundColor: '#F3BA4D',
                    textTransform: 'none',
                    width: '150px',
                    borderRadius: '100px',

                    padding: '10px ',
                    fontSize: '12px',
                  }}
                  startIcon={<AddIcon style={{ color: '#005046' }} />}
                  onClick={() => addMonthlyData(null, mainProjectData)}
                >
                  Add Monthly Data
                </CCButton>
              </Grid>
              <CCTable headings={headings} rows={monthlyReportsList} />
            </>
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
      {/* <MessageModal
        message={
          'Please use the same Wallet address submitted at the start while completing the Profile!!!'
        }
        btn1Text="Ok"
        btn1OnClick={() => setShowModal(false)}
        showModal={showModal}
        setShowModal={setShowModal}
      /> */}
      <MessageModal
        message={
          'Successfully finalized Verifier and Project added in Blockchain!!!'
        }
        btn1Text="Ok"
        btn1OnClick={() => {
          getVerifierByProject()
          setShowActionSuccessModal(false)
        }}
        showModal={showActionSuccessModal}
        setShowModal={setShowActionSuccessModal}
      />
    </>
  )
}

export default VerifierReport
const headings = [
  'Submitted On',
  'Next Submission',
  'Report',
  'Version',
  'Status',
  'VCOT Authorised',
  'Report Received',
  'Comment Received',
  'Action',
]
