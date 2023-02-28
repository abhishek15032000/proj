import PersonIcon from '@mui/icons-material/Person'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { Colors } from '../../../../theme'

interface VerifierAcceptProps {
  tabData?: any
}

const VerifierAccept: FC<VerifierAcceptProps> = (props) => {
  const { tabData } = props

  return (
    <Box sx={{ fontSize: 14, fontWeight: 500, px: 3 }}>
      <Box sx={{ color: '#006B5E' }}>Verifier(s) accepted Project request</Box>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
        <PersonIcon sx={{ color: Colors.darkPrimary1, fontSize: 20 }} />
        <Box>{tabData?.data?.verifier_name}</Box>
      </Box>
    </Box>
  )
}
export default VerifierAccept
