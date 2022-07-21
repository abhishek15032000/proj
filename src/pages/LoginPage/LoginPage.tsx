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
      alignItems="center"
    >
      <Grid
        item
        xl={5}
        lg={5}
        md={5}
        sm={12}
        xs={12}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          padding: 1,
          height: window.innerHeight,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{
            marginLeft: {
              sm: 8,
              lg: 11,
            },
            marginRight: {
              sm: 9,
              lg: 18,
            },
          }}
        >
          <Typography sx={{ fontSize: 40, marginBottom: '32px' }}>
            Login
          </Typography>

          {/* <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
            Email ID
          </Typography> */}

          <Grid container sx={{}} rowSpacing={3} columnSpacing={3}>
            <Grid item xs={12}>
              <CCInputField
                label="Email ID"
                variant="outlined"
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
                variant="outlined"
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
            }}
          >
            <Typography>Forgot password?</Typography>
          </Box>
          <CCButton
            type="submit"
            fullWidth
            sx={{
              height: '50px',
              borderRadius: '6px',
              marginTop: '64px',
            }}
            variant="contained"
            disabled={Object.values(errors).length > 0}
          >
            Login
          </CCButton>

          <Typography sx={{ marginTop: '40px', marginBottom: '15px' }}>
            Don’t have an account yet?
          </Typography>
          <CCButton
            onClick={() => navigate(pathNames.REGISTER)}
            fullWidth
            sx={{
              height: '50px',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: 'darkPrimary1.main',
              border: '2px solid',
              borderColor: 'darkPrimary1.main',
            }}
            variant="outlined"
          >
            Register
          </CCButton>
        </Box>
      </Grid>
      <Grid
        item
        xl={7}
        lg={7}
        md={7}
        sm={12}
        xs={12}
        component="img"
        // src="https://wiki.dave.eu/images/4/47/Placeholder.png"
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
          },
          // height: window.innerHeight,
          backgroundColor: 'disable.main',
          flex: 1,
          height: '100%',
        }}
      ></Grid>
    </Grid>
  )
}

export default Login
