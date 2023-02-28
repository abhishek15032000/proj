import { Grid, Typography, Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { dataCollectionCalls } from '../../../api/dataCollectionCalls'
import { TraceabilityCalls } from '../../../api/traceabilityCalls.api'
import { verifierCalls } from '../../../api/verifierCalls.api'
import Spinner from '../../../atoms/Spinner'
import {
  PROJECT_ALL_STATUS,
  TRACEABILITY_TAB_NAMES,
  TX_TYPE,
} from '../../../config/constants.config'
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
  const dispatch: any = useAppDispatch()

  const projectDeveloper = useAppSelector(
    ({ traceability }) => traceability?.projectDeveloper,
    shallowEqual
  )
  const verifier = useAppSelector(
    ({ traceability }) => traceability?.verifier,
    shallowEqual
  )

  // const [traceTab, setTraceTab] = useState<any>(null)

  const { projectId, theme = 'light' } = props
  const [loading, setLoading] = useState(false)
  const [traceOption, setTraceOption] = useState(0)
  const [traceAllData, setTraceAllData] = useState<any>([])
  const [traceTabList, setTraceTabList] = useState<any>([])
  const [projectName, setProjectName] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [projectRefID, setProjectRefID] = useState('')

  useEffect(() => {
    getTraceabilityData()
  }, [])

  const getTraceabilityData = async () => {
    try {
      setLoading(true)
      const traceRes = await TraceabilityCalls.getProjectDetailsById(projectId)
      console.log('traceRes', traceRes)
      if (traceRes?.success) {
        const temp = traceRes.data.map((traceData: any) => traceData?.type)
        setTraceTabList(temp)

        const projectData = traceRes.data[0]?.data
        setProjectName(projectData?.company_name)
        setProjectLocation(projectData?.location)
        setProjectRefID(projectData?.uuid)

        setTraceAllData(traceRes.data)
      }
    } catch (err) {
      console.log(
        'Error in TraceabilityCalls.getProjectDetailsById api ~ ',
        err
      )
    } finally {
      setLoading(false)
    }
  }

  const getTabName = (tabType: string) => {
    const tab: any = Object.values(TRACEABILITY_TAB_NAMES).find(
      (tab: any) => tab?.type === tabType
    )
    if (tab) {
      return tab.tabName
    } else {
      return '--'
    }
  }

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
      }}
    >
      <Spinner />
    </Box>
  ) : (
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
                sx={{ mt: index !== 0 ? 3 : 0, pb: 1, pt: '2px' }}
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
                  sx={{ paddingRight: '21px' }}
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
                        // marginLeft: '-10px',
                      }}
                      className="traceability-trace-circle"
                    ></Box>
                    <div
                      style={{
                        // borderLeft:
                        //   traceTabList.length !== index + 1
                        //     ? theme === 'dark'
                        //       ? // ? '4px solid linear-gradient(179.98deg, #B1CCC6 -46.26%, #2ECBB2 154.81%)'
                        //         '1px solid #2ECBB2'
                        //       : '1px solid #CCE8E1'
                        //     : '',
                        background:
                          traceTabList.length !== index + 1
                            ? 'linear-gradient(179.98deg, #B1CCC6 -46.26%, #2ECBB2 154.81%)'
                            : '',
                        width: '1px',
                        position: 'absolute',
                        height: '170%',
                        top: 0,
                        left: '50%',
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
                      {/* {item?.value} */}
                      {/* {TRACEABILITY_TAB_NAMES[item]} */}
                      {getTabName(item)}
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
              projectDetails={traceAllData}
              tabData={traceAllData[traceOption]}
              projectName={projectName}
              projectLocation={projectLocation}
              projectRefID={projectRefID}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default WebAppTraceHistory
