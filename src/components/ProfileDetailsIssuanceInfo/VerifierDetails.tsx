import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { USER } from '../../api/user.api'
import Spinner from '../../atoms/Spinner'

interface VerifierDetailsProps {
  verifierDetails: any
  //verifierId: string
}

const VerifierDetails = ({ verifierDetails }: VerifierDetailsProps) => {
  //const [verifierDetails, setVerifierDetails] = useState<any | null>(null)

  return (
    <>
      <Paper
        sx={{
          width: '25vw',
          ml: 3,
          p: 1,
          position: 'absolute',
          zIndex: '1000',
          borderRadius: 2,
        }}
      >
        {/*{loading ? (
          <Box
            sx={{
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner />
          </Box>
        ) : (*/}
        <>
          <Box sx={{ display: 'flex' }}>
            <PlaceOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {verifierDetails?.address}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <LanguageIcon
              sx={{
                color: '#006B5E',
                mr: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: '#25BBD2',
                textDecoration: 'underline',
              }}
            >
              {verifierDetails?.website}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <PermIdentityOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {verifierDetails?.fullName}, {verifierDetails?.designation}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <PhoneInTalkOutlinedIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {verifierDetails?.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <MailOutlineIcon sx={{ color: '#006B5E', mr: 1 }} />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: '#25BBD2',
                textDecoration: 'underline',
              }}
            >
              {verifierDetails?.email}
            </Typography>
          </Box>
        </>
        {/*)}*/}
      </Paper>
    </>
  )
}

export default VerifierDetails
