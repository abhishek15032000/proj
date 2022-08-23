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
}
