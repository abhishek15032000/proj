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
  setProject,
  setProjectID,
  setReceiverInitial,
  setSectionIDs,
  setSenderInitial,
} from '../../redux/Slices/commentsSlice'
import { getLocalItem } from '../../utils/Storage'
import { getComments } from '../../utils/reviewAndComment.util'
import { pathNames } from '../../routes/pathNames'
import { ROLES } from '../../config/constants.config'

const ReviewAndComment = () => {
  const location: any = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const userType = getLocalItem('userDetails')?.type
  const userName = getLocalItem('userDetails2')?.fullName
  const user_id = getLocalItem('userDetails')?.user_id

  // const {
  //   state: { project = '', pdf = '', veriferName = '' },
  // } = location

  const project = location?.state?.project
  const pdf = location?.state?.pdf
  const veriferName = location?.state?.veriferName

  const sectionIDs = useAppSelector(
    ({ comments }) => comments.sectionIDs,
    shallowEqual
  )

  const [showCommentSection, setShowCommentSection] = useState<boolean>(false)

  useEffect(() => {
    if (userType === ROLES.VERIFIER) {
      setDataForViewer()
    } else {
      setDataForIssuer()
    }
  }, [])

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

    const veriferInitial = veriferName?.slice(0, 1) || 'V'
    const issuerInitial = project?.name?.slice(0, 1) || 'I'
    dispatch(setSenderInitial(veriferInitial))
    dispatch(setReceiverInitial(issuerInitial))
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

    const veriferInitial = veriferName?.slice(0, 1) || 'V'
    const issuerInitial = userName.slice(0, 1) || 'I'
    dispatch(setSenderInitial(issuerInitial))
    dispatch(setReceiverInitial(veriferInitial))
  }

  return (
    <Paper
      sx={{
        height: 'calc(100vh)',
      }}
    >
      <Box
        sx={{
          height: '60px',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #DAE5E1',
        }}
      >
        <Typography sx={{ fontSize: 28, color: Colors.tertiary }}>
          Project Issuance Report (PDF)
        </Typography>
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
              setShowCommentSection(true)
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
            sx={{ ml: 2, color: '#006B5E', fontSize: 18, cursor: 'pointer' }}
            onClick={() => {
              setShowCommentSection(false)
            }}
          />
        </Box>
      </Box>
      <Grid container sx={{ background: '#DAE5E1', px: 2 }}>
        <Grid
          item
          xs={12}
          lg={showCommentSection ? 6 : 12}
          sx={{ height: 'calc( 100vh - 60px)' }}
        >
          {/* <PDFViewer pdfUrl={'/src/components//pdf-lib_form_creation_example'} /> */}
          <PDFViewer pdfUrl={'/src/components/ReviewAndComment/demo-pdf.pdf'} />
        </Grid>
        {showCommentSection ? (
          <Grid item xs={12} lg={6} sx={{ height: 'calc( 100vh - 60px)' }}>
            <CommentBox />
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  )
}

export default ReviewAndComment
