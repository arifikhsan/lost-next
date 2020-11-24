import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";
import CallToAction from "components/CallToAction";
import networkServer from "utils/network/network-server";

function Home({ data, success }) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";

  const items = (
    <div className="grid gap-4 md:grid-cols-3">
      {data.map((item) => (
        <Link key={item.id} href={`item/${item.slug}`}>
          <a className="p-4 transition duration-500 border rounded hover:shadow">
            <div className="text-xs">
              {item.categories.map((category) => {
                const isFirst = item.categories[0].id == category.id;

                return (
                  <span key={category.id} className="text-gray-700">
                    {!isFirst && <span>, </span>}
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

  return (
    <Layout>
      <SEO title="BantuTemu" description={metaDescription} />
      <div className="grid gap-8">
        <div className="lg:text-center">
          <h1 className="py-4 text-3xl font-bold sm:text-4xl lg:text-5xl md:py-12 text-primary font-display">
            {metaDescription}
          </h1>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Barang terlapor</h2>
          <div className="mt-4">{items}</div>
        </div>
        <CallToAction />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  let res = null;
  let success = false;

  try {
    res = await networkServer.get(`/items`);
    success = true;
  } catch (e) {
    success = false;
  }
  // setCookie(ctx, "from get serverside", "value", { maxAge: 14 * 24 * 60 * 60, path: "/" });
  // setCookie(null, "fromclient", "value", {
  //   maxAge: 14 * 24 * 60 * 60,
  //   path: "/",
  // });
  const data = res.data.data;

  return { props: { data, success } };
}

export default Home;
