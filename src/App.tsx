import React, { FC } from "react";
import "./App.css";
import RouteController from "./routes/RouteController";
interface AppProps {
  appName?: string;
}
const App: FC<AppProps> = () => {
  return <RouteController />;
};

export default App;
