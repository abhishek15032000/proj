
import { ROLES } from "../config/roles.config";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import { pathNames } from "./pathNames";

export const privateRouteComponents = [
    {
        path: pathNames.DASHBOARD,
        component: Dashboard,
        exact: true,
        // sidebarName: linkLabels.DASHBOARD,
        roles: [
          ROLES.ISSUER,

        ],
      },
    
]