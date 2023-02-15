import { Grid, Typography, Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import { verifierCalls } from '../../../api/verifierCalls.api'
import { PROJECT_ALL_STATUS, TX_TYPE } from '../../../config/constants.config'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  setChoosenVerifiers,
  setProjectDeveloper,
  setReportPDF,
  setTxIDForTab,
  setVerifier,
} from '../../../redux/Slices/traceabilitySlice'
import { Images } from '../../../theme'
import { getLocalItem } from '../../../utils/Storage'
import TraceDetails from './TraceDetails'
import './TraceHistory.css'

interface WebAppTraceHistoryProps {
  projectId?: any
  theme?: string
}
const WebAppTraceHistory: FC<WebAppTraceHistoryProps> = (props) => {
  const dispatch:any = useAppDispatch()

  const projectDeveloper = useAppSelector(
    ({ traceability }) => traceability?.projectDeveloper,
    shallowEqual
  )
  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  const [traceTab, setTraceTab] = useState<any>(null)

  const traceTabData = [
    {
      key: 0,
      showFromStatus: PROJECT_ALL_STATUS.CREATED_PROJECT,
      value: `Project Developer ${projectDeveloper} created this project`,
      // txType used to get txID for a particular step from tx array
      txType: TX_TYPE.CREATE_PROJECT,
    },
    {
      key: 1,
      showFromStatus: PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED,
      value: `Project Developer ${projectDeveloper} Submitted For verification`,
      txType: TX_TYPE.CREATE_PROJECT,
    },
    {
      key: 2,
      showFromStatus: PROJECT_ALL_STATUS.POTENTIAL_VERIFIER_SELECTED,
      value: `Verifier ${verifier} received verification request`,
      txType: TX_TYPE.CREATE_PROJECT,
    },
    {
      key: 3,
      showFromStatus:
        PROJECT_ALL_STATUS.ISSUER_APPROVED_THE_VERIFIER_FOR_THE_PROJECT,
      value: `Verifier ${verifier} started verification process`,
      txType: TX_TYPE.CONFIRM_VERIFIER,
    },
    {
      key: 4,
      showFromStatus:
        PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
      value: `Verifier ${verifier} submitted its verification report on this project`,
      txType: TX_TYPE.VERIFIER_VERIFIES_REPORT,
    },
    {
      key: 5,
      showFromStatus:
        PROJECT_ALL_STATUS.VERIFIER_APPROVES_THE_PROJECT_AND_SENDS_IT_TO_REGISTRY,
      value: `Registry received the verification report for approve`,
    },
    {
      key: 6,
      showFromStatus:
        PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
      value: `Registry Approves the verification report`,
      txType: TX_TYPE.REGISTRY_VERIFIES_REPORT,
    },
    {
      key: 7,
      showFromStatus:
        PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
      value: `Project Developer ${projectDeveloper} get verification report`,
    },
    // {
    //   key: 8,
    //   showFromStatus:
    //     PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT,
    //   value: `Buyer buy VCOT By Project Developer`,
    // },
  ]
  const { projectId, theme = 'light' } = props
  const [loading, setLoading] = useState(false)
  const [traceOption, setTraceOption] = useState(0)
  const [traceAllData, setTraceAllData] = useState<any>([])
  const [traceTabList, setTraceTabList] = useState<any>([])
  const [tx,setTx] = useState<any>("")

  useEffect(() => {
    //setting dark or light theme based on roles
    const userType: any = getLocalItem('userDetails')?.type
    // if ([ROLES.REGISTRY, ROLES.VERIFIER].includes(userType)) {
    //   setTheme('')
    // } else setTheme('dark')
    // if (props?.theme) setTheme(props?.theme)
    // setTheme('dark')

    // setTraceTab(traceTabData)
    setTraceTabList(traceTabData)
  }, [])

  useEffect(() => {
    if (traceAllData.length || projectDeveloper || verifier) {
      const filterArray =
        traceTabData &&
        traceTabData.filter((item: any) => {
          return item?.showFromStatus <= traceAllData.project_status
        })
      setTraceTabList(filterArray)
    }
  }, [projectDeveloper, verifier, traceAllData])

  useEffect(() => {
    if (traceAllData) {
      const tabData = traceTabList[traceOption]
      const txTypeToSearch = tabData?.txType
      if (txTypeToSearch || txTypeToSearch === 0) {
        const txIDObj = traceAllData?.tx.find(
          (tx: any) => tx.type === txTypeToSearch
        )
        // dispatch(setTxIDForTab(txIDObj?.tx_id))
        setTx(txIDObj?.tx_id)
      } else {
        // dispatch(setTxIDForTab(''))
        setTx('')
      }
    }
  }, [traceOption, traceAllData])

  useEffect(() => {
    if (projectId) getAllDetails()
  }, [projectId])

  const getAllDetails = () => {
    setLoading(true)
    dataCollectionCalls
      .getProjectById(projectId)
      .then((res) => {
        dispatch(setProjectDeveloper(res?.data?.name))
        dispatch(setReportPDF(res?.data?.project_pdf))
        getAllVerifiersForProject(res?.data?._id)
        getSelectedVerifierDetails(res?.data?.verifier_details_id)
        setTraceAllData(res?.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }

  const getSelectedVerifierDetails = async (id: string) => {
    if (!id) return
    try {
      const verifierRes: any = await verifierCalls.getVerifierById(id)
      if (verifierRes?.success) {
        dispatch(setVerifier(verifierRes?.data?.verifier_name))
      }
    } catch (err) {
      console.log('Error in  verifierCalls.getVerifierById api ~ ', err)
    }
  }
  const getAllVerifiersForProject = async (id: string) => {
    if (!id) return
    try {
      const verifierRes: any = await verifierCalls.getVerifierByProjectId(id)
      if (
        verifierRes?.success &&
        verifierRes?.data &&
        verifierRes?.data.length
      ) {
        const data = verifierRes?.data.map(
          (item: any, index: number) =>
            `${index ? ' ' : ''}${item?.verifier_name}`
        )
        dispatch(setChoosenVerifiers(data))
      }
    } catch (err) {
      console.log('Error in  verifierCalls.getVerifierById api ~ ', err)
    }
  }

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection="row"
      sx={{
        mt: 3,
        background:
          theme === 'dark'
            ? // ? 'linear-gradient(180deg, #111E17 9.55%, rgba(7, 19, 13, 0.79) 100%)'
              ''
            : // : '#FFFFFF',
              '',
      }}
      height={'30%'}
    >
      <Grid container columnSpacing={2}>
        <Grid
          xs={4}
          item
          display={'flex'}
          justifyContent={'start'}
          alignItems={'center'}
          flexDirection="column"
          height={'520px'}
          overflow="auto"
          className="scroll-container"
        >
          {traceTabList &&
            traceTabList.length > 0 &&
            traceTabList.map((item: any, index: any) => (
              <Grid
                container
                display={'flex'}
                justifyContent={'start'}
                alignItems={'center'}
                flexDirection="row"
                sx={{ mt: index !== 0 ? 3 : 0 }}
                key={index}
              >
                <Grid
                  item
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexDirection="column"
                  display={'flex'}
                  width={'10%'}
                  height={'100%'}
                >
                  <div
                    style={{
                      height: '100%',
                      position: 'relative',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        height: '20px',
                        width: '20px',
                        borderRadius: '20px',
                        border:
                          traceOption === index
                            ? '1px solid #CCE8E1'
                            : '1px solid #006B5E',
                        backgroundColor: '#006B5E',
                        marginLeft: '-10px',
                      }}
                      
                      className="traceability-trace-circle"
                    ></Box>
                    <div
                      style={{
                        borderLeft:
                          traceTabList.length !== index + 1
                            ? theme === 'dark'
                              ? // ? '4px solid linear-gradient(179.98deg, #B1CCC6 -46.26%, #2ECBB2 154.81%)'
                                '4px solid #2ECBB2'
                              : '4px solid #CCE8E1'
                            : '',
                        position: 'absolute',
                        height: '170%',
                        top: 0,
                        left: '11%',
                        transform: 'translateX(-50%)',
                      }}
                    ></div>
                    <div
                      style={{
                        position: 'absolute',
                        height: '50%',
                        width: '100%',
                        background:
                          index === 0
                            ? theme === 'dark'
                              ? '#1b2621'
                              : '#F6F9F7'
                            : index === traceTabList.length
                            ? theme === 'dark'
                              ? '#3e4d49'
                              : '#F6F9F7'
                            : '',
                        left: 0,
                        top: index === 0 ? 0 : 'auto',
                        bottom: traceTabList.length === index + 1 ? 0 : 'auto',
                        zIndex: 1,
                      }}
                    ></div>
                  </div>
                </Grid>
                <Grid
                  item
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection="row"
                  width={'85%'}
                  sx={{
                    py: 2,
                    px: 1,
                    background:
                      theme === 'dark'
                        ? '#006B5E'
                        : traceOption === index
                        ? ' #CCE8E1'
                        : '#FAFDFA',
                    borderRadius: '8px',
                    heigth: '100px',
                    // mt: -8,
                    color: traceOption === index ? '#3F4946' : '',
                    borderLeft:
                      theme === 'dark'
                        ? traceOption === index
                          ? '10px solid #CCE8E1'
                          : '10px solid #006B5E'
                        : traceOption === index
                        ? '10px solid #55DBC8'
                        : '10px solid transparent',
                    boxShadow: '0px 2px 8px rgba(45, 95, 87, 0.2)',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    zIndex: '20',
                  }}
                  onClick={() => setTraceOption(index)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                    }}
                  >
                    <Box sx={{ mt: '4px' }}>
                      <img
                        data-testid="logo-img"
                        className="logoImage"
                        src={theme === 'dark' ? Images.user : Images.UserDark}
                        color={theme === 'dark' ? 'White' : '#3F4946'}
                        style={{ width: '20px' }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color:
                          theme === 'dark'
                            ? 'white'
                            : traceOption === index
                            ? '#3F4946'
                            : '#191C1B',
                        fontSize: 14,
                        fontWeight: 400,
                        ml: 1,
                      }}
                    >
                      {item?.value}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ mr: 4 }}>
            <TraceDetails
              traceOption={traceOption}
              setTraceOption={(item: any) => setTraceOption(item)}
              theme={theme}
              projectId={projectId}
              projectDetails={traceAllData}
              traceTab={traceTab}
              txID={tx}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default WebAppTraceHistory
