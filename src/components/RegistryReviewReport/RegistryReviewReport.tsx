import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { registryCalls } from '../../api/registry.api'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import TextButton from '../../atoms/TextButton/TextButton'
import { useAppSelector } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import EditTokensModal from './EditTokensModal'
import LoderOverlay from '../LoderOverlay'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import CCButton from '../../atoms/CCButton'
import { ArrowOutward } from '@mui/icons-material'
import CCFileViewer from '../../atoms/CCFileViewer/CCFileViewer'
declare let window: any

const pdfLoading = false

const docs = [
  { name: 'Verifier’s Comments.pdf', size: '0.5 MB' },
  { name: 'Project Issuance Report.pdf', size: '0.5 MB' },
]
const images = [{ name: 'Photo.jpeg', size: '1.0 MB' }]

const RegistryReviewReport = () => {
  const navigate = useNavigate()
  const location: any = useLocation()
  const { jwtToken } = getLocalItem('userDetails')

  const registryProjectDetails = useAppSelector(
    ({ registry }) => registry.registryProjectDetails,
    shallowEqual
  )

  const [explain, setExplain] = useState<string>('')
  const [lifetimeVCOT, setLifetimeVCOT] = useState<number>(0)
  const [monthlyVCOT, setMonthlyVCOT] = useState<number>(0)
  const [openModal, setOpenModal] = useState(false)
  const [reportData, setReportData] = useState<any>()
  const [pdfLoading, setPDFLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pdfURL, setpdfURL] = useState<null | string>(null)

  const [height, setHeight] = useState(0)
  const [height2, setHeight2] = useState(0)

  // const ref: any = useRef(null)
  // const ref2: any = useRef(null)

  // useEffect(() => {
  //   // if (ref.current && ref.current.clientHeight) {
  //   setHeight(ref.current.clientHeight)
  //   setHeight2(ref.current.clientHeight)
  //   // }
  // })

  const closeModal = () => setOpenModal(false)

  useEffect(() => {
    setReportData(location?.state?.projectReportDetails)
    console.log(
      'ran',
      location?.state?.projectReportDetails?.report?.lifetime_carbon_tokens
    )
    setLifetimeVCOT(
      location?.state?.projectReportDetails?.report?.lifetime_carbon_tokens
    )
    setMonthlyVCOT(
      location?.state?.projectReportDetails?.report?.monthly_carbon_tokens
    )
  }, [location])

  useEffect(() => {
    getPDF()
  }, [])

  const getPDF = async () => {
    if (
      location &&
      location?.state &&
      location.state?.projectReportDetails?.project_pdf
    ) {
      setPDFLoading(true)
      try {
        const res = await fileUploadCalls.getFile(
          location.state?.projectReportDetails?.project_pdf,
          jwtToken
        )

        const pdfObjectURL = URL.createObjectURL(res)

        setpdfURL(pdfObjectURL)
      } catch (err) {
        console.log('Error in fileUploadCalls.getFile api : ', err)
      } finally {
        setPDFLoading(false)
      }
    }
  }
  const sumbitReport = async () => {
    try {
      setLoading(true)
      const registryId = getLocalItem('userDetails')?.user_id
      const payload = {
        _id: reportData?.report?._id,
        uuid: reportData?.report?.uuid,
        project_id: reportData?._id,
        projectId: reportData?.report?.projectId,
        current_month: reportData?.report?.current_month,
        next_date: reportData?.report?.next_date,
        // quantity: reportData?.report?.quantity,
        quantity: monthlyVCOT,
        file_attach: reportData?.report?.file_attach,
        issuer_details: reportData?.report?.issuer_details?.user_id,
        verifier_details: reportData?.report?.verifier_details?.user_id,
        ghg_reduction_explanation:
          reportData?.report?.ghg_reduction_explanation,
        monthly_carbon_tokens: monthlyVCOT,
        lifetime_carbon_tokens: reportData?.report?.lifetime_carbon_tokens || 1,
        registry_id: registryId,
      }
      const res = await registryCalls.reportSumbit(payload)
      if (res?.success) {
        alert('Report submitted')
        navigate(pathNames.DASHBOARD)
      } else alert('Something wrong in submitting the file')
      console.log('res: ', res)
    } catch (err) {
      console.log('Error in registryCalls.reportSumbit ~ ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          pt: 1,
        }}
      >
        <Box
          sx={{
            py: 2,
            fontSize: 12,
            color: '#4A635E',
            display: 'flex',
            gap: '5px',
          }}
        >
          <Box
            onClick={() => navigate(pathNames.DASHBOARD)}
            sx={{ cursor: 'pointer' }}
          >
            Project List
          </Box>
          <Box>{'>'}</Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC, {
                state: {
                  projectDetails: location?.state?.projectReportDetails,
                },
              })
            }}
          >
            Project Details
          </Box>
          <Box>{'>'}</Box>
          <Box sx={{ fontSize: 12, color: '#000000' }}>Review </Box>
        </Box>
        {/* <Box sx={{ ml: 4, py: 2, display: 'flex' }}>
          <Box sx={{ fontSize: 12, color: '#4A635E' }}>
            {'Project List > Project Details'}{' '}
          </Box>
          <Box sx={{ fontSize: 12, color: '#000000' }}>
            {' > Review Report'}{' '}
          </Box>
        </Box> */}
        <Box>
          <CCButton
            onClick={sumbitReport}
            buttonBackgroundColor={'#006B5E'}
            buttonColor="white"
            sx={{
              px: 3,
              py: 1,
              borderRadius: '40px',
              color: 'white',
              fontSize: 14,
            }}
          >
            Review & Mint Tokens
          </CCButton>
          {/* <TextButton
            // onClick={() => setShowModal(true)}
            onClick={sumbitReport}
            sx={{ ml: 4, background: '#006B5E', width: '260px' }}
            title="Review & Mint Tokens"
          /> */}
        </Box>
      </Box>
      <Box sx={{ flexGrow: '1', overflow: 'hidden' }}>
        <Grid
          container
          sx={{
            background: '#FAFDFA',
            height: '100%',
            // alignItems: 'stretch',
            overflow: 'hidden',
            pb: 2,
            px: 4,
            // pt: 1,
          }}
          columnSpacing={3}
        >
          {loading ? <LoderOverlay /> : null}

          <Grid
            item
            md={7}
            flexDirection="column"
            sx={{
              display: 'flex',
              width: '100%',
              height: `100%`,
              py: 1,

              // backgroundColor: Colors.white,
            }}
          >
            <Paper
              sx={{
                height: '100%',
                boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
                // flex: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <BackHeader
                  title="Project Issuance Report V1.1 (PDF)"
                  onClick={() =>
                    navigate(pathNames.PROJECT_DETAILS_REGISTRY_ACC, {
                      state: {
                        projectDetails: location?.state?.projectReportDetails,
                      },
                    })
                  }
                  titleSx={{
                    fontSize: 28,
                    fontWeight: 500,
                    color: Colors.tertiary,
                    pl: 1,
                  }}
                  sx={{ pl: 2, pr: 1, py: 2 }}
                />
                <Box
                  sx={{
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.open().location.href = pdfURL
                  }}
                >
                  <ArrowOutward sx={{ color: '#006B5E', width: '20px' }} />
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#006B5E',
                      paddingLeft: '3px',
                    }}
                  >
                    Open
                  </Typography>
                </Box>
              </Box>

              {/* <Divider /> */}

              {pdfURL ? (
                <Box sx={{ height: '86%', px: 4 }}>
                  <PDFViewer pdfUrl={pdfURL} />
                </Box>
              ) : null}
            </Paper>
          </Grid>
          <Grid
            item
            md={5}
            sx={{
              display: 'flex',
              height: `100%`,
              overflowY: 'auto',
              alignItems: 'stretch',

              py: 1,
            }}
          >
            <Paper
              sx={{
                width: '100%',
                height: `100%`,
                overflowY: 'hidden',
                boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <Box
                sx={{
                  py: 2,
                  pl: 3,
                  pr: 1,
                  display: 'flex',
                  // height: `100%`
                }}
              > */}
              <Box>
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 28,
                    fontWeight: 500,
                    color: Colors.tertiary,
                    px: 2,
                    py: 1,
                  }}
                >
                  Review Report & Add Comments
                </Typography>
                {/* <BackHeader
                  title="Review Report & Add Comments"
                  onClick={() => navigate(-1)}
                  titleSx={{ fontSize: 26 }}
                  iconDisable
                /> */}
                {/* </Box> */}

                <Divider />
              </Box>
              <Box sx={{ flexGrow: '1', overflow: 'auto' }}>
                <Box sx={{ pt: 4, pl: 3, pr: 1 }}>
                  <Box
                    sx={{
                      background: '#E5F2FF',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      width: 'fit-content',
                      borderRadius: '8px',
                      fontSize: '14px',
                      flexWrap: 'wrap',
                      fontWeight: '500',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        mr: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',

                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <Box sx={{ width: '18px', height: '18px' }}>
                          <img
                            src={Images.LifetimeVCOTIcon}
                            style={{
                              marginRight: '8px',
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        </Box>
                        <Box sx={{ whiteSpace: 'nowrap', color: '#4A635E' }}>
                          Lifetime Credit Value
                        </Box>
                      </Box>
                      <Box sx={{ color: '#006B5E' }}>{lifetimeVCOT || '-'}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          mr: 2,
                          mt: 1,
                        }}
                      >
                        <Box sx={{ width: '18px', height: '18px' }}>
                          <img
                            src={Images.MonthlyVCOTIcon}
                            style={{
                              marginRight: '8px',
                              width: '100%',
                              height: '100&',
                              objectFit: 'contain',
                            }}
                          />
                        </Box>
                        <Box sx={{ whiteSpace: 'nowrap', color: '#4A635E' }}>
                          {/* Monthly/ Quarterly VCOT Authorised&nbsp; */}
                          VCOT Authorised for the month
                        </Box>
                        <Box sx={{ color: '#006B5E' }}>
                          {monthlyVCOT || '-'}
                        </Box>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            setOpenModal((openModal) => !openModal)
                          }
                        >
                          <img src={Images.DashboardPencil} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: 1, py: 2, pl: 3, pr: 1 }}>
                  <Typography
                    sx={{ color: '#1D4B44', fontSize: 16, fontWeight: 500 }}
                  >
                    Other project details
                  </Typography>

                  <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          color: '#006B5E',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        Date of report submission
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Box sx={{ fontSize: '14px', color: 'black', pl: 1 }}>
                        {moment(reportData?.report?.createdAt).format(
                          'DD/MM/YYYY'
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ marginTop: '11px' }}>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#006B5E',
                          fontWeight: 500,
                        }}
                      >
                        Next Submission Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Box sx={{ fontSize: '14px', color: 'black', pl: 1 }}>
                        {moment(reportData?.report?.next_date).format(
                          'DD/MM/YYYY'
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ marginTop: '11px' }}>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          color: '#006B5E',
                          fontWeight: 500,
                          fontSize: '14px',
                        }}
                      >
                        Report Name
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Box sx={{ fontSize: '14px', color: 'black', pl: 1 }}>
                        Project Issuance Report
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ pb: 2, pl: 3, pr: 1 }}>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 500, color: '#1D4B44' }}
                  >
                    Relevant Docs{' '}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
                  >
                    {reportData?.report?.file_attach &&
                    reportData?.report?.file_attach.length
                      ? reportData?.report?.file_attach?.map(
                          (doc: any, index: number) => (
                            <CCFileViewer
                              key={index}
                              title={doc}
                              index={index}
                              // deleteImage={deleteImage}
                              fileSize={0}
                            />

                            // <FileDetails key={index} doc={doc} />
                          )
                        )
                      : '-'}
                  </Box>
                </Box>
                {/* 
                <Box sx={{ py: 2, pl: 3, pr: 1 }}>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 500, color: '#1D4B44' }}
                  >
                    Photos/Videos Added{' '}
                  </Typography>
                  <Box>
                    {docs?.map((doc: any, index: number) => (
                  <FileDetails key={index} doc={doc} />
                ))}
                    -
                  </Box>
                </Box> */}

                <Box sx={{ py: 2, pl: 3, pr: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#1D4B44',
                      // mt: 4,
                      // ml: 4,
                      mb: 2,
                    }}
                  >
                    Comment on the report with your feedback.
                  </Typography>

                  <CCMultilineTextArea
                    label="Comment"
                    //label = {reportData?.report?.ghg_reduction_explanation}
                    placeholder="Explain it here"
                    value={explain}
                    onChange={(e) => setExplain(e.target.value)}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <EditTokensModal
        showModal={openModal}
        setShowModal={setOpenModal}
        monthlyVCOT={monthlyVCOT}
        setMonthlyVCOT={setMonthlyVCOT}
        lifetimeVCOT={lifetimeVCOT}
        setLifetimeVCOT={setLifetimeVCOT}
        closeModal={closeModal}
      />
    </Box>
  )
}

export default RegistryReviewReport

interface FileDetailsProps {
  doc: any
}
const FileDetails: FC<FileDetailsProps> = ({ doc }) => {
  return (
    <Box
      sx={{
        background: '#DAF7F0',
        mt: 1,
        display: 'flex',
        borderRadius: '8px',
        padding: '4px 8px',
      }}
    >
      <Box sx={{ mr: 1 }}>
        <InsertDriveFileOutlinedIcon
          sx={{
            color: Colors.lightPrimary1,
            background: '#DAF7F0',
            height: '100%',
          }}
        />
      </Box>
      <Box
        sx={{
          fontSize: 12,
          color: '#191C1B',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box>{doc}</Box>
        {/* <Box>{doc?.size}</Box> */}
      </Box>
    </Box>
  )
}
