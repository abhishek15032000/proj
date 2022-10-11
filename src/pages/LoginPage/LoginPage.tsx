import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Logo from '../../atoms/Logo'
import { loginAction } from '../../redux/Slices/authSlice'
import { authCalls } from '../../api/authCalls'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import useForm from '../../hooks/useForm'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { Images } from '../../theme'
import Captcha from '../../components/Captcha/Captcha'
import LoaderOverlay from '../../components/LoderOverlay'
import { USER } from '../../api/user.api'
import isEmail from 'validator/lib/isEmail'
import { setLocalItem } from '../../utils/Storage'
import ForgotPasswordModal from './ForgotPasswordModal'

declare let window: any

const Login = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [pwdCopy, setPwdCopy] = useState('')
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setCaptchaTokenFromUUID()
  }, [])

  const setCaptchaTokenFromUUID = () => {
    console.log('loginn page setCaptchaTokenFromUUID')
    setCaptchaToken(uuidv4())
  }

  const login = async () => {
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
        lg={6}
        xs={12}
        display="flex"
        sx={{
          width: '100%',
          minHeight: '100%',
          px: 20,
          flex: 1,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{
            width: '100%',
          }}
        >
          <Box py={1}>
            <Logo />
          </Box>
          <Typography
            sx={{ fontWeight: '700', fontSize: 32, mt: 8, color: '#1C4A43' }}
          >
            Login
          </Typography>
          <Typography sx={{ fontWeight: '500', fontSize: 16, mt: 1, mb: 5 }}>
            Login by providing the information below
          </Typography>
          <Grid container sx={{}} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <CCInputField
                label="Email ID"
                variant="filled"
                type="email"
                name="email"
                onChange={handleChange}
                error={
                  values?.email !== '' &&
                  values?.email !== undefined &&
                  !isEmail(values?.email)
                }
                helperText={
                  values?.email !== '' &&
                  values?.email !== undefined &&
                  !isEmail(values?.email) &&
                  'Enter valid Email ID'
                }
                defaultValue={values?.email}
                clearFn={() => handleChange({ target: { value: '' } })}
              />
            </Grid>
            <Grid item xs={12}>
              <CCInputField
                type="password"
                label="Password"
                variant="filled"
                defaultValue={values?.password}
                name="password"
                // error={errors?.password}
                onChange={(e) => {
                  handleChange(e)
                  setPwdCopy(e.target.value)
                }}
                onBlur={(e) => {
                  setPwdCopy(e.target.value)
                  e.target.value = uuidv4()
                  handleChange(e)
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
          >
            <Typography
              sx={{ fontWeight: '500', color: '#335844', cursor: 'pointer' }}
              onClick={() => setOpenModal(true)}
            >
              Forgot password?
            </Typography>
          </Box>
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
            // disabled={Object.values(errors).length > 0}
          >
            {loading ? 'Logging in...' : 'Login'}
          </CCButton>
          <Grid container justifyContent={'center'} alignItems={'center'}>
            <Typography
              sx={{
                marginTop: '20px',
                marginBottom: '15px',
                textAlign: 'center',
                fontWeight: '400',
                fontSize: 16,
              }}
            >
              {`Don't have an account?`}
            </Typography>
            <Typography
              onClick={() => navigate(pathNames.REGISTER)}
              sx={{
                fontWeight: '500',
                fontSize: 20,
                px: 1,
                pt: 0.5,
                cursor: 'pointer',
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
                fontWeight: '400',
                fontSize: 16,
              }}
            >
              {`here`}
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        flexDirection="column"
        sx={{
          display: {
            lg: 'flex',
            xs: 'none',
          },
          minHeight: '100%',
          backgroundImage: `url(${Images.illustration1})`,
          flex: 1,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <ForgotPasswordModal
        showModal={openModal}
        setShowModal={setOpenModal}
        setLoading={setLoading}
      />
    </Grid>
  )
}

export default Login
