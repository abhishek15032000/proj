
import { ROLES } from "../config/roles.config";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import RegisterPage from "../pages/RegisterPage /RegisterPage";

import { pathNames } from "./pathNames";

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    component: DashboardPage,

    // sidebarName: linkLabels.DASHBOARD,
    roles: [
      ROLES.ISSUER,

    ],
  },




]