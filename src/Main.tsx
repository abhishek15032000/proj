import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { shallowEqual } from 'react-redux'
import App from './App'
import { useAppSelector } from './hooks/reduxHooks'

interface Props {}

const Main = (props: Props) => {
    const themeOptions = useAppSelector(
        ({ theme }: { theme: any }) => theme,
        shallowEqual
    )

    const theme = createTheme(themeOptions)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    )
}

export default Main
