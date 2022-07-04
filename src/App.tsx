import React, { FC } from 'react'
import './App.css'
import RouteController from './routes/RouteController'
type AppProps = {
    appName?: string
}
const App: FC<AppProps> = () => {
    return <RouteController />
}

export default App
