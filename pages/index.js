import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";

function Home({ data }) {
  // console.log(data);
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";
  const metaTitle = siteMetadata.titleDense || "";

  const showTime = (timeStart) => {
    return moment(timeStart).fromNow();
  };

  const bantuTemu = <span className="font-semibold">{metaTitle}</span>;

  const items = (
    <div className="grid gap-4">
      {data.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          <div className="flex justify-between text-xs">
            <span className="text-gray-700">{item.condition}</span>
          </div>
          <p className="mt-1">{item.title}</p>
          <div className="mt-4 text-sm text-gray-700">
            {item.reward > 0 && <p>Hadiah: Rp.{item.reward}</p>}
            <p>
              {item.condition} {showTime(item.time_start)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <SEO title="Website untuk melaporkan barang yang hilang atau ditemukan" />
      <div className="grid gap-8">
        <div className="lg:text-center">
          <h1 className="text-3xl font-bold text-blue-500 font-display">
            {metaDescription}
          </h1>
        </div>
        <div>
          <h2 className="text-2xl">Barang Terlapor</h2>
          <div className="mt-4">{items}</div>
        </div>
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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}api/v1/items`);
  let data = await res.json();
  data = data["data"];

  return { props: { data } };
}

export default Home;
