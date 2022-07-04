import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import { pathNames } from './pathNames'
import { privateRouteComponents } from './routeComponents'
import AccessDeniedPage from '../pages/AccessDeniedPage/AccessDeniedPage'
import _ from 'lodash'
import { useAppSelector } from '../hooks/reduxHooks'

const RouteController = () => {
    const userData = useAppSelector((state: any) => state.auth.data)
    console.log(
        '🚀 ~ file: RouteController.tsx ~ line 11 ~ RouteController ~ userData',
        userData
    )

    return (
        <BrowserRouter>
            <Routes>
                {privateRouteComponents.map((route: any) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <PrivateRoute
                                roles={route.roles}
                                component={route.component}
                                authenticated={userData}
                                userData={userData}
                            />
                        }
                    />
                ))}
                <Route path={pathNames.LOGIN} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

//* PRIVATE ComponentType

type Props = {
    component: React.ComponentType
    path?: string
    roles: string[]
    authenticated: boolean
    userData: any
}

const PrivateRoute = ({
    component: RouteComponent,
    authenticated,
    roles,
    userData,
}: Props) => {
    const isAuthenticated = authenticated
    const userRoles = userData?.roles

    const userHasRequiredRole =
        _.intersectionWith(userRoles, roles, _.isEqual).length > 0
    console.log(
        '🚀 ~ file: RouteController.tsx ~ line 27 ~ RouteController ~ userHasRequiredRole',
        userHasRequiredRole
    )

    if (isAuthenticated && userHasRequiredRole) {
        return <RouteComponent />
    }

    if (isAuthenticated && !userHasRequiredRole) {
        return <AccessDeniedPage />
    }

    return <Navigate to={pathNames.LOGIN} />
}

export default RouteController
