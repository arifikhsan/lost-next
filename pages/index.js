import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";

function Home({ data }) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";
  const metaTitle = siteMetadata.titleDense || "";

  const bantuTemu = <span className="font-semibold">{metaTitle}</span>;

  const items = (
    <div className="grid gap-4 md:grid-cols-3">
      {data.map((item) => (
        <Link key={item.id} href={`item/${item.slug}`}>
          <a className="p-4 transition duration-500 border rounded hover:shadow">
            <div className="flex justify-between text-xs">
              {item.categories.map((category) => {
                return (
                  <span key={category.id} className="text-gray-700">
                    {category.name}
                  </span>
                );
              })}
            </div>
            <p className="mt-1">{item.title}</p>
            <div className="mt-4 text-sm text-gray-700">
              {item.reward > 0 && <p>Hadiah: Rp.{item.reward}</p>}
              <p>
                {item.condition} {moment(item.time_start).fromNow()}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );

  const callToAction = (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="">
        <h1 className="text-xl text-primary font-display">
          Kehilangan uang, dompet, sim, ktp, atau kawan-kawannya? Segera lapor
          di {bantuTemu}! Kami akan bantu untuk mencari di database pelaporan
          barang hilang.
        </h1>
        <Link href="/">
          <a>
            <div className="p-4 mt-4 text-lg text-center text-white rounded font-display bg-primary">
              Lapor Kehilangan Barang
            </div>
          </a>
        </Link>
      </div>
      <div className="">
        <h1 className="text-xl text-primary font-display">
          Atau menemukan barang berharga yang tidak tahu pemiliknya siapa?
          Segera lapor juga di {bantuTemu}! supaya pemiliknya dapat segera
          ketemu.
        </h1>
        <Link href="/">
          <a>
            <div className="p-4 mt-4 text-lg text-center text-white rounded font-display bg-primary">
              Lapor Penemuan Barang
            </div>
          </a>
        </Link>
      </div>
    </div>
  );

  return (
    <Layout>
      <SEO title="Website untuk melaporkan barang yang hilang atau ditemukan" />
      <div className="grid gap-8">
        <div className="lg:text-center">
          <h1 className="py-4 text-3xl font-bold md:py-12 text-primary font-display">
            {metaDescription}
          </h1>
        </div>
        <div>
          <h2 className="text-2xl font-display">Barang terlapor</h2>
          <div className="mt-4">{items}</div>
        </div>
        <div>
          <h2 className="text-2xl font-display">Ingin lapor barang hilang/ditemukan?</h2>
          <div className="mt-4">{callToAction}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}api/v1/items`);
  let data = await res.json();
  data = data["data"];

  return { props: { data } };
}

export default Home;
