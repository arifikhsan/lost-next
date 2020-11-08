import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";

export default function Home() {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";
  const metaTitle = siteMetadata.titleDense || "";

  const bantuTemu = <span className="font-semibold">{metaTitle}</span>;

  return (
    <Layout>
      <SEO title="Website untuk melaporkan barang yang hilang atau ditemukan" />
      <div className="grid gap-8">
        <div className="lg:text-center">
          <h1 className="text-3xl font-bold text-blue-500 font-display">
            {metaDescription}
          </h1>
        </div>
        <div>stuff goes brrrr</div>
        <div className="">
          <h1 className="text-2xl text-blue-500 font-display">
            Kehilangan uang, dompet, sim, ktp, atau kawan-kawannya? Segera lapor
            di {bantuTemu}! semoga segera ditemukan.
          </h1>
        </div>
        <div className="">
          <h1 className="text-2xl text-blue-500 font-display">
            Atau menemukan barang berharga yang tidak tahu pemiliknya siapa?
            Segera lapor juga di {bantuTemu}! supaya pemiliknya dapat segera
            ketemu.
          </h1>
        </div>
      </div>
    </Layout>
  );
}
