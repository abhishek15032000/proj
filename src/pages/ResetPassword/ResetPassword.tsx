import React, { useState, useEffect } from 'react'
import Logo from '../../atoms/Logo'
import './ResetPassword.css'
import { useLocation, useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { pathNames } from '../../routes/pathNames'
import { v4 as uuidv4 } from 'uuid'
import Captcha from '../../components/Captcha/Captcha'
import { USER } from '../../api/user.api'
import { useAppDispatch } from '../../hooks/reduxHooks'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { getLocalItem } from '../../utils/Storage'
import { authCalls } from '../../api/authCalls'
import { logoutAction } from '../../redux/Slices/authSlice'
import { getUrlVars } from '../../utils/commonFunctions'
import { Box } from '@mui/system'
import { Grid, InputAdornment, Typography } from '@mui/material'
import { Images } from '../../theme'
import LoaderOverlay from '../../components/LoderOverlay'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function ResetPassword(props: any) {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [loading, setloading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState(uuidv4())

  useEffect(() => {
    InitFn()
  }, [])

  const InitFn = () => {
    if (getLocalItem('userDetails')) {
      dispatch(logoutAction())
      window.location.reload()
      return
    }
    if (location && location?.search && location?.search?.includes('token')) {
      const data = getUrlVars(location.search)
      setUserData(data)
      authCalls.verifyToken({ token: data?.token }).then((res) => {
        if (!res.success) {
          alert('Link Expired')
          navigate(pathNames.LOGIN, { replace: true })
        }
      })
    }
  }

  const callResetPasswordFn = async () => {
    if (newPassword.length == 0) {
      alert('Please type a password')
      return
    }
    console.log('userData', userData)
    if (userData) {
      setloading(true)
      userData.newPassword = CryptoJS.MD5(newPassword).toString()
      userData.captcha = captchaInput
      userData.id = captchaToken

      try {
        const res = await USER.resetPassword(userData)
        if (res?.success && res?.data) {
          alert('Your New Password has been set successfully')
          navigate(pathNames.LOGIN, { replace: true })
        } else {
          alert(res.error)
        }
      } catch (e) {
        alert('Something went wrong!')
      } finally {
        setCaptchaToken(uuidv4())
        setloading(false)
      }
    }
  }

  const checkPassword = (e: any) => {
    if (newPassword && confirmNewPassword && newPassword != e.target.value) {
      setConfirmNewPassword('')
      alert('Entered passwords do not match. Please try again!')
    }
  }

  return (
    <Grid
      container
      flexDirection="row"
      xs={12}
      height={'100vh'}
      justifyContent="center"
      alignItems={'stretch'}
      display="flex"
    >
      {loading ? <LoaderOverlay /> : null}
      <Grid
        item
        md={6}
        xs={12}
        display="flex"
        sx={{
          justifyContent: 'center',
          width: '100%',
          minHeight: '100%',
          px: 10,
          flex: 1,
        }}
      >
        <Box
          sx={{
            maxWidth: '435px',
            width: '100%',
          }}
        >
          <Box py={1}>
            <Logo />
          </Box>
          <Typography
            sx={{ fontWeight: '700', fontSize: 32, mt: 8, color: '#1C4A43' }}
          >
            Reset your password
          </Typography>
          <Typography sx={{ fontWeight: '500', fontSize: 16, mt: 1, mb: 5 }}>
            Enter your new password
          </Typography>
          <Grid container sx={{}} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <CCInputField
                label="New Password"
                variant="outlined"
                name="password"
                sx={{ background: '#F5F5F5' }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type={showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {!showNewPassword ? (
                        <VisibilityOffIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={() =>
                            setShowNewPassword(
                              (showNewPassword) => !showNewPassword
                            )
                          }
                        />
                      ) : (
                        <VisibilityIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={() =>
                            setShowNewPassword(
                              (showNewPassword) => !showNewPassword
                            )
                          }
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CCInputField
                label="Confirm New Password"
                variant="outlined"
                name="password"
                value={confirmNewPassword}
                sx={{ background: '#F5F5F5' }}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onBlur={(e) => checkPassword(e)}
                defaultValue={confirmNewPassword}
                type={showConfirmNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {!showConfirmNewPassword ? (
                        <VisibilityOffIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            setShowConfirmNewPassword(
                              (confirmNewPassword) => !confirmNewPassword
                            )
                            console.log('VisibilityOffIcon clicked')
                          }}
                        />
                      ) : (
                        <VisibilityIcon
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            setShowConfirmNewPassword(
                              (confirmNewPassword) => !confirmNewPassword
                            )
                            console.log('VisibilityIcon clicked')
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: 14,
              pt: 1,
            }}
          ></Box>
          <Captcha
            token={captchaToken}
            captchaInput={captchaInput}
            setCaptchaInput={setCaptchaInput}
            setCaptchaToken={setCaptchaToken}
          />
          <CCButton
            type="submit"
            fullWidth
            sx={{
              height: '50px',
              borderRadius: '6px',
              marginTop: 4,
            }}
            variant="contained"
            disabled={
              !newPassword ||
              !confirmNewPassword ||
              newPassword !== confirmNewPassword ||
              captchaInput?.length !== 6
            }
            onClick={callResetPasswordFn}
          >
            {loading ? 'Please Wait...' : 'Reset Password'}
          </CCButton>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        flexDirection="column"
        sx={{
          display: {
            md: 'flex',
            xs: 'none',
          },
          minHeight: '100%',
          backgroundImage: `url(${Images.illustration1})`,
          flex: 1,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Grid>
  )
}
