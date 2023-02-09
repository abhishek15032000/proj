import { ROLES } from '../config/constants.config'
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

import Onboarding from '../pages/OnboardingOld'

import { linkLabels, pathNames } from './pathNames'
import MarketplaceProjectDetails from '../pages/MarketplaceProjectDetails'
import SeeAllProject from '../pages/SeeAllProjects/SeeAllProjects'
import TokenAndContractPage from '../pages/TokenAndContractPage/TokenAndContractPage'
import VerifierDashboard from '../pages/VerifierDashboard'
import VerifierProfileSetup from '../pages/VerifierProfileSetup'
import VerifierProjects from '../pages/VerifierProjects'
import MonthlyReportUpdate from '../pages/MonthlyReportUpdate'
import VerifierProjectsList from '../pages/VerifierProjectsList'
import VerifierProjectDetails from '../pages/VerifierProjectDetails'
import VerifierVerifyReport from '../pages/VerifierVerifyReport'
import IssuerWallet from '../pages/IssuerWallet'
import TransactionHistory from '../pages/TransactionHistory'
import ReportsViewCommentsPage from '../pages/ReportsViewCommentsPage/ReportsViewCommentsPage'
import BuyerOnboarding from '../pages/BuyerOnboarding'
import OrganisationalDetails from '../pages/OrganisationalDetails'
import RetireTokens from '../pages/RetireTokens'
import TokenRetirementPage from '../pages/TokenRetirementPage/TokenRetirementPage'
import BankDetails from '../pages/BankDetails'
import IssuanceDataCollectionHelp from '../pages/IssuanceDataCollectionHelp/IssuanceDataCollectionHelp'
import Profile from '../pages/Profile'
import HelpCentre from '../pages/HelpCentre/HelpCentre'
import ProjectDetails from '../pages/ProjectDetails'
import ProjectListsWithFilter from '../pages/ProjectListsWithFilter/ProjectListsWithFilter'
import ProjectDetailsRegistryAcc from '../pages/ProjectDetailsRegistryAcc/ProjectDetailsRegistryAcc'
import RegistryReviewReport from '../pages/RegistryReviewReport/RegistryReviewReport'
import RegistryAllProjects from '../pages/RegistryAllProjects/RegistryAllProjects'
import CompleteProfile from '../pages/CompleteProfile/CompleteProfile'
import ReviewAndComment from '../pages/ReviewAndComment/ReviewAndComment'
import Wallet from '../pages/Wallet'
import RiskDashboard from '../pages/RiskDashboard'
import Marketplace from '../pages/Marketplace/Marketplace'
import ProjectPage from '../pages/ProjectPage'

export const privateRouteComponents = [
  {
    path: pathNames.DASHBOARD,
    //component: DashboardPage,
    component: ProjectsPage,

    sidebarName: linkLabels.Dashboard,
    roles: [ROLES.ISSUER, ROLES.VERIFIER, ROLES.BUYER, ROLES.REGISTRY],
  },
  {
    path: pathNames.TOKEN_CONTRACT,
    component: TokenAndContractPage,
    sidebarName: linkLabels.Token_Contract,
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
    path: pathNames.ISSUANCE_DATA_COLLECTION_HELP,
    component: IssuanceDataCollectionHelp,
    roles: [ROLES.ISSUER, ROLES.REGISTRY],
  },
  {
    path: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
    component: ProfileDetailsIssuanceInfo,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.MARKETPLACE_OLD,
    component: MarketplaceHome,
    // sidebarName: linkLabels.Marketplace,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.MARKETPLACE,
    component: Marketplace,
    // sidebarName: linkLabels.Marketplace,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.PROJECT_LISTS_WITH_FILTER,
    component: ProjectListsWithFilter,
    sidebarName: linkLabels.Marketplace,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.MARKETPLACE_PROJECT_DETAILS,
    component: MarketplaceProjectDetails,
    roles: [ROLES.ISSUER],
  },
  // {
  //   path: pathNames.PROJECTS,
  //   component: ProjectsPage,
  //   roles: [ROLES.ISSUER],
  // },
  {
    path: pathNames.PROJECTS_LIST,
    component: ProjectList,
    roles: [ROLES.ISSUER],
  },
  // {
  //   path: pathNames.SEE_ALL_PROJECTS,
  //   component: SeeAllProject,
  //   roles: [ROLES.ISSUER],
  //   sidebarName: linkLabels.Projects,
  // },
  {
    path: pathNames.LIST_NEW_PROJECT,
    component: ListNewProject,
    roles: [ROLES.ISSUER],
  },
  // {
  //   path: pathNames.REGISTRY_ALL_PROJECTS,
  //   component: RegistryAllProjects,
  //   roles: [ROLES.REGISTRY],
  //   sidebarName: linkLabels.Projects,
  // },
  {
    path: pathNames.PROFILE_DETAILS_ISSUANCE_INFO,
    component: ProfileDetailsIssuanceInfo,
    roles: [ROLES.ISSUER],
  },

  {
    path: pathNames.LOGOUT,
    component: LogoutPage,
    roles: [ROLES.ISSUER, ROLES.VERIFIER, ROLES.BUYER, ROLES.REGISTRY],
  },
  {
    path: pathNames.SELECT_VERIFIER,
    component: SelectVerifier,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.VERIFIER_DASHBOARD,
    component: VerifierDashboard,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROFILE_SETUP,
    component: VerifierProfileSetup,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS,
    component: VerifierProjects,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS_LIST,
    component: VerifierProjectsList,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_PROJECTS_DETAILS,
    component: VerifierProjectDetails,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.VERIFIER_VERIFY_REPORT,
    component: VerifierVerifyReport,
    roles: [ROLES.VERIFIER],
  },
  {
    path: pathNames.ISSUER_WALLET,
    component: IssuerWallet,

    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.TRANSACTION_HISTORY,
    component: TransactionHistory,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.BANK_DETAILS,
    component: BankDetails,
    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
  {
    path: pathNames.MONTHLY_REPORT_UPDATE,
    component: MonthlyReportUpdate,

    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.REPORT_VIEW_COMMENTS,
    component: ReportsViewCommentsPage,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.BUYER_ONBOARDING,
    component: BuyerOnboarding,
    roles: [ROLES.BUYER],
  },
  {
    path: pathNames.ORGANISATIONAL_DETAILS,
    component: OrganisationalDetails,
    roles: [ROLES.BUYER],
  },
  {
    path: pathNames.RETIRE_TOKENS,
    component: RetireTokens,
    roles: [ROLES.BUYER],
  },
  {
    path: pathNames.TOKENS_RETIREMENT,
    sidebarName: linkLabels.TokenRetirement,
    component: TokenRetirementPage,
    roles: [ROLES.BUYER],
  },

  {
    path: pathNames.PROFILE,
    component: Profile,
    roles: [ROLES.ISSUER, ROLES.VERIFIER, ROLES.BUYER, ROLES.REGISTRY],
  },
  {
    path: pathNames.HELP_CENTER,
    component: HelpCentre,
    roles: [ROLES.ISSUER],
  },
  {
    path: pathNames.PROJECT_DETAILS,
    component: ProjectDetails,
    roles: [ROLES.ISSUER, ROLES.REGISTRY],
  },
  {
    path: pathNames.PROJECT_DETAILS_REGISTRY_ACC,
    component: ProjectDetailsRegistryAcc,
    roles: [ROLES.REGISTRY, ROLES.VERIFIER],
  },
  {
    path: pathNames.REGISTRY_REVIEW_REPORT,
    component: RegistryReviewReport,
    roles: [ROLES.REGISTRY, ROLES.VERIFIER],
  },
  {
    path: pathNames.PROJECTS,
    component: ProjectPage,
    roles: [ROLES.REGISTRY, ROLES.ISSUER],
    sidebarName: linkLabels.Projects,
  },
  {
    path: pathNames.COMPLETE_PROFILE,
    component: CompleteProfile,
    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  {
    path: pathNames.MARKETPLACE_V2,
    component: ProjectListsWithFilter,
    // component: MarketplaceV2,
    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  {
    path: pathNames.REVIEW_AND_COMMENT,
    component: ReviewAndComment,
    roles: [ROLES.VERIFIER, ROLES.ISSUER],
  },
  {
    path: pathNames.WALLET,
    component: Wallet,
    sidebarName: linkLabels.Wallet,
    roles: [ROLES.ISSUER, ROLES.BUYER, ROLES.VERIFIER, ROLES.REGISTRY],
  },
  {
    path: pathNames.RISK_DASHBOARD,
    component: RiskDashboard,

    roles: [ROLES.ISSUER, ROLES.BUYER],
  },
]
