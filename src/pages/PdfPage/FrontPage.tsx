import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import { fileUploadCalls } from '../../api/fileUpload.api'
import IcrLogo from '../../assets/Images/logo/ICR_LOGO_1.svg'
import ClimatToday from '../../assets/Images/logo/climat_today.svg'
import { useAppSelector } from '../../hooks/reduxHooks'

interface FrontPageProps {
  getImage?: any
}
const FrontPage: FC<FrontPageProps> = ({ getImage }) => {
  const [bannerImage, setBannerImage] = useState('')
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData)

  useEffect(() => {
    data?.banner_image?.length > 0 &&
      fileUploadCalls.getFile(data?.banner_image[0]).then((res) => {
        setBannerImage(URL.createObjectURL(res))
      })
  }, [data])

  return (
    <Box
      sx={{
        size: 'A4',
        // border: '1px solid red',
        // width: '21cm',
        height: '29.7cm',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <img src={IcrLogo} alt="icr" />
          </Box>
          <Box>
            <img src={ClimatToday} alt="climat today logo" />
          </Box>
        </Box>
        <Box sx={{ px: 1, mt: 2 }}>
          <Box sx={{ color: '#3F4946', fontSize: 32, fontWeight: 600 }}>
            {data?.company_name}
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
      <Box sx={{ height: '100%', flexGrow: '1' }}>
        <img
          src={bannerImage}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          alt="banner image"
        />
      </Box>
    </Box>
  )
}

export default FrontPage
