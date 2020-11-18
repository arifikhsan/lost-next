import Head from "next/head";
import { useRouter } from "next/router";
import { getSiteMetaData } from "utils/helpers";

export default function SEO({ title, description = "" }) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = description || siteMetadata.description;
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <Head>
      <title>
        {title} | {isRoot ? metaDescription : siteMetadata.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <meta name="google-site-verification" content="t6yga77wK2VqTOCaDMYncrcdXJo3Io8VZYiZb3xzX6I" />
      <link rel="icon" type="image/png" href="/static/favicon.ico" />
      <link rel="apple-touch-icon" href="/static/favicon.ico" />
    </Head>
  );
}
