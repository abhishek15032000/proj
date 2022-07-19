import React, { useState } from 'react'
import { RegisterPageProps } from './RegisterPage.interface'

import {
    Box,
    Button,
    Container,
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
        <Container maxWidth="xl" sx={{ display: 'flex' }}>
            <Grid item xl={5} lg={5} md={6} sm={12} xs={12}>
                <Box sx={{ marginRight: '20px' }}>
                    <Typography sx={{ fontSize: 40 }}>Register</Typography>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            flex: 1,
                            // border: '2px solid red',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 14,
                                marginBottom: '4px',
                                width: '190px',
                            }}
                        >
                            First Name
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 14,
                                marginBottom: '4px',
                                width: '190px',
                                marginRight: '5px',
                            }}
                        >
                            Last Name
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        sx={{
                            flex: 1,
                            // border: '2px solid red',
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
                            // label="Outlined"
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
                            // label="Outlined"
                            variant="outlined"
                        />
                    </Box>
                    <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
                        Work Email ID
                    </Typography>
                    <TextField
                        sx={{
                            marginBottom: '20px',
                            width: '100%',
                            height: '50px',
                            borderRadius: '6px',
                        }}
                        id="outlined-basic"
                        variant="outlined"
                    />
                    <Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                flex: 1,
                                // border: '2px solid red',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    marginBottom: '4px',
                                    width: '100px',
                                }}
                            >
                                Country Code
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    marginBottom: '4px',
                                    width: '280px',
                                    marginLeft: '40px',
                                }}
                            >
                                Phone Number
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            sx={{
                                flex: 1,
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
                                // label="Outlined"
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
                                // label="Outlined"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Typography sx={{ fontSize: 14, marginBottom: '4px' }}>
                        Password
                    </Typography>
                    <TextField
                        sx={{
                            marginBottom: '20px',
                            width: '100%',
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
                md={6}
                display={{
                    sm: 'none',
                    lg: 'block',
                    md: 'block',
                    xl: 'block',
                    xs: 'none',
                }}
            />
        </Container>
    )
}

export default RegisterPage
