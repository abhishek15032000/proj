import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { limitTitleFromMiddle } from '../../utils/commonFunctions'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Colors } from '../../theme'

interface ShortenedIDCompProps {
  referenceId: string
  width?: string
}

const ShortenedIDComp = ({ referenceId, width }: ShortenedIDCompProps) => {
  const [show, setShow] = useState<boolean>(false)
  const [show2, setShow2] = useState<boolean>(false)

  return (
    <Box>
      {referenceId && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          <Typography
            sx={{
              cursor: 'pointer',
              fontSize: 14,
            }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            {limitTitleFromMiddle(referenceId)}
          </Typography>
          <ContentCopyIcon
            sx={{
              fontSize: '16px',
              color: Colors.darkPrimary1,
              cursor: 'pointer',
              ml: 1,
            }}
            onClick={() => navigator.clipboard.writeText(referenceId)}
            onMouseEnter={() => setShow2(true)}
            onMouseLeave={() => setShow2(false)}
          />
        </Box>
      )}
      {show && (
        <Paper
          sx={{
            width: width ? width : '350px',
            // width: 'fit-content',
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
      {show2 && (
        <Paper
          sx={{
            width: '150px',
            // width: 'fit-content',
            ml: 3,
            p: 1,
            position: 'absolute',
            zIndex: '1000',
            borderRadius: 2,
            boxShadow: '0px 5px 20px rgba(29, 75, 68, 0.1)',
            fontSize: 14,
          }}
        >
          Copy To Clipboard
        </Paper>
      )}
    </Box>
  )
}

export default ShortenedIDComp
