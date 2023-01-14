import { Box } from '@mui/system'
import SendIcon from '@mui/icons-material/Send'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { commentsCalls } from '../../api/commentsCalls.api'
import { setComment } from '../../redux/Slices/commentsSlice'
import { getComments } from '../../utils/reviewAndComment.util'

const SendComment = () => {
  const dispatch = useAppDispatch()

  const projectID = useAppSelector(
    ({ comments }) => comments.projectID,
    shallowEqual
  )
  const selectedSection = useAppSelector(
    ({ comments }) => comments.selectedSection,
    shallowEqual
  )
  const comment = useAppSelector(
    ({ comments }) => comments.comment,
    shallowEqual
  )
  const commentFrom = useAppSelector(
    ({ comments }) => comments.commentFrom,
    shallowEqual
  )
  const commentTo = useAppSelector(
    ({ comments }) => comments.commentTo,
    shallowEqual
  )
  const senderInitial = useAppSelector(
    ({ comments }) => comments.senderInitial,
    shallowEqual
  )

  const sendComment = async () => {
    if (!comment) return
    const payload = {
      project_id: projectID,
      section_id: selectedSection?.id,
      comment: comment,
      from: commentFrom,
      to: commentTo,
      read: false,
    }
    try {
      const createCommentRes = await commentsCalls.createComment(payload)
      console.log(createCommentRes)
      if (createCommentRes?.success) {
        getComments()
        dispatch(setComment(''))
      }
    } catch (err) {
      console.log('Error in commentsCalls.createComment api ~ ', err)
    }
  }

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
      }}
    >
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
