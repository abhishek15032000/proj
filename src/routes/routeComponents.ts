import { ROLES } from '../config/roles.config'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import IssuanceDataCollection from '../pages/IssuanceDataCollection'
import MaintenancePage from '../pages/MaintenancePage'
import MarketplaceHome from '../pages/MarketplaceHome'
import ProfileDetailsIssuanceInfo from '../pages/ProfileDetailsIssuanceInfo'

import ProjectsPage from '../pages/Issuer/ProjectsPage/ProjectsPage'
import ProjectList from '../pages/ProjectList'
import ListNewProject from '../pages/ListNewProject'
import Onboarding from '../pages/Onboarding'
import LogoutPage from '../pages/LogoutPage'
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
    path: pathNames.PROJECTS,
    component: ProjectsPage,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.PROJECTS_LIST,
    component: ProjectList,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.LIST_NEW_PROJECT,
    component: ListNewProject,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.LOGOUT,
    component: LogoutPage,
    roles: [ROLES.ISSUER],
  },
]
