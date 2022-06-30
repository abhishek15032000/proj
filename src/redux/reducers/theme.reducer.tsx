import { ThemeOptions } from "@mui/material";
import { TYPES } from "../constants";

const initThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['"Poppins"'].join(","),
  },
  palette: {
    primary: {
      light: "#fff",
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#30c77e",
    },
    success: {
      main: "#2a0d2b",
    },
  },
};

const theme = (state = initThemeOptions, action: any) => {
  switch (action.type) {
    case TYPES.THEME.PALLETTE:
      state = {
        ...state,
        palette: action.payload,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default theme;
