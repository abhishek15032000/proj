// import { constant } from "lodash";
// import { combineReducers } from "redux";
// import todos from "./todos";
import app from './appSlice'
import auth from './authSlice'
import theme from './themeSlice'
import issuanceDataCollection from './issuanceDataCollection'
import newProject from './newProjectSlice'
import sectionB from './sectionBSlice'
import sectionC from './sectionCSlice'
import sectionA from './sectionASlice'
import sectionD from './sectionDSlice'
import wallet from './walletSlice'
import sectionE from './sectionESlice'
import MonthlyReportUpdate from './MonthlyReportUpdate'
import selectDate from './SelectDateSlice'
import sectionAMonthly from './MonthlyReport/sectionAMonthly'
import sectionBMonthly from './MonthlyReport/sectionBMonthly'
import sectionCMonthly from './MonthlyReport/sectionCMonthly'
import sectionDMonthly from './MonthlyReport/sectionDMonthly'
import sectionEMonthly from './MonthlyReport/sectionEMonthly'
import verifier from './verifierSlice'
import reportsViewComments from './reportsViewCommentsSlice'
import marketplace from './Marketplace/marketplaceSlice'
import tokenRetire from './tokenRetireSlice'
import issuanceDataCollectionHelp from './issuanceDataCollectionHelpSlice'
import allBankDetailsSlice from './allBankDetailsSlice'
import marketDepth from './Marketplace/marketDepthSlice'
import marketplaceSellFlow from './Marketplace/marketplaceSellFlowSlice'
import marketplaceBuyFlow from './Marketplace/marketplaceBuyFlowSlice'
import marketplaceWithdrawFlow from './Marketplace/marketplaceWithdrawFlowSlice'
import profileCompletion from './profileCompletionSlice'
import registry from './registrySlice'
import comments from './commentsSlice'
import traceability from './traceabilitySlice'
import newMarketplaceReducer from './newMarketplaceSlice'
import caching from './cachingSlice'
import dashboard from './Dashboard/dashboardSlice'
import marketPlaceFiltersDrawer from './marketPlaceFiltersDrawerSlice'
import pdfPage from './pdfSlice'
import marketplaceCaching from './marketPlaceCachingSlice'
import allProjectsCaching from './allProjectsCachingSlice'
import allProjectsFiltersSlice from './allProjectsFiltersSlice'
import blockchainStatusModal from './blockchainStatusModalSlice'

// TODO: rename names
export default {
  app,
  auth,
  theme,
  issuanceDataCollection,
  newProject,
  sectionB,
  sectionC,
  wallet,
  sectionA,
  sectionD,
  sectionE,
  MonthlyReportUpdate,
  selectDate,
  sectionAMonthly,
  sectionBMonthly,
  sectionCMonthly,
  sectionDMonthly,
  sectionEMonthly,
  verifier,
  reportsViewComments,
  marketplace,
  tokenRetire,
  issuanceDataCollectionHelp,
  allBankDetailsSlice,
  marketDepth,
  marketplaceSellFlow,
  marketplaceBuyFlow,
  marketplaceWithdrawFlow,
  profileCompletion,
  registry,
  comments,
  traceability,
  newMarketplaceReducer,
  caching,
  dashboard,
  marketPlaceFiltersDrawer,
  pdfPage,
  marketplaceCaching,
  allProjectsCaching,
  allProjectsFiltersSlice,
  blockchainStatusModal,
}
