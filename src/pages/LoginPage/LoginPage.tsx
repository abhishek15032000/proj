// React Imports
import React, { useState } from 'react'

// MUI Components
import {
    Box,
    Button,
    Container,
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
        <Container maxWidth="xl" sx={{ display: 'flex' }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    flex: 2,
                    // border: '2px solid red',
                    height: window.innerHeight,
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: 40, marginBottom: '32px' }}>
                        Login
                    </Typography>

                    <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
                        Email ID
                    </Typography>

                    <TextField
                        sx={{
                            marginBottom: '40px',
                            width: '400px',
                            height: '50px',
                            borderRadius: '6px',
                        }}
                        id="outlined-basic"
                        // label="Outlined"
                        variant="outlined"
                    />
                    
                    <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
                        Password
                    </Typography>

                    <TextField
                        sx={{
                            marginBottom: '16px',
                            width: '400px',
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
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : (
                                        <VisibilityIcon
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
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
                        sx={{
                            width: '400px',
                            height: '50px',
                            borderRadius: '6px',
                            marginTop: '64px',
                        }}
                        variant="contained"
                    >
                        Login
                    </Button>

                    <Typography
                        sx={{ marginTop: '40px', marginBottom: '15px' }}
                    >
                        Don’t have an account yet?
                    </Typography>
                    <Button
                        sx={{
                            width: '400px',
                            height: '50px',
                            borderRadius: '6px',
                        }}
                        variant="outlined"
                    >
                        Register
                    </Button>
                </Box>
            </Box>
            <Box
                component="img"
                src="https://wiki.dave.eu/images/4/47/Placeholder.png"
                sx={{
                    flex: 3,
                    // border: '2px solid red',
                    height: window.innerHeight,
                }}
            ></Box>
        </Container>
    )
}

export default Login
