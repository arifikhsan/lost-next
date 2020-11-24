import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";
import CallToAction from "components/CallToAction";
import networkServer from "utils/network/network-server";
import literalCondition from "utils/helper/condition-helper";
import { isNil } from "lodash";

function ListItem({ items, important }) {
  // console.log(items)
  return (
    <div className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3`}>
      {items.map((item) => {
        return (
          <Link key={item.id} href={`item/${item.slug}`}>
            <a
              className={
                `p-4 transition duration-500 rounded hover:shadow ` +
                (important &&
                  ` bg-gradient-to-tr from-teal-400 via-blue-500 to-primary `) +
                (!important && ` border`)
              }
            >
              <div className="text-xs">
                {item.categories.map((category) => {
                  const isFirst = item.categories[0].id == category.id;

                  return (
                    <span
                      key={category.id}
                      className={important ? "text-white" : "text-gray-700"}
                    >
                      {!isFirst && <span>, </span>}
                      {category.name}
                    </span>
                  );
                })}
              </div>
              <div className={`mt-2` + (important && " text-gray-900 ")}>
                <p className={`text-lg font-display font-bold`}>{item.title}</p>
                <div className="mt-1">
                  {!isNil(item.reward) && (
                    <p className="text-sm">
                      Hadiah bagi penemu:{" "}
                      <span className="font-bold">Rp.{item.reward.value}</span>
                    </p>
                  )}
                </div>
              </div>
              <div
                className={
                  `mt-3 text-xs ` + (important ? `text-white` : `text-gray-700`)
                }
              >
                <p>
                  {literalCondition(item.condition)}{" "}
                  {moment(item.time_start).fromNow()}
                </p>
                <p className="mt-1">Oleh: {item.user.name}</p>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}

function Home({ data, success }) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";

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
          <h2 className="text-2xl font-bold font-display">Penting</h2>
          <div className="mt-4">
            <ListItem items={data.important} important />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">
            Berhadiah bagi penemu
          </h2>
          <div className="mt-4">
            <ListItem items={data.reward} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Hilang</h2>
          <div className="mt-4">
            <ListItem items={data.lost} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Ditemukan</h2>
          <div className="mt-4">
            <ListItem items={data.found} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Baru baru ini</h2>
          <div className="mt-4">
            <ListItem items={data.recent} />
          </div>
        </div>
        <CallToAction />
      </div>
    </Layout>
  );
}

// penting
// berhadiah
// hilang
// ditemukan
// baru baru ini

export async function getServerSideProps() {
  let success = false;
  let data = {};

  let items = await networkServer.get(`/items?per=6`);
  let itemsWithReward = await networkServer.get(
    `/items?per=6&reward=yes&condition=lost`
  );
  let itemsLost = await networkServer.get(`/items?per=6&condition=lost`);
  let itemsFound = await networkServer.get(`/items?per=6&condition=found`);

  data = {
    important: items.data.data,
    reward: itemsWithReward.data.data,
    lost: itemsLost.data.data,
    found: itemsFound.data.data,
    recent: items.data.data,
  };

  return { props: { data, success } };
}

export default Home;
