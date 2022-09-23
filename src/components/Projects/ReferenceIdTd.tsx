import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'

interface referenceIdTdProps {
  referenceId: string
  index: number
}

const ReferenceIdTd = ({ referenceId, index }: referenceIdTdProps) => {
  const [indexOfReferenceIdTdToShow, setIndexOfReferenceIdTdToShow] = useState<
    number | null
  >(null)

  return (
    <Box>
      {referenceId && (
        <Typography
          sx={{ cursor: 'pointer' }}
          onMouseEnter={() => setIndexOfReferenceIdTdToShow(index)}
          onMouseLeave={() => setIndexOfReferenceIdTdToShow(null)}
        >
          {limitTitleFromMiddle(referenceId)}
        </Typography>
      )}
      {index === indexOfReferenceIdTdToShow && (
        <Paper
          sx={{
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
