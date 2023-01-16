import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useLocation } from 'react-router'
import { registryCalls } from '../../api/registry.api'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import Spinner from '../../atoms/Spinner'
import TextButton from '../../atoms/TextButton/TextButton'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors, Images } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import EditTokensModal from './EditTokensModal'

const pdfLoading = false

const docs = [
  { name: 'Verifier’s Comments.pdf', size: '0.5 MB' },
  { name: 'Project Issuance Report.pdf', size: '0.5 MB' },
]
const images = [{ name: 'Photo.jpeg', size: '1.0 MB' }]

const RegistryReviewReport = () => {
  const location: any = useLocation()
  const registryProjectDetails = useAppSelector(
    ({ registry }) => registry.registryProjectDetails,
    shallowEqual
  )

  const [explain, setExplain] = useState<string>('')
  const [lifetimeVCOT, setLifetimeVCOT] = useState<number>(4234)
  const [monthlyVCOT, setMonthlyVCOT] = useState<number>(334)
  const [openModal, setOpenModal] = useState(false)
  const [reportData, setReportData] = useState<any>()
  const closeModal = () => setOpenModal(false)

  useEffect(() => {
    setReportData(location?.state?.projectReportDetails)
  }, [location])

  const sumbitReport = async () => {
    try {
      const registryId = getLocalItem('userDetails')?.user_id
      const payload = {
        _id: reportData?.report?._id,
        uuid: reportData?.report?.uuid,
        project_id: reportData?.report?.project_id,
        projectId: reportData?.report?.projectId,
        current_month: reportData?.report?.current_month,
        next_date: reportData?.report?.next_date,
        quantity: reportData?.report?.quantity,
        file_attach: reportData?.report?.file_attach,
        issuer_details: reportData?.report?.issuer_details?.user_id,
        verifier_details: reportData?.report?.verifier_details?.user_id,
        ghg_reduction_explanation:
          reportData?.report?.ghg_reduction_explanation,
        monthly_carbon_tokens: reportData?.report?.monthly_carbon_tokens || 1,
        lifetime_carbon_tokens: reportData?.report?.lifetime_carbon_tokens || 1,
        registry_id: registryId,
      }
      const res = await registryCalls.reportSumbit(payload)
      if (res?.statusCode === 200) {
        alert('Report submitted')
      } else alert('Something wrong in submitting the report')
      console.log('res: ', res)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <>
      <Grid container sx={{ background: '#DAE5E1' }} columnSpacing={2}>
        {/* {loading ? <LoaderOverlay /> : null} */}
        <Grid
          item
          // xs={12}
          md={6}
          // sx={{mr:2}}
        >
          <Paper sx={{ border: '0px solid' }}>
            <Box
              sx={{
                py: 2,
                pl: 3,
                pr: 1,
                display: 'flex',
              }}
            >
              <Typography
                sx={{ fontSize: 28, fontWeight: 400, color: Colors.tertiary }}
              >
                Review Report & Add Comments
              </Typography>

              <TextButton
                // onClick={() => setShowModal(true)}
                onClick={sumbitReport}
                sx={{ ml: 4, background: '#006B5E' }}
                title="Review & Mint Tokens"
              />
            </Box>

            <Divider />

            <Box sx={{ py: 2, pl: 3, pr: 1 }}>
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
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={Images.LifetimeVCOTIcon}
                      style={{ marginRight: '8px' }}
                    />
                    <Box sx={{ whiteSpace: 'nowrap' }}>
                      Lifetime Credit Value :{' '}
                    </Box>
                  </Box>
                  <Box>{reportData?.report?.lifetime_tokens || '-'}</Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Box>
                    <img
                      src={Images.MonthlyVCOTIcon}
                      style={{ marginRight: '8px' }}
                    />
                  </Box>
                  <Box sx={{ whiteSpace: 'nowrap' }}>
                    Monthly/ Quarterly VCOT Authorised :
                  </Box>
                  <Box>{reportData?.report?.monthly_tokens || '-'}</Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenModal((openModal) => !openModal)}
                >
                  <img src={Images.DashboardPencil} />
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 2, py: 2, pl: 3, pr: 1 }}>
              <Typography
                sx={{ color: '#4A635E', fontSize: 14, fontWeight: 500 }}
              >
                Other project details
              </Typography>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Box sx={{ fontSize: 14, fontWeight: 500 }}>
                    Date of report submission
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ fontSize: 14 }}>
                    {moment(reportData?.report?.createdAt).format('DD-MM-YYYY')}
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Box sx={{ fontSize: 14, fontWeight: 500 }}>
                    Next Submission Date
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ fontSize: 14 }}>
                    {moment(reportData?.report?.next_date).format('DD-MM-YYYY')}
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4}>
                  <Box sx={{ fontSize: 14, fontWeight: 500 }}>Report Name</Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ fontSize: 14 }}>Project Issuance Report</Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ py: 2, pl: 3, pr: 1 }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: '#4A635E' }}
              >
                Relevant Docs{' '}
              </Typography>
              <Box>
                {/*{docs?.map((doc: any, index: number) => (*/}
                {reportData?.report?.file_attach?.map(
                  (doc: any, index: number) => (
                    <FileDetails key={index} doc={doc} />
                  )
                )}
              </Box>
            </Box>

            <Box sx={{ py: 2, pl: 3, pr: 1 }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: '#4A635E' }}
              >
                Photos/Videos Added{' '}
              </Typography>
              <Box>
                {docs?.map((doc: any, index: number) => (
                  <FileDetails key={index} doc={doc} />
                ))}
              </Box>
            </Box>

            <Box sx={{ py: 2, pl: 3, pr: 1 }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: Colors.darkPrimary1,
                  // mt: 4,
                  // ml: 4,
                }}
              >
                Comment on the report with your feedback.
              </Typography>

              <CCMultilineTextArea
                label="Explain"
                //label = {reportData?.report?.ghg_reduction_explanation}
                placeholder="Explain it here"
                value={explain}
                onChange={(e) => setExplain(e.target.value)}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          // xs={12}
          md={6}
        >
          <Box
            sx={{
              height: 'auto',
              border: '0px solid',
              backgroundColor: '#DAE5E1',
              width: '20px',
            }}
          />
          <Paper sx={{ height: '120vh', flex: 1 }}>
            {/* {pdfLoading ? (
            <Box
              sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spinner />
            </Box>
          ) : (
            // pdfURL && <PDFViewer pdfUrl={pdfURL} />
            <PDFViewer pdfUrl={''} />
          )} */}
            pojhgxvsckccvcccns
          </Paper>
        </Grid>
      </Grid>
      <EditTokensModal
        showModal={openModal}
        setShowModal={setOpenModal}
        monthlyVCOT={monthlyVCOT}
        setMonthlyVCOT={setMonthlyVCOT}
        lifetimeVCOT={lifetimeVCOT}
        setLifetimeVCOT={setLifetimeVCOT}
        closeModal={closeModal}
      />
    </>
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
      <Box sx={{ fontSize: 12, color: '#191C1B' }}>
        <Box>{doc?.name}</Box>
        <Box>{doc?.size}</Box>
      </Box>
    </Box>
  )
}
