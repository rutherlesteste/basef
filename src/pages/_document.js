"use client";

import { Server, Sheet } from "styletron-engine-atomic";
import { styletron } from "../styletron";
import { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";

function MyDocument({ stylesheets }) {
  return (
    <Html>
      <Head>
        {stylesheets.map((sheet, i) => (
          <style
            key={i}
            className="_styletron_hydrate_"
            dangerouslySetInnerHTML={{ __html: sheet.css }}
            media={sheet.attrs.media}
            data-hydrate={sheet.attrs["data-hydrate"]}
          />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
MyDocument.getInitialProps = async (ctx) => {
  const page = await ctx.renderPage({
    enhanceApp: (App) => (props) =>
      (
        <StyletronProvider value={styletron}>
          <App {...props} />
        </StyletronProvider>
      ),
  });
  const stylesheets = styletron.getStylesheets() || [];
  return { ...page, stylesheets };
};

export default MyDocument;
