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

  const loader = () => {
    return true
    if (window.self == window.top) {
      // Everything checks out, show the page.
      // document.documentElement.style.display = "block";
      return true
    } else {
      // Break out of the frame.
      // window.top.location = window.self.location;
      return false
    }
  }

  return loader() ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  ) : (
    <></>
  )
}

export default Main
