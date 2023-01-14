import { Box } from '@mui/system'
import React from 'react'
import { shallowEqual } from 'react-redux'
import { COMMENT_ALIGN } from '../../config/constants.config'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getLocalItem } from '../../utils/Storage'
import Comment from './Comment'

const Comments = () => {
  const user_id = getLocalItem('userDetails')?.user_id

  const selectedSection = useAppSelector(
    ({ comments }) => comments.selectedSection,
    shallowEqual
  )

  return (
    <Box
      sx={{
        background: '#fff',
        flex: '1 1 auto',
        p: 2,
        pb: 1,
      }}
    >
      {selectedSection?.comments && selectedSection?.comments.length ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'end',
          }}
        >
          {selectedSection?.comments.map((comment: any, index: number) => (
            <Comment
              key={index}
              align={
                comment?.from === user_id
                  ? COMMENT_ALIGN.RIGHT
                  : COMMENT_ALIGN.LEFT
              }
              comment={comment?.comment}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box sx={{ color: '#3F4946', textAlign: 'center', width: '50%' }}>
            <Box sx={{ fontSize: 14, fontWeight: 500 }}>No comments yet</Box>
            <Box sx={{ fontSize: 12 }}>
              Add a comment and send it to the PD to comment on your text
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Comments
