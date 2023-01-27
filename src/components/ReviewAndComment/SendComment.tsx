import SendIcon from '@mui/icons-material/Send'
import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setComment } from '../../redux/Slices/commentsSlice'
// import { sendComment } from '../../utils/reviewAndComment.util'
import { useComment } from '../../hooks/useComment'

const SendComment = () => {
  const dispatch = useAppDispatch()
  const {sendComment} = useComment()
  const comment = useAppSelector(
    ({ comments }) => comments.comment,
    shallowEqual
  )
  const senderInitial = useAppSelector(
    ({ comments }) => comments.senderInitial,
    shallowEqual
  )

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: '0 0 16px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        flex: '0 1 auto',
        mb: 2,
      }}
    >
      <Box>
        <Box
          sx={{
            color: '#fff',
            background: '#006B5E',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          {senderInitial}
        </Box>
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <textarea
          style={{
            width: '100%',
            background: '#DAE5E1',
            outline: 'none',
            borderRadius: '8px',
            padding: '4px',
            fontFamily: 'Poppins',
          }}
          rows={3}
          value={comment}
          onChange={(e: any) => dispatch(setComment(e.target.value))}
        />
      </Box>
      <Box
        sx={{
          ml: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SendIcon
          sx={{
            color: comment ? '#006B5E' : '#D3D3D3',
            transform: 'rotate(-45deg)',
            cursor: comment ? 'pointer' : 'not-allowed',
          }}
          onClick={sendComment}
        />
      </Box>
    </Box>
  )
}

export default SendComment
