// import { constant } from "lodash";
// import { combineReducers } from "redux";
// import todos from "./todos";
import auth from "./authSlice";
import theme from "./themeSlice";
import issuanceDataCollection from "./issuanceDataCollection";
import newProject from "./newProjectSlice";
import wallet from './walletSlice'
import sectionB from './sectionBSlice'
import sectionC from "./sectionCSlice";

// TODO: rename names
export default {
    auth,
    theme,
    issuanceDataCollection,
    newProject,
    sectionB,
    sectionC, wallet
} 
