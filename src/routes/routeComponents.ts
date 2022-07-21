import { ROLES } from '../config/roles.config'
import AccountCreatedPage from '../pages/AccountCreatedPage/AccountCreatedPage'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import IssuanceDataCollection from '../pages/IssuanceDataCollection'
import LogoutPage from '../pages/LogoutPage'
import MaintenancePage from '../pages/MaintenancePage'
import Onboarding from '../pages/Onboarding'

import { linkLabels, pathNames } from './pathNames'

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    component: DashboardPage,

    sidebarName: linkLabels.Projects,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ACCOUNT_CREATED_PAGE,
    component: AccountCreatedPage,
    //sidebarName: linkLabels.Projects,
    //roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ONBOARDING,
    component: Onboarding,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.ISSUANCE_DATA_COLLECTION,
    component: IssuanceDataCollection,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.LOGOUT,
    component: LogoutPage,
    roles: [ROLES.ISSUER],
  },
]
