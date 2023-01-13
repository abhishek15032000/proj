import { Box } from '@mui/system'
import React, { FC } from 'react'
import { COMMENT_ALIGN } from '../../config/constants.config'

interface CommentProps {
  comment: string
  align: string
}
const Comment: FC<CommentProps> = ({ comment, align }) => {
  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          align === COMMENT_ALIGN.RIGHT ? 'flex-end' : 'flex-start',
      }}
    >
      {align === COMMENT_ALIGN.RIGHT ? null : (
        <Box
          sx={{
            color: '#fff',
            fontSize: 12,
            background: '#006B5E',
            height: '20px',
            width: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1,
          }}
        >
          V
        </Box>
      )}
      <Box
        sx={{
          p: 1,
          fontSize: '12px',
          maxWidth: '70%',
          background: '#EFF1EF',
          borderRadius: '16px',
        }}
      >
        {comment}
      </Box>
      {align === COMMENT_ALIGN.RIGHT ? (
        <Box
          sx={{
            color: '#fff',
            fontSize: 12,
            background: '#006B5E',
            height: '20px',
            width: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 1,
          }}
        >
          V
        </Box>
      ) : null}
    </Box>
  )
}

export default Comment
