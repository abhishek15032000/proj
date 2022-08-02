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
import CCInputField from '../../atoms/CCInputField'
import CCSelectBox from '../../atoms/CCSelectBox'
import Logo from '../../atoms/Logo'
import { Images } from '../../theme'

const RegisterPage = (props: RegisterPageProps) => {
  const [number, setNumber] = useState<number>()

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
    <Grid container flexDirection="row" xs={12} height={'100vh'}>
      <Grid
        item
        lg={6}
        xs={12}
        display="flex"
        flexDirection="column"
        sx={{
          marginTop: 18,
          width: '100%',
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
          <Logo />
          <Typography
            sx={{ fontWeight: '700', fontSize: 32, mt: 8, color: '#1C4A43' }}
          >
            Register
          </Typography>
          <Typography sx={{ fontWeight: '500', fontSize: 16, mt: 1, mb: 5 }}>
            Register by providing the information below
          </Typography>
          <Grid
            container
            sx={{
              mt: '4px',
            }}
            xs={12}
            rowSpacing={3}
            columnSpacing={3}
            flexDirection="row"
          >
            <Grid item xs={12} lg={6}>
              <CCInputField
                label=" First Name"
                variant="filled"
                name="firstName"
                onChange={handleChange}
                defaultValue={values?.firstName}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CCInputField
                label="Last Name"
                variant="filled"
                name="lastName"
                onChange={handleChange}
                defaultValue={values?.lastName}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              mt: '4px',
            }}
            xs={12}
            rowSpacing={3}
            columnSpacing={3}
            flexDirection="row"
          >
            <Grid item xs={12}>
              <CCInputField
                variant="filled"
                label={'Work Email ID'}
                name="email"
                onChange={handleChange}
                defaultValue={values?.email}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              mt: '4px',
            }}
            xs={12}
            rowSpacing={3}
            columnSpacing={3}
            flexDirection="row"
          >
            <Grid item xs={12} lg={6}>
              <CCSelectBox
                variant="filled"
                sx={{ width: '100%' }}
                // label="Country Code"
                name="country_code"
                onChange={handleChange}
                value={'+91'}
                autoWidth={false}
                items={[{ label: '+91', value: '+91' }]}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CCInputField
                label="Phone Number"
                variant="filled"
                onChange={handleChange}
                defaultValue={values?.phoneNumber}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              mt: '4px',
            }}
            xs={12}
            rowSpacing={3}
            columnSpacing={3}
            flexDirection="row"
          >
            <Grid item xs={12}>
              <CCInputField
                label="Password"
                variant="filled"
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
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              mt: '4px',
            }}
            xs={12}
            rowSpacing={3}
            columnSpacing={3}
            flexDirection="row"
          >
            <Grid item xs={12}>
              <CCButton
                fullWidth
                type="submit"
                sx={{
                  height: '50px',
                  borderRadius: '6px',
                  marginTop: 7,
                }}
                variant="contained"
              >
                Register
              </CCButton>
            </Grid>
          </Grid>

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
              {`Already have an account?`}
            </Typography>
            <Typography
              onClick={() => navigate(pathNames.LOGIN)}
              sx={{
                fontWeight: '500',
                fontSize: 20,
                px: 1,
                pt: 0.5,
                cursor: 'pointer',
              }}
            >
              {' '}
              Login{' '}
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
          height: '100%',
          backgroundImage: `url(${Images.illustration1})`,
          flex: 1,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-y',
        }}
      />
    </Grid>
  )
}

export default RegisterPage
