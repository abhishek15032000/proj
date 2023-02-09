import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import Comments from './Comments'
import SelectSections from './SelectSections'
import SendComment from './SendComment'

interface CommentBoxProps {
  closeChatbox?: any
}

const CommentBox: FC<CommentBoxProps> = ({ closeChatbox }) => {
  return (
    <Box
      sx={{
        color: '#000',
        mb: 2,
        // height: 'calc(100vh - 180px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ml: 2,
      }}
    >
      <Box
        sx={{
          mt: 2,
          p: 2,
          background: '#B1CCC6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '16px 16px 0 0',
          flex: '0 1 auto',
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>Comments</Typography>
        <CloseOutlinedIcon
          sx={{ color: '#006B5E', cursor: 'pointer' }}
          onClick={closeChatbox}
        />
      </Box>
      <SelectSections />
      <Comments />
      <SendComment />
    </Box>
  )
}

export default CommentBox
