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
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'end',
        }}
      >
        {selectedSection?.comments &&
          selectedSection?.comments.length &&
          selectedSection?.comments.map((comment: any, index: number) => (
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
    </Box>
  )
}

export default Comments
