import React, { useState } from 'react'
import { useEffect } from 'react'
import { Colors } from '../../theme'
import RefreshIcon from '@mui/icons-material/Refresh'
import { v4 as uuidv4 } from 'uuid'
import { CaptchaProps } from './Captcha.interface'
import { authCalls } from '../../api/authCalls'
import { Box } from '@mui/system'
import CCInputField from '../../atoms/CCInputField'

export default function Captcha({
  captchaInput,
  setCaptchaInput,
  setCaptchaToken,
  token,
}: CaptchaProps) {
  const [captchaImg, setCaptchaImg] = useState<any>()

  useEffect(() => {
    if (token) {
      getCaptcha(token)
    }
  }, [token])

  const getCaptcha = async (token: string) => {
    authCalls
      .getCaptcha(token)
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setCaptchaImg(imageObjectURL)
      })
      .catch((e) => console.log(e))
  }

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={captchaImg}
          style={{
            width: 150,
            height: 30,
          }}
        />
        <Box
          sx={{
            alignSelf: 'end',
            cursor: 'pointer',
            fontSize: 12,
            color: Colors.darkPrimary1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1,
          }}
          onClick={() => setCaptchaToken(uuidv4())}
        >
          Refresh
          <RefreshIcon
            style={{
              fontSize: 20,
              color: Colors.darkPrimary1,
              fontWeight: '500',
            }}
          />
        </Box>
        <CCInputField
          label="Captcha"
          variant="filled"
          sx={{ width: 150, mt: 1 }}
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />
      </Box>
    </Box>
  )
}
