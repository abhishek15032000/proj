import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'

interface referenceIdTdProps {
  referenceId: string
}

const ReferenceIdTd = ({ referenceId }: referenceIdTdProps) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <Box>
      {referenceId && (
        <Typography
          sx={{ cursor: 'pointer', fontSize: 14 }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {limitTitleFromMiddle(referenceId)}
        </Typography>
      )}
      {show && (
        <Paper
          sx={{
            width: '350px',
            ml: 3,
            p: 1,
            position: 'absolute',
            zIndex: '1000',
            borderRadius: 2,
            boxShadow: '0px 5px 20px rgba(29, 75, 68, 0.1)',
          }}
        >
          {referenceId}
        </Paper>
      )}
    </Box>
  )
}

export default ReferenceIdTd
