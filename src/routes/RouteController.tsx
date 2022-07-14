import _ from 'lodash'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import AccessDeniedPage from '../pages/AccessDeniedPage/AccessDeniedPage'
import AccountCreatedPage from '../pages/AccountCreatedPage/AccountCreatedPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import TwoFaPage from '../pages/TwoFa/TwoFaPage'
import { pathNames } from './pathNames'
import { privateRouteComponents } from './routeComponents'

const RouteController = ({ localLoggedIn }: any) => {
    const userData = useAppSelector((state: any) => state.auth.data)

    return (
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
            <Route
                path={pathNames.LOGIN}
                element={
                    <PublicRoute
                        roles={[]}
                        component={LoginPage}
                        authenticated={userData}
                        userData={userData}
                    />
                }
            />
            <Route
                path={pathNames.REGISTER}
                element={
                    <PublicRoute
                        roles={[]}
                        component={RegisterPage}
                        authenticated={userData}
                        userData={userData}
                    />
                }
            />
            <Route
                path={pathNames.TWOFA}
                element={
                    <PublicRoute
                        roles={[]}
                        component={TwoFaPage}
                        authenticated={userData}
                        userData={userData}
                    />
                }
            />
            {/*<Route
                path={pathNames.ACCOUNTCREATEDPAGE}
                element={
                    <PublicRoute
                        roles={[]}
                        component={AccountCreatedPage}
                        authenticated={userData}
                        userData={userData}
                    />
                }
            />*/}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
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

//* PRIVATE ComponentType

type PublicRouteProps = {
    component: React.ComponentType
    path?: string
    roles: string[]
    authenticated: boolean
    userData: any
}

const PublicRoute = ({
    component: RouteComponent,
    authenticated,
    roles,
    userData,
}: Props) => {
    const isAuthenticated = authenticated
    const userRoles = userData?.roles

    const userHasRequiredRole =
        _.intersectionWith(userRoles, roles, _.isEqual).length > 0

    if (!isAuthenticated) {
        return <RouteComponent />
    }

    return <Navigate to={pathNames.DASHBOARD} />
}

export default RouteController
