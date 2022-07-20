
import { ROLES } from "../config/roles.config";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import IssuanceDataCollection from "../pages/IssuanceDataCollection";
import MaintenancePage from "../pages/MaintenancePage";
import Onboarding from "../pages/Onboarding";

import { linkLabels, pathNames } from "./pathNames";

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    component: DashboardPage,

    sidebarName: linkLabels.Projects,
    roles: [
      ROLES.ISSUER,

    ],
  },
  {
    path: pathNames.ONBOARDING,
    component: Onboarding,
    roles: [
      ROLES.ISSUER,
    ],
  },
  {
    path: pathNames.ISSUANCE_DATA_COLLECTION,
    component: IssuanceDataCollection,
    roles: [
      ROLES.ISSUER,
    ],
  },
]