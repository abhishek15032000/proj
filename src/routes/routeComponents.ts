import { ROLES } from '../config/roles.config'
import DashboardPage from '../pages/DashboardPage/DashboardPage'
import IssuanceDataCollection from '../pages/IssuanceDataCollection'
import MaintenancePage from '../pages/MaintenancePage'
import MarketplaceHome from '../pages/MarketplaceHome'
import ProfileDetailsIssuanceInfo from '../pages/ProfileDetailsIssuanceInfo'
import SelectVerifier from '../pages/Issuer/SelectVerifierPage/SelectVerifier'
import ProjectsPage from '../pages/Issuer/ProjectsPage/ProjectsPage'
import ProjectList from '../pages/ProjectList'
import ListNewProject from '../pages/ListNewProject'

import LogoutPage from '../pages/LogoutPage'

import Onboarding from '../pages/Onboarding'

import { linkLabels, pathNames } from './pathNames'
import MarketplaceProjectDetails from '../pages/MarketplaceProjectDetails'
import SeeAllProject from '../pages/SeeAllProjects/SeeAllProjects'
import VerifierDashboard from '../pages/VerifierDashboard'
import VerifierProfileSetup from '../pages/VerifierProfileSetup'
import VerifierProjects from '../pages/VerifierProjects'
import VerifierProjectsList from '../pages/VerifierProjectsList'
import VerifierProjectDetails from '../pages/VerifierProjectDetails'

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    // component: DashboardPage,
    component: ProjectsPage,

    sidebarName: linkLabels.Dashboard,
    roles: [ROLES.ISSUER],
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
    path: pathNames.MARKETPLACE_PROJECT_DETAILS,
    component: MarketplaceProjectDetails,
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
    path: pathNames.SEE_ALL_PROJECTS,
    component: SeeAllProject,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.LIST_NEW_PROJECT,
    component: ListNewProject,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.SEE_ALL_PROJECTS,
    component: SeeAllProject,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
    component: ProfileDetailsIssuanceInfo,
    roles: [ROLES.ISSUER],
  },

  {
    path: pathNames.LOGOUT,
    component: LogoutPage,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.SELECT_VERIFIER,
    component: SelectVerifier,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_DASHBOARD,
    component: VerifierDashboard,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_PROFILE_SETUP,
    component: VerifierProfileSetup,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS,
    component: VerifierProjects,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS_LIST,
    component: VerifierProjectsList,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS_DETAILS,
    component: VerifierProjectDetails,
    roles: [ROLES.ISSUER],
  },
]
