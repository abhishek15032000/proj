import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
  setSectionIDs,
} from '../../redux/Slices/commentsSlice'
import { getLocalItem } from '../../utils/Storage'
import { getComments } from '../../utils/reviewAndComment.util'

const ReviewAndComment = () => {
  const location: any = useLocation()
  const dispatch = useAppDispatch()

  const {
    state: { project },
  } = location

  const sectionIDs = useAppSelector(
    ({ comments }) => comments.sectionIDs,
    shallowEqual
  )

  const [showCommentSection, setShowCommentSection] = useState<boolean>(false)

  useEffect(() => {
    const user_id = getLocalItem('userDetails')?.user_id

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
  }, [])

  useEffect(() => {
    if (sectionIDs && sectionIDs.length) {
      getComments()
    }
  }, [sectionIDs])

  return (
    <Paper>
      <Box
        sx={{
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
          <CCButton
            sx={{
              minWidth: 0,
              padding: '8px 24px',
              borderRadius: '20px',
              fontSize: 14,
              background: '#006B5E',
              color: '#fff',
            }}
          >
            Move to Verification
          </CCButton>
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
        <Grid item xs={12} lg={showCommentSection ? 6 : 12}>
          {/* <PDFViewer pdfUrl={'/src/components//pdf-lib_form_creation_example'} /> */}
          <PDFViewer pdfUrl={'/src/components/ReviewAndComment/demo-pdf.pdf'} />
        </Grid>
        {showCommentSection ? (
          <Grid item xs={12} lg={6}>
            <CommentBox />
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  )
}

export default ReviewAndComment
