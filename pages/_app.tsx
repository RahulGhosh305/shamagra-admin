import type { AppProps } from "next/app";
import Layout from "@components/layout";
import { ThemeProvider } from "styled-components";
import { theme } from "@utils/themeVariables";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@redux/store";
import "antd/dist/antd.css";
import "@styles/style.css";
import "@styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...theme }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Head>
          <title>Shamagra - Admin</title>
        </Head>
      </ThemeProvider>
    </Provider>
  );
}
