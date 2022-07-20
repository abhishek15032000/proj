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

// Local Imports
import { LoginPageInterface } from './LoginPage.interface'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Login = (props: LoginPageInterface) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Grid container>
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
          sx={{
            marginLeft: {
              sm: 0, 
              lg: 11
            },
            marginRight: {
              sm: 0, 
              lg: 18
            },
          }}
        >
          <Typography sx={{ fontSize: 40, marginBottom: '32px' }}>
            Login
          </Typography>

          <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
            Email ID
          </Typography>

          <TextField
            fullWidth
            sx={{
              marginBottom: '40px',
              height: '50px',
              borderRadius: '6px',
            }}
            id="outlined-basic"
            variant="outlined"
          />

          <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
            Password
          </Typography>

          <TextField
            fullWidth
            sx={{
              marginBottom: '16px',
              // width: '90%',
              height: '50px',
              borderRadius: '6px',
            }}
            id="outlined-basic"
            // label="Outlined"
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

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography>Forgot password?</Typography>
          </Box>
          <Button
            fullWidth
            sx={{
              height: '50px',
              borderRadius: '6px',
              marginTop: '64px',
            }}
            variant="contained"
          >
            Login
          </Button>

          <Typography sx={{ marginTop: '40px', marginBottom: '15px' }}>
            Don’t have an account yet?
          </Typography>
          <Button
            fullWidth
            sx={{
              height: '50px',
              borderRadius: '6px',
            }}
            variant="outlined"
          >
            Register
          </Button>
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
        src="https://wiki.dave.eu/images/4/47/Placeholder.png"
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'flex',
          },
          height: window.innerHeight,
        }}
      ></Grid>
    </Grid>
  )
}

export default Login
