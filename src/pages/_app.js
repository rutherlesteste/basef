import { Provider } from "react-redux";
import store from "@/context/store";
import Layout from "./Layout";
import "../styles/app.sass";


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
