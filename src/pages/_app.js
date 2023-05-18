import { Provider } from "react-redux";
import store from "@/context/store";
import Layout from "./Layout";
import "../styles/app.sass";
import ServerProvider from "@/server/server";
import AuthProvider from "@/context/auth";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ServerProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ServerProvider>
    </Provider>
  );
}
