import Document, { Head, Main, NextScript, Html } from "next/document";

import { getSiteMetaData } from "utils/helpers";

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head>
          <meta name="dicoding:email" content="arif.ikhsanudin.id@gmail.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
