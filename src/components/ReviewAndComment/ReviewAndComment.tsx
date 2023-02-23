import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import { Colors } from '../../theme'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import CommentBox from './CommentBox'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setCommentFrom,
  setCommentTo,
  setIssuerName,
  setProject,
  setProjectID,
  setReceiverInitial,
  setSectionIDs,
  setSenderInitial,
  setVerifierName,
} from '../../redux/Slices/commentsSlice'
import { getLocalItem } from '../../utils/Storage'
// import { getComments } from '../../utils/reviewAndComment.util'
import { pathNames } from '../../routes/pathNames'
import { ROLES } from '../../config/constants.config'
import { fileUploadCalls } from '../../api/fileUpload.api'
import './index.css'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { useComment } from '../../hooks/useComment'

const ReviewAndComment = () => {
  const location: any = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userType = getLocalItem('userDetails')?.type
  const userName = getLocalItem('userDetails2')?.fullName
  const user_id = getLocalItem('userDetails')?.user_id

  // const {
  //   state: { project = '', pdf = '', verifierName = '' },
  // } = location

  const project = location?.state?.project
  const pdf = location?.state?.pdf
  const verifierName = location?.state?.verifierName
  const verifierID = location?.state?.verifierID
  const { jwtToken } = getLocalItem('userDetails')

  const sectionIDs = useAppSelector(
    ({ comments }) => comments.sectionIDs,
    shallowEqual
  )

  const [showCommentSection, setShowCommentSection] = useState<boolean>(false)
  const [pdfLoading, setPDFLoading] = useState(false)
  const [pdfURL, setpdfURL] = useState<null | string>(null)

  useEffect(() => {
    if (userType === ROLES.VERIFIER) {
      setDataForViewer()
    } else {
      setDataForIssuer()
    }
  }, [])

  const { getComments } = useComment()

  useEffect(() => {
    if (sectionIDs && sectionIDs.length) {
      getComments()
    }
  }, [sectionIDs])

  const setDataForViewer = () => {
    dispatch(setProject(project))
    dispatch(setProjectID(project?._id))

    dispatch(
      setSectionIDs([
        project?.section_a,
        project?.section_b,
        project?.section_c,
        project?.section_d,
        project?.section_e,
      ])
    )
    dispatch(setCommentFrom(user_id))
    dispatch(setCommentTo(project?.user_id))

    const veriferInitial = verifierName?.slice(0, 1) || 'V'
    const issuerInitial = project?.name?.slice(0, 1) || 'I'
    dispatch(setSenderInitial(veriferInitial))
    dispatch(setReceiverInitial(issuerInitial))
    dispatch(setVerifierName(verifierName))
    dispatch(setIssuerName(project?.name))
  }

  const setDataForIssuer = () => {
    dispatch(setProject(project))
    dispatch(setProjectID(project?._id))

    dispatch(
      setSectionIDs([
        project?.section_a?._id,
        project?.section_b?._id,
        project?.section_c?._id,
        project?.section_d?._id,
        project?.section_e?._id,
      ])
    )

    dispatch(setCommentFrom(user_id))
    dispatch(setCommentTo(verifierID))

    const veriferInitial = verifierName?.slice(0, 1) || 'V'
    const issuerInitial = userName.slice(0, 1) || 'I'
    dispatch(setSenderInitial(issuerInitial))
    dispatch(setReceiverInitial(veriferInitial))
    dispatch(setVerifierName(verifierName))
    dispatch(setIssuerName(project?.name))
  }

  useEffect(() => {
    getPDF()
  }, [showCommentSection])

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

  return (
    <Paper
      sx={{
        height: 'calc(100vh)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: '#F6F9F7',
          px: 4,
        }}
      >
        <Box
          sx={{
            px: 2,
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
            Project
          </Box>
          <Box>{'>'}</Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
            Project Details
          </Box>
          <Box>{'>'}</Box>
          <Box sx={{ fontSize: 12, color: '#000000' }}> Review </Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Grid
            container
            sx={{
              background: '#F6F9F7',
              height: '100%',
              px: showCommentSection ? 2 : 0,
              pb: 1,
            }}
          >
            <Grid
              item
              xs={12}
              md={showCommentSection ? 7 : 12}
              sx={{ height: '100%', backgroundColor: 'white' }}
            >
              <Box
                sx={{
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // border: '1px solid #DAE5E1',
                }}
              >
                {' '}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <KeyboardArrowLeft
                    sx={{ ml: 1, cursor: 'pointer' }}
                    onClick={() => navigate(-1)}
                  />
                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: '500',
                      color: Colors.tertiary,
                    }}
                  >
                    Project Issuance Report (PDF)
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {userType === ROLES.VERIFIER ? (
                    <CCButton
                      sx={{
                        minWidth: 0,
                        padding: '8px 24px',
                        borderRadius: '20px',
                        fontSize: 14,
                        background: '#006B5E',
                        color: '#fff',
                      }}
                      onClick={() =>
                        navigate(pathNames.VERIFIER_VERIFY_REPORT, {
                          state: {
                            project,
                            pdf,
                          },
                        })
                      }
                    >
                      Move to Verification
                    </CCButton>
                  ) : null}
                  <Box
                    sx={{
                      ml: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setShowCommentSection(!showCommentSection)
                    }}
                  >
                    <ChatBubbleOutlineOutlinedIcon
                      sx={{ color: '#006B5E', mr: 1, fontSize: 16 }}
                    />
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500, color: '#006B5E' }}
                    >
                      Comments
                    </Typography>
                  </Box>
                  <OpenInFullOutlinedIcon
                    sx={{
                      ml: 2,
                      color: '#006B5E',
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setShowCommentSection(!showCommentSection)
                    }}
                  />
                </Box>
              </Box>
              {pdfLoading ? (
                <Box
                  sx={{
                    fontSize: '32',
                    color: Colors.darkPrimary1,
                    fontWeight: 500,
                    height: 'calc( 100vh - 60px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Loading PDF...
                </Box>
              ) : null}
              {/* {!showCommentSection ? ( */}

              <Box sx={{ height: '90%', width: '100%' }}>
                {pdfURL ? <PDFViewer pdfUrl={pdfURL} /> : null}
              </Box>
              {/* ) : (
        <Grid container sx={{ background: '#DAE5E1', px: 2 }}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{ height: 'calc( 100vh - 60px)', backgroundColor: 'white' }}
          >
            {pdfURL ? <PDFViewer pdfUrl={pdfURL} /> : null}
          </Grid>
          <Grid item xs={12} md={5} sx={{ height: 'calc( 100vh - 60px)' }}>
            <CommentBox
              closeChatbox={() => {
                setShowCommentSection(!showCommentSection)
              }}
            />
          </Grid>
        </Grid>
      )} */}
            </Grid>
            {showCommentSection && (
              <Grid item xs={12} md={5} sx={{ height: '100%', pt: 4 }}>
                <CommentBox
                  closeChatbox={() => {
                    setShowCommentSection(!showCommentSection)
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}

export default ReviewAndComment
