
import { ROLES } from "../config/roles.config";
import Dashboard from "../pages/Dashboard/Dashboard";

import { pathNames } from "./pathNames";

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    component: Dashboard,

    // sidebarName: linkLabels.DASHBOARD,
    roles: [
      ROLES.ISSUER,

    ],
  },



]