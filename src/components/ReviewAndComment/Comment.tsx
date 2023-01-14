import { Box } from '@mui/system'
import React, { FC } from 'react'
import { shallowEqual } from 'react-redux'
import { COMMENT_ALIGN } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'

interface CommentProps {
  comment: string
  align: string
}
const Comment: FC<CommentProps> = ({ comment, align }) => {
  const senderInitial = useAppSelector(
    ({ comments }) => comments.senderInitial,
    shallowEqual
  )
  const receiverInitial = useAppSelector(
    ({ comments }) => comments.receiverInitial,
    shallowEqual
  )
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
          {receiverInitial}
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
          {senderInitial}
        </Box>
      ) : null}
    </Box>
  )
}

export default Comment
