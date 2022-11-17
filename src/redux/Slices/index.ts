// import { constant } from "lodash";
// import { combineReducers } from "redux";
// import todos from "./todos";
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

// TODO: rename names
export default {
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
}
