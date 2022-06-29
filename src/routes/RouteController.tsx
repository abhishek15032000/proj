import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";

import { pathNames } from "./pathNames";
import { privateRouteComponents } from "./routeComponents";
import { useSelector } from "react-redux";

const RouteController = () => {
  const userData = useSelector((state: any) => state.auth.data);

  interface Props {
    component: React.ComponentType;
    path?: string;
    roles: any[];
    authenticated: boolean;
  }

  const PrivateRoute: React.FC<Props> = ({
    component: RouteComponent,
    authenticated,
  }) => {
    const isAuthenticated = authenticated;
    const userHasRequiredRole = authenticated ? true : false;

    if (isAuthenticated && userHasRequiredRole) {
      return <RouteComponent />;
    }

    // if (isAuthenticated && !userHasRequiredRole) {
    //   return <AccessDenied />
    // }

    return <Navigate to={pathNames.LOGIN} />;
  };

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
              />
            }
          />
        ))}
        <Route path={pathNames.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteController;
