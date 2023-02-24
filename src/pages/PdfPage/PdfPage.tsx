import { Box } from '@mui/system'
import React from 'react'
import IcrLogo from '../../assets/Images/logo/ICR_LOGO_1.svg'

const PdfPage = () => {
  return (
    <>
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <img src={IcrLogo} alt="icr" />
          </Box>
          <Box></Box>
        </Box>
        <Box sx={{ px: 1, mt: 2 }}>
          <Box sx={{ color: '#3F4946', fontSize: 32, fontWeight: 600 }}>
            Heading
          </Box>
          <Box sx={{ color: '#3F4946', fontSize: 14, fontWeight: 500, my: 2 }}>
            Project Design Description V 2.0
          </Box>
          <Box
            sx={{
              mt: 1,
              color: '#191C1B',
              fontSize: 14,
              fontWeight: 400,
              background: '#DAF7F0',
              borderRadius: '4px',
              padding: '2px 5px',
              display: 'inline-block',
            }}
          >
            AMS-I.B Grid-connected electricity generation from renewable sources
          </Box>
        </Box>
      </Box>
      <Box sx={{ border: '1px solid blue', height: '500px' }}>img</Box>
    </>
  )
}

export default PdfPage
