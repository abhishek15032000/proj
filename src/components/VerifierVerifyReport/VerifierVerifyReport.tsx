// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Divider, Paper } from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

// Local Imports
import { VerifierVerifyReportProps } from './VerifierVerifyReport.interface'
import { Colors } from '../../theme'
import BackHeader from '../../atoms/BackHeader/BackHeader'
import TextButton from '../../atoms/TextButton/TextButton'
import CCMultilineTextArea from '../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import { DatePicker } from '@mui/x-date-pickers'
import CCInputField from '../../atoms/CCInputField'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import moment from 'moment'
import {
  deleteIndexInArray,
  stringExtractor,
} from '../../utils/commonFunctions'
import { useLocation, useNavigate } from 'react-router-dom'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { getLocalItem } from '../../utils/Storage'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { verifierCalls } from '../../api/verifierCalls.api'
import BlockchainCalls from '../../blockchain/Blockchain'
import LoaderOverlay from '../../components/LoderOverlay'
import Spinner from '../../atoms/Spinner'
import { USER } from '../../api/user.api'
import { pathNames } from '../../routes/pathNames'
import MessageModal from '../../atoms/MessageModal/MessageModal'

const VerifierVerifyReport = (props: VerifierVerifyReportProps) => {
  const navigate = useNavigate()
  const location: any = useLocation()

  const {
    state: { project },
  } = location

  const { jwtToken } = getLocalItem('userDetails')

  const accountAddress = useAppSelector(
    ({ wallet }) => wallet.accountAddress,
    shallowEqual
  )
  const isConnected = useAppSelector(
    ({ wallet }) => wallet.isConnected,
    shallowEqual
  )

  const [explain, setExplain] = useState('')
  const [quantity, setQuantity] = useState<null | number>(null)
  const [selectMonth, setSelectMonth] = useState(new Date())
  const [nextSubmissionDate, setNextSubmissionDate] = useState(new Date())
  const [relevantDocs, setRelevantDocs]: any = useState([])
  const [nonce, setNonce] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pdfLoading, setPDFLoading] = useState(false)
  const [pdfURL, setpdfURL] = useState<null | string>(null)
  const [issuerShineKey, setIssuerShineKey] = useState('')
  const [showModal, setShowModal] = useState(false)
  //Action = getSignatureHash api call + verifyPDF call
  const [showActionSuccessModal, setShowActionSuccessModal] = useState(false)
  const [showAddressNotMatchingModal, setShowAddressNotMatchingModal] =
    useState(false)

  useEffect(() => {
    getPDF()
    getIssuerShineKey()
  }, [])

  const getPDF = async () => {
    if (location && location?.state && location.state?.pdf) {
      const {
        state: { pdf },
      } = location
      setPDFLoading(true)
      try {
        const res = await fileUploadCalls.getFile(pdf, jwtToken)
        const pdfObjectURL = URL.createObjectURL(res)
        setpdfURL(pdfObjectURL)
      } catch (err) {
        console.log('Error in fileUploadCalls.getFile api : ', err)
      } finally {
        setPDFLoading(false)
      }
    }
  }

  const getIssuerShineKey = async () => {
    try {
      const userResponse = await USER.getUsersById(project?.user_id)
      if (userResponse) {
        setIssuerShineKey(userResponse?.data.shineKey)
      } else {
        alert("Couldn't get issuer shine key. Please try again!!!")
      }
    } catch (err) {
      console.log('Error in USER.getUsersById api : ', err)
    }
  }

  const incrementNonce = () => {
    setNonce((nonce) => nonce + 1)
  }

  const signAndVerify = async () => {
    const { shineKey = '' } = getLocalItem('userDetails2')

    if (!isConnected) {
      alert('Please connect Wallet before continuing!!!')
      return
    }
    if (!issuerShineKey) {
      alert("Couldn't get issuer shine key. Please try again!!!")
      return
    }
    if (
      !accountAddress ||
      !shineKey ||
      accountAddress?.toLowerCase() !== shineKey?.toLowerCase()
    ) {
      setShowAddressNotMatchingModal(true)
      return
    }
    if (nextSubmissionDate && selectMonth && quantity) {
      setLoading(true)
      getSignatureHash()
    } else {
      alert('Please enter all fields!!!')
      return
    }
  }

  const getSignatureHash = async () => {
    const signatureHashPayload = {
      recipient: issuerShineKey,
      _amount: Number(quantity),
      _project_data: JSON.stringify({ projectId: project?.uuid }),
      _nonce: nonce,
    }
    try {
      const signatureHashRes = await verifierCalls.getPDFHash(
        signatureHashPayload
      )
      if (signatureHashRes?.data?.success && signatureHashRes?.data?.data) {
        const toPassParam = [accountAddress, signatureHashRes?.data?.data?.data]
        const personalSignRes = await BlockchainCalls.requestMethodCalls(
          'personal_sign',
          toPassParam
        )
        if (personalSignRes) {
          verifyPDF(personalSignRes)
        } else {
          alert("Couldn't sign successfully. Please try again!!!")
          return
        }
      }
    } catch (err) {
      console.log('Error in verifierCalls.getPDFHash api :', err)
      setLoading(false)
      alert('Error in verifierCalls.getPDFHash api')
    }
  }

  const verifyPDF = async (signatureHash: string) => {
    const {
      state: { project },
    } = location

    const verifyPDFAndMintTokenpayload = {
      project_id: project?.uuid,
      current_month: selectMonth,
      next_date: nextSubmissionDate,
      quantity: Number(quantity),
      ghg_reduction_explanation: explain,
      signature_hash: signatureHash,
      signer: accountAddress,
      file_attach: stringExtractor(relevantDocs, 'fileName'),
      nonce: nonce,
    }
    try {
      const verifyPDFAndMintTokenRes =
        await verifierCalls.verifyPDFAndMintToken(verifyPDFAndMintTokenpayload)
      if (verifyPDFAndMintTokenRes?.data.success) {
        //If verifer wants to make some more /report/submit (blockchain) calls then different nonce needs to be passed to indicate different transaction
        incrementNonce()
        if (verifyPDFAndMintTokenRes?.data?.data.success) {
          setShowActionSuccessModal(true)
        } else {
          alert(verifyPDFAndMintTokenRes?.data?.data.error)
        }
      }
    } catch (err) {
      console.log('Error in verifierCalls.getPDFHash api :', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: Colors.background,
      }}
    >
      {loading ? <LoaderOverlay /> : null}
      <Grid container>
        <Grid item xs={12}>
          <BackHeader
            title="Back"
            sx={{ ml: 4, mt: 3, mb: 2, cursor: 'pointer' }}
            titleSx={{ fontSize: 14 }}
            onClick={() => {
              navigate(-1)
            }}
          />
        </Grid>

        <Paper sx={{ border: '0px solid', flex: 1 }}>
          <Box
            sx={{
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: 400, color: Colors.tertiary }}
            >
              Verify & Submit Conclusive Report
            </Typography>

            <TextButton
              onClick={() => setShowModal(true)}
              sx={{ ml: 4 }}
              title="Sign & Mark Verified"
            />
          </Box>

          <Divider />

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              mt: 4,
              ml: 4,
            }}
          >
            How much GHG reduction can occur from this project?
          </Typography>

          <CCMultilineTextArea
            sx={{ m: 3, ml: 4, width: '90%' }}
            label="Explain"
            placeholder="Explain it here"
            value={explain}
            onChange={(e) => setExplain(e.target.value)}
          />

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              ml: 4,
            }}
          >
            How much quantity of CO2e can be authorised for the current month?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Box sx={{ width: '42%', ml: 4 }}>
              <DatePicker
                label="Select Month"
                views={['month']}
                inputFormat="MMMM"
                value={selectMonth}
                components={{
                  OpenPickerIcon: CalendarMonthOutlinedIcon,
                }}
                // renderInput={(pa)}
                renderInput={(params) => (
                  <CCInputField
                    {...params}
                    style={{ backgroundColor: 'white' }}
                  />
                )}
                // onChange={(e) => undefined}
                onChange={(e) => {
                  if (e !== null) {
                    setSelectMonth(e)
                  }
                }}
              />
            </Box>

            <Box sx={{ width: '43%', ml: 4 }}>
              <CCInputField
                label="Enter Quantity of CO2e"
                variant="outlined"
                // sx={{ mt: 1 }}
                value={quantity}
                onChange={(e) => {
                  const regexp = /^\d+(\.\d{0,3})?$/
                  if (
                    regexp.test(e?.target?.value) ||
                    e?.target?.value === ''
                  ) {
                    setQuantity(e?.target?.value)
                  }
                }}
              />
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: Colors.darkPrimary1,
              ml: 4,
              mt: 3,
              mb: 2,
            }}
          >
            Please enter next monthly report submission date for issuer
          </Typography>

          <Box sx={{ width: '90%', ml: 4 }}>
            <DatePicker
              label="Next submission date"
              // views={['month']}
              value={nextSubmissionDate}
              components={{
                OpenPickerIcon: CalendarMonthOutlinedIcon,
              }}
              // renderInput={(pa)}
              renderInput={(params) => {
                return (
                  <CCInputField
                    {...params}
                    style={{ backgroundColor: 'white' }}
                  />
                )
              }}
              onChange={(e) => {
                if (e !== null) {
                  setNextSubmissionDate(e)
                }
              }}
            />
          </Box>
          <CCDropAndUpload
            sx={{ m: 4, mr: 5 }}
            mediaTitle={[]}
            title="Attach relevant docs"
            mediaItem={[]}
            imageArray={relevantDocs}
            onImageUpload={(item: any) => {
              setRelevantDocs([item, ...relevantDocs])
            }}
            onDeleteImage={(index: number) => {
              setRelevantDocs(deleteIndexInArray(relevantDocs, index))
            }}
          />
        </Paper>

        <Box
          sx={{
            height: 'auto',
            border: '0px solid',
            backgroundColor: '#DAE5E1',
            width: '20px',
          }}
        />
        <Paper sx={{ height: '120vh', flex: 1 }}>
          {pdfLoading ? (
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
            pdfURL && <PDFViewer pdfUrl={pdfURL} />
          )}
        </Paper>
      </Grid>
      <MessageModal
        message={
          <Typography sx={{ fontSize: 20, fontWeight: 500, pb: 2 }}>
            Next step involves making calls with Blockchain. Do you want to
            continue with{' '}
            <span style={{ color: Colors.lightPrimary1, fontSize: 18 }}>
              {accountAddress}
            </span>{' '}
            wallet address?
          </Typography>
        }
        btn1Text="Continue"
        btn1OnClick={() => {
          console.log('show modal onlcick')
          setShowModal(false)
          signAndVerify()
        }}
        btn2OnClick={() => setShowModal(false)}
        btn2Text="Cancel"
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <MessageModal
        message={
          'Please use the same Wallet address submitted at the start while completing the Profile!!!'
        }
        btn1Text="Ok"
        btn1OnClick={() => setShowAddressNotMatchingModal(false)}
        showModal={showAddressNotMatchingModal}
        setShowModal={setShowAddressNotMatchingModal}
      />
      <MessageModal
        message={'PDF Verified and Token Minted Successfully!!!'}
        btn1Text="Ok"
        btn1OnClick={() => {
          setShowActionSuccessModal(false)
          navigate(pathNames.DASHBOARD, { replace: true })
        }}
        showModal={showActionSuccessModal}
        setShowModal={setShowActionSuccessModal}
      />
    </Box>
  )
}

export default VerifierVerifyReport
