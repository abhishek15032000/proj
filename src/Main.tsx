import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import App from "./App";

interface Props {}

const Main: React.FC = (props: Props) => {
  const themeOptions = useSelector(
    ({ theme }: { theme: any }) => theme,
    shallowEqual
  );

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default Main;
