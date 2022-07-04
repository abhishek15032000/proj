import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTH_ACTIONS } from '../../redux/actions/auth.action'
import { pathNames } from '../../routes/pathNames'
import useForm from '../../hooks/useForm'

interface Props {}

const Login = (props: Props) => {
    const login = () => {
        dispatch(AUTH_ACTIONS.login({ roles: ['ISSUER'] }))
        navigate(pathNames.DASHBOARD, { replace: true })
    }

    const { handleChange, values, errors, handleSubmit } = useForm(login)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in to Carbon Credit
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            defaultValue={values?.email}
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            error={errors?.email}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            defaultValue={values?.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={errors?.password}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            data-testid={'loginBtn'}
                            // onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                color: 'primary.light',
                                textTransform: 'none',
                            }}
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login
