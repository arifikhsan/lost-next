import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";
import CallToAction from "components/CallToAction";
import networkServer from "utils/network/network-server";
import { getSession } from "next-auth/client";

function Mine(props) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";

  const items = (
    <div className="grid gap-4 md:grid-cols-3">
      {props.items.map((item) => (
        <Link key={item.id} href={`/item/${item.slug}`}>
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
        <div>
          <h2 className="text-2xl font-bold font-display">Laporanku</h2>
          <div className="mt-4">{items}</div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let token = null;
  let headers = null;
  let items = [];

  if (session) {
    const options = { headers: { cookie: context.req.headers.cookie } };
    const resToken = await fetch(
      `${process.env.NEXTAUTH_URL}/api/examples/jwt`,
      options
    );
    const tokenJson = await resToken.json();
    token = tokenJson;

    headers = {
      "access-token": token["access-token"],
      client: token["client"],
      uid: token["uid"],
    };

    const resItem = await networkServer.get(`/items/mine`, { headers });

    if (resItem.data) {
      items = resItem.data.data;
    }
  }

  return {
    props: {
      headers,
      items,
      session,
    },
  };
}

export default Mine;
