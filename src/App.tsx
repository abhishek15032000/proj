import { Box, Toolbar } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import './App.css'
import AppDrawer from './components/Appbar/Drawer/AppDrawer'
import LoaderOverlay from './components/LoderOverlay'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { loginAction } from './redux/Slices/authSlice'
import RouteController from './routes/RouteController'
import { getLocalItem } from './utils/Storage'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Toaster } from 'react-hot-toast'
import { Colors } from './theme'
import { shallowEqual } from 'react-redux'
import { useIdleTimer } from 'react-idle-timer'
import { useLocation, useNavigate } from 'react-router-dom'
import { pathNames } from './routes/pathNames'

let isExempt = false

type AppProps = {
  appName?: string
}

const App: FC<AppProps> = () => {
  const navigate = useNavigate()
  const localloggedIn = getLocalItem('loggedIn')
  const location = useLocation()

  // List of pages exempt from side menu
  const drawerExemptList = [pathNames.VERIFIER_VERIFY_REPORT]

  let count = 0

  drawerExemptList.map((item) => {
    if (item === location.pathname) {
      count++
    }
  })

  if (count > 0) {
    isExempt = true
  } else {
    isExempt = false
  }

  const onPrompt = () => {
    // Fire a Modal Prompt
  }

  const onIdle = () => {
    if (localloggedIn) {
      // alert("idle ho bhai");
      navigate(pathNames.LOGOUT, { replace: true })
    }
    // Close Modal Prompt
    // Do some idle action like log out your user
  }

  const onActive = (event: any) => {
    // Close Modal Prompt
    // Do some active action
  }

  const onAction = (event: any) => {
    // Do something when a user triggers a watched event
  }

  const {
    start,
    reset,
    pause,
    resume,
    isIdle,
    isPrompted,
    getRemainingTime,
    getElapsedTime,
    getLastIdleTime,
    getLastActiveTime,
    getTotalIdleTime,
    getTotalActiveTime,
  } = useIdleTimer({
    onPrompt,
    onIdle,
    onActive,
    onAction,
    timeout: 1000 * 60 * 15,
    promptTimeout: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange',
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  })

  const dispatch = useAppDispatch()
  const getloginStatusFromLocalStorage = getLocalItem('userDetails')

  const userData = useAppSelector((state) => state.auth.loggedIn, shallowEqual)
  const [waitingAccessCheck, setWatingAccessCheck] = useState<any>(true)

  useEffect(() => {
    //const getloginStatusFromLocalStorage = getLocalItem('loggedIn')
    try {
      if (getloginStatusFromLocalStorage) {
        dispatch(loginAction(getloginStatusFromLocalStorage))
      }
    } catch (e) {
      //todo
    } finally {
      setWatingAccessCheck(false)
    }
  }, [])

  return waitingAccessCheck ? (
    <LoaderOverlay show />
  ) : (
    <>
      {/* For using mui DatePicker */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {userData && !isExempt && (
          <AppDrawer>
            <RouteController />
          </AppDrawer>
        )}
        {userData && isExempt && (
          // <AppDrawer>
          <RouteController />
          // </AppDrawer>
        )}
        {!userData && (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // p: 3,
              // width: { sm: `calc(100% - ${240}px)` },
            }}
          >
            {userData && <Toolbar />}
            <RouteController />
          </Box>
        )}
      </LocalizationProvider>
    </>
  )
}

export default App
