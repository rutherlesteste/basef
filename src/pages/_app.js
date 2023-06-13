import { Provider } from "react-redux";
import store from "@/context/store";
import Layout from "./Layout";
import "../styles/app.sass";
import ServerProvider from "@/server/server";
import AuthProvider from "@/context/auth";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from 'react'
export default function App(props) {
  
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const muiTheme = createTheme();

  return (
    <Provider store={store}>
      <ServerProvider>
        <AuthProvider>
          <StyletronProvider value={styletron}>
            <BaseProvider theme={LightTheme}>
            <ThemeProvider theme={muiTheme}>
        <CssBaseline />
              
                <Component {...pageProps} />
      
              
              </ThemeProvider>
            </BaseProvider>
          </StyletronProvider>
        </AuthProvider>
      </ServerProvider>
    </Provider>
  );
}
