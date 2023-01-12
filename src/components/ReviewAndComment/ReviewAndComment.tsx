import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CCButton from '../../atoms/CCButton'
import { Colors } from '../../theme'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined'
import PDFViewer from '../../atoms/PDFViewer/PDFViewer'
import Comments from './Comments'

const ReviewAndComment = () => {
  const location: any = useLocation()

  const {
    state: { project },
  } = location

  const [showCommentSection, setShowCommentSection] = useState<boolean>(false)

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
      <Grid container sx={{ background: '#DAE5E1', px: 2 }} columnSpacing={2}>
        <Grid item md={showCommentSection ? 6 : 12}>
          {/* <PDFViewer pdfUrl={'/src/components//pdf-lib_form_creation_example'} /> */}
          <PDFViewer pdfUrl={'/src/components/ReviewAndComment/demo-pdf.pdf'} />
        </Grid>
        {showCommentSection ? (
          <Grid item md={6}>
            <Comments />
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  )
}

export default ReviewAndComment
