import React, { useState } from 'react'
import { RegisterPageProps } from './RegisterPage.interface'

import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
} from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CCButton from '../../atoms/CCButton'
import { pathNames } from '../../routes/pathNames'
import { useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'

const RegisterPage = (props: RegisterPageProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const register = () => {
    alert(JSON.stringify(values))
    // dispatch(registerAction({ roles: ['ISSUER'] })) //calling action from redux
    // authCalls.registerCall()
    navigate(pathNames.LOGIN, { replace: true })
  }

  const { handleChange, values, errors, handleSubmit } = useForm(register)

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
          <Typography sx={{ fontSize: 40 }}>Register</Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              flex: 1,
              // border: '2px solid red',
              marginTop: '30px',
            }}
          >
            <TextField
              sx={{
                marginBottom: '20px',
                width: '50%',
                height: '50px',
                borderRadius: '6px',
              }}
              id="outlined-basic"
              label=" First Name"
              variant="outlined"
              name="firstName"
              onChange={handleChange}
              defaultValue={values?.firstName}
            />

            <TextField
              sx={{
                marginBottom: '20px',
                width: '50%',
                height: '50px',
                borderRadius: '6px',
                marginLeft: '20px',
              }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name="lastName"
              onChange={handleChange}
              defaultValue={values?.lastName}
            />
          </Box>

          <TextField
            sx={{
              marginBottom: '20px',
              width: '100%',
              height: '50px',
              borderRadius: '6px',
              marginTop: '10px',
            }}
            id="outlined-basic"
            variant="outlined"
            label={'Work Email ID'}
            name="email"
            onChange={handleChange}
            defaultValue={values?.email}
          />

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              flex: 1,
              marginTop: '10px',
              // border: '2px solid red',
            }}
          >
            <TextField
              sx={{
                marginBottom: '20px',
                width: '30%',
                height: '50px',
                borderRadius: '6px',
              }}
              id="outlined-basic"
              label="Country Code"
              variant="outlined"
              name={'countryCode'}
              onChange={handleChange}
              defaultValue={values?.countryCode}
            />
            <TextField
              sx={{
                marginBottom: '20px',
                width: '70%',
                height: '50px',
                borderRadius: '6px',
                marginLeft: '20px',
              }}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              onChange={handleChange}
              defaultValue={values?.phoneNumber}
            />
          </Box>

          <TextField
            sx={{
              marginBottom: '20px',
              width: '100%',
              height: '50px',
              borderRadius: '6px',
              marginTop: '10px',
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleChange}
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
          />

          <CCButton
            type="submit"
            sx={{
              width: '100%',
              height: '50px',
              borderRadius: '6px',
              marginTop: '30px',
            }}
            variant="contained"
          >
            Register
          </CCButton>
          <Typography
            sx={{
              marginTop: '20px',
              marginBottom: '15px',
              textAlign: 'center',
              fontWeight: '700px',
            }}
          >
            Already have an account?
          </Typography>
          <CCButton
            onClick={() => navigate(pathNames.LOGIN)}
            sx={{
              width: '100%',
              height: '50px',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: 'darkPrimary1.main',
              border: '2px solid',
              borderColor: 'darkPrimary1.main',
            }}
            variant="outlined"
          >
            Login
          </CCButton>
        </Box>
      </Grid>
      <Grid
        item
        xl={7}
        lg={7}
        md={7}
        sx={{
          display: {
            sm: 'none',
            lg: 'flex',
            md: 'flex',
            xl: 'flex',
            xs: 'none',
          },
          height: '100%',
          backgroundColor: 'disable.main',
          flex: 1,
        }}
      />
    </Grid>
  )
}

export default RegisterPage
