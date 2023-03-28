// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, InputAdornment, Typography } from '@mui/material'

// Functional Imports
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { loginAction } from '../../redux/Slices/authSlice'
import { authCalls } from '../../api/authCalls'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import { Colors, Images } from '../../theme'
import { USER } from '../../api/user.api'
import { setLocalItem } from '../../utils/Storage'

// Local Imports
import Logo from '../../atoms/Logo'
import useForm from '../../hooks/useForm'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import Captcha from '../../components/Captcha/Captcha'
import LoaderOverlay from '../../components/LoderOverlay'
import isEmail from 'validator/lib/isEmail'
import ForgotPasswordModal from './ForgotPasswordModal'
import { setWalletAdded } from '../../redux/Slices/walletSlice'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { updateWalletBalance } from '../../utils/commonAPI.utils'
declare let window: any

const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [pwdCopy, setPwdCopy] = useState('')
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [])

  const setCaptchaTokenFromUUID = () => {
    console.log('loginn page setCaptchaTokenFromUUID')
    setCaptchaToken(uuidv4())
  }

  const login = async () => {
    if (/^\s|\s$/.test(pwdCopy)) {
      alert('White Space not allowed!')
      return false
    }

    setLoading(true)
    const payload = { email: '', id: '', password: '', captcha: '' }

    payload.email = values?.email
    payload.password = CryptoJS.MD5(pwdCopy).toString()
    payload.id = captchaToken
    payload.captcha = captchaInput

    if (
      navigator.userAgent.indexOf('Chrome') != -1 ||
      navigator.userAgent.indexOf('Edg') != -1 ||
      (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) != -1
    ) {
      const cred = new window.PasswordCredential({
        id: payload.email,
        password: uuidv4(),
      })
      //store the credentials
      navigator.credentials.store(cred).then(function () {
        console.log('Done Saving Creds')
      })
    }

    try {
      setLoading(true)
      const res = await authCalls.loginCall(payload)

      if (res?.success && res?.data) {
        if (res?.status === 204) {
          alert('Retry login with new Captch')
          setCaptchaInput('')
          return
        }
        if (res?.data?.captchaVerify) {
          const userResponse = await USER.getUsersById(res?.data?.user_id)
          setLocalItem('userDetails2', userResponse?.data)
          // update wallet balance and table
          updateWalletBalance()
          dispatch(setWalletAdded(userResponse?.data?.wallet_added))
          const profileCompleted = userResponse?.data?.orgName ? true : false
          setLocalItem('profileCompleted', profileCompleted)
          dispatch(loginAction(res?.data)) //calling action from redux
          if (res.data.type === 'ISSUER' || res.data.type === 'VERIFIER') {
            navigate(pathNames.DASHBOARD, { replace: true })
          }

          window.location.reload()
        } else {
          alert(res?.data)
        }
      } else if (res?.error || res.status !== 200) {
        alert(
          res?.error ||
            'Something seems wrong with your credentials. Please try again!'
        )
        setCaptchaTokenFromUUID()
        setCaptchaInput('')
      }
    } catch (e: any) {
      console.log('Error in authCalls.loginCall api', e)
    } finally {
      new window.PasswordCredential({ id: payload.email, password: uuidv4() })
      setLoading(false)
    }
  }

  const { handleChange, values, errors, handleSubmit } = useForm(login)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {loading ? <LoaderOverlay show /> : null}
      <Box
        sx={{
          width: {
            sm: '100%',
            lg: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            component="img"
            src={Images.logo}
            sx={{ height: '50px', marginLeft: -2, mb: 2, mt: 2 }}
          />

          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{ fontWeight: '700', fontSize: 24, color: '#1C4A43' }}
            >
              Login
            </Typography>
            <Typography
              sx={{ fontWeight: '500', fontSize: 14, marginTop: 0.5 }}
            >
              Login by providing the information below
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CCInputField
              label="Work Email ID"
              // placeholder="Work Email ID"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleChange}
              sx={{ width: '400px', mb: 2 }}
              defaultValue={values?.email}
              clearFn={() => handleChange({ target: { value: '' } })}
            />

            <CCInputField
              label="Password"
              variant="outlined"
              name="password"
              onChange={(e) => {
                handleChange(e)
                setPwdCopy(e.target.value)
              }}
              onBlur={(e) => {
                setPwdCopy(e.target.value)
                if (e.target.value.length > 0) {
                  e.target.value = uuidv4()
                  handleChange(e)
                }
              }}
              defaultValue={values?.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {!showPassword ? (
                      <VisibilityOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{ width: '400px', mb: 2 }}
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                fontSize: 14,
                pt: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: '500',
                  // mt: 1,
                  color: '#335844',
                  cursor: 'pointer',
                  mr: 2,
                }}
                onClick={() => setOpenModal(true)}
              >
                Forgot password?
              </Typography>
            </Box>
          </Box>

          <Captcha
            token={captchaToken}
            captchaInput={captchaInput}
            setCaptchaInput={setCaptchaInput}
            setCaptchaToken={setCaptchaToken}
          />

          <Box
            sx={{
              // border: '2px solid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CCButton
              type="submit"
              sx={{
                height: '40px',
                width: '100%',
                borderRadius: '6px',
                marginTop: 4,
              }}
              variant="contained"
            >
              {loading ? 'Logging in...' : 'Login'}
            </CCButton>
            <Box justifyContent={'center'} display="flex" alignItems={'center'}>
              <Typography
                sx={{
                  marginTop: '20px',
                  marginBottom: '15px',
                  textAlign: 'center',

                  fontSize: 14,
                  color: Colors.textColorDarkGreen,
                  fontWeight: '500',
                }}
              >
                {`Don't have an account?`}
              </Typography>
              <Typography
                onClick={() => navigate(pathNames.REGISTER)}
                sx={{
                  fontWeight: '500',
                  fontSize: 18,
                  px: 1,
                  pt: 0.5,
                  cursor: 'pointer',
                  color: Colors.textColorDarkGreen,
                }}
              >
                {' '}
                Register{' '}
              </Typography>
              <Typography
                sx={{
                  marginTop: '20px',
                  marginBottom: '15px',
                  textAlign: 'center',

                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.textColorDarkGreen,
                }}
              >
                {`here`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            sm: 'none',
            xs: 'none',
            lg: 'flex',
          },
          width: '50%',
          height: '100vh',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          flexDirection="column"
          component="img"
          src={Images.illustration1}
          sx={{
            width: '100%',
          }}
        />
      </Box>
      <ForgotPasswordModal
        isChangePassword={false}
        showModal={openModal}
        setShowModal={setOpenModal}
        setLoading={setLoading}
      />
    </Box>
  )
}

export default Login
