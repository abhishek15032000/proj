// React Imports
import React, { useState } from 'react'

// MUI Components
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import Logo from '../../atoms/Logo'
// Local Imports
import { LoginPageInterface } from './LoginPage.interface'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { loginAction } from '../../redux/Slices/authSlice'
import { authCalls } from '../../api/authCalls'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { pathNames } from '../../routes/pathNames'
import useForm from '../../hooks/useForm'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { Images } from '../../theme'

const Login = (props: LoginPageInterface) => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const login = () => {
    dispatch(loginAction({ roles: ['ISSUER'] })) //calling action from redux
    authCalls.loginCall()
    navigate(pathNames.DASHBOARD, { replace: true })
  }

  const { handleChange, values, errors, handleSubmit } = useForm(login)

  return (
    <Grid
      container
      flexDirection="row"
      xs={12}
      height={'100vh'}
      justifyContent="center"
      // alignItems="center"
    >
      <Grid
        item
        lg={6}
        xs={12}
        display="flex"
        sx={{
          marginTop: 18,
          width: '100%',
          px: 20,
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
          <Logo />
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
                error={errors?.email}
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
                error={errors?.password}
                onChange={handleChange}
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
            <Typography sx={{ fontWeight: '500', color: '#335844' }}>
              Forgot password?
            </Typography>
          </Box>
          <CCButton
            type="submit"
            fullWidth
            sx={{
              height: '50px',
              borderRadius: '6px',
              marginTop: 7,
            }}
            variant="contained"
            disabled={Object.values(errors).length > 0}
          >
            Login
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
            // sm: 'none',
            lg: 'flex',
            xs: 'none',
          },
          height: '100%',
          backgroundImage: `url(${Images.illustration1})`,
          flex: 1,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Grid>
  )
}

export default Login
