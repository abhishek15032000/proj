// import { constant } from "lodash";
// import { combineReducers } from "redux";
// import todos from "./todos";
import auth from './authSlice'
import theme from './themeSlice'
import issuanceDataCollection from './issuanceDataCollection'
import newProject from './newProjectSlice'
import wallet from './walletSlice'

// TODO: rename names
export default {
  auth,
  theme,
  issuanceDataCollection,
  newProject,
  wallet,
}
