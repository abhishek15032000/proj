import { ROLES } from '../config/roles.config'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import IssuanceDataCollection from '../pages/IssuanceDataCollection'
import LogoutPage from '../pages/LogoutPage'
import MaintenancePage from '../pages/MaintenancePage'
import MarketplaceHome from '../pages/MarketplaceHome'
import Onboarding from '../pages/Onboarding'
import ProfileDetailsIssuanceInfo from '../pages/ProfileDetailsIssuanceInfo'

import { linkLabels, pathNames } from './pathNames'

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    component: DashboardPage,

    sidebarName: linkLabels.Projects,
    roles: [ROLES.ISSUER],
  },
  //{
  //  path: pathNames.ACCOUNT_CREATED_PAGE,
  //  component: AccountCreatedPage,
  //  sidebarName: linkLabels.Projects,
  //  roles: [ROLES.ISSUER],
  //},
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
    path: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
    component: ProfileDetailsIssuanceInfo,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.MARKETPLACE,
    component: MarketplaceHome,
    roles: [ROLES.ISSUER],
  },

  {
    path: pathNames.LOGOUT,
    component: LogoutPage,
    roles: [ROLES.ISSUER],
  },
]
