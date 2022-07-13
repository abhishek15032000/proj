import { Box, Toolbar } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import './App.css'
import AppDrawer from './components/Appbar/Drawer/AppDrawer'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { loginAction } from './redux/Slices/authSlice'
import RouteController from './routes/RouteController'
import { getLocalItem } from './utils/Storage'
type AppProps = {
    appName?: string
}
const App: FC<AppProps> = () => {
    const [waitingAccessCheck, setWatingAccessCheck] = useState<any>(true)
    const userData = useAppSelector((state) => state.auth.loggedIn)
    const dispatch = useAppDispatch()
    const getloginStatusFromLocalStorage = getLocalItem('loggedIn')

    useEffect(() => {
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

    // useEffect(() => {
    //     console.log('hello')
    // }, [userData])

    return waitingAccessCheck ? (
        <div>loading</div>
    ) : (
        <>
            {getloginStatusFromLocalStorage && (
                <AppDrawer>
                    <RouteController />
                </AppDrawer>
            )}
            {!getloginStatusFromLocalStorage && (
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        // p: 3,
                        // width: { sm: `calc(100% - ${240}px)` },
                    }}
                >
                    {getloginStatusFromLocalStorage && <Toolbar />}
                    <RouteController />
                </Box>
            )}
        </>
    )
}

export default App
