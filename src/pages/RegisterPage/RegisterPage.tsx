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

const RegisterPage = (props: RegisterPageProps) => {
  const [showPassword, setShowPassword] = useState(true)
  return (
    <Grid
      container
      flexDirection="row"
      xs={12}
      height={'100vh'}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
        <Box sx={{ padding: '0 50px' }}>
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
            label={'  Work Email ID'}
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
            type="password"
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

          <Button
            sx={{
              width: '100%',
              height: '50px',
              borderRadius: '6px',
              marginTop: '30px',
            }}
            variant="contained"
          >
            Register
          </Button>
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
          <Button
            sx={{
              width: '100%',
              height: '50px',
              borderRadius: '6px',
            }}
            variant="outlined"
          >
            Login
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xl={7}
        lg={7}
        md={7}
        display={{
          sm: 'none',
          lg: 'block',
          md: 'block',
          xl: 'block',
          xs: 'none',
        }}
      />
    </Grid>
  )
}

export default RegisterPage
