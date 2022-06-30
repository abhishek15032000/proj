import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import { pathNames } from "./pathNames";
import { privateRouteComponents } from "./routeComponents";
import { useSelector } from "react-redux";
import AccessDenied from "../pages/AccessDenied/AccessDenied";
import _ from "lodash";

const RouteController = () => {
  const userData = useSelector((state: any) => state.auth.data);
  console.log(
    "🚀 ~ file: RouteController.tsx ~ line 11 ~ RouteController ~ userData",
    userData
  );

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
        <Route path={pathNames.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

interface Props {
  component: React.ComponentType;
  path?: string;
  roles: any[];
  authenticated: boolean;
  userData: any;
}

const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  authenticated,
  roles,
  userData,
}) => {
  const isAuthenticated = authenticated;
  let userRoles = userData?.roles;

  const userHasRequiredRole =
    _.intersectionWith(userRoles, roles, _.isEqual).length > 0;
  console.log(
    "🚀 ~ file: RouteController.tsx ~ line 27 ~ RouteController ~ userHasRequiredRole",
    userHasRequiredRole
  );

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Navigate to={pathNames.LOGIN} />;
};

export default RouteController;
