import { Provider } from "react-redux";
import store from "@/context/store";
import Layout from "./Layout";
import "../styles/app.sass";
import ServerProvider from "@/server/server";
import AuthProvider from "@/context/auth";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { styletron } from "../styletron";
export default function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <ServerProvider>
        <AuthProvider>
          <StyletronProvider value={styletron}>
            <BaseProvider theme={LightTheme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </BaseProvider>
          </StyletronProvider>
        </AuthProvider>
      </ServerProvider>
    </Provider>
  );
}
