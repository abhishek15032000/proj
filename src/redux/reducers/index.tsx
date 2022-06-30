import { combineReducers } from "redux";
// import todos from "./todos";
import auth from "./auth.reducer";
import theme from "./theme.reducer";

// TODO: rename names
export default combineReducers({
  auth,
  theme,
});
