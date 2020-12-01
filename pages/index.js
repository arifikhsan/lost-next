import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";
import CallToAction from "components/CallToAction";
import literalCondition from "utils/helper/condition-helper";
import { isNil } from "lodash";
import {
  useItems,
  useItemsWithReward,
  useItemsLost,
  useItemsFound,
} from "utils/network/swr-hooks";

function ListItem({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => {
        return (
          <Link key={item.id} href={`item/${item.slug}`}>
            <a className="p-4 transition duration-500 rounded bg-gradient-to-br to-blue-400 via-blue-500 from-primary hover:shadow-lg">
              <div className="text-xs">
                {item.categories.map((category) => {
                  const isFirst = item.categories[0].id == category.id;

                  return (
                    <span key={category.id} className={"text-secondary"}>
                      {!isFirst && <span>, </span>}
                      {category.name}
                    </span>
                  );
                })}
              </div>
              <div className="mt-2 text-secondary">
                <p className="text-lg font-bold font-display">{item.title}</p>
                <div className="mt-1">
                  {!isNil(item.reward) && (
                    <p className="text-sm">
                      Hadiah bagi penemu:{" "}
                      <span className="font-bold">Rp.{item.reward.value}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 text-xs text-secondary">
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

function Home({ data, success, message }) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";

  const { entries, isLoading } = useItems();
  const entriesReward = useItemsWithReward();
  const entriesLost = useItemsLost();
  const entriesFound = useItemsFound();

  // console.log('success: ', success)
  // console.log("entries: ", entriesReward.entries);
  // console.log("isLoading: ", entriesReward.isLoading);

  // if (!success) {
  //   return (
  //     <Layout>
  //       <ServerSleeping />
  //     </Layout>
  //   );
  // }

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
          <h2 className="text-2xl font-bold font-display">Baru-baru ini</h2>
          <div className="mt-4">
            {isLoading ? <p>Loading...</p> : <ListItem items={entries.data} />}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">
            Berhadiah bagi penemu
          </h2>
          <div className="mt-4">
            {entriesReward.isLoading ? (
              <p>Loading...</p>
            ) : (
              <ListItem items={entriesReward.entries.data} />
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Hilang</h2>
          <div className="mt-4">
            {entriesLost.isLoading ? (
              <p>Loading...</p>
            ) : (
              <ListItem items={entriesLost.entries.data} />
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Ditemukan</h2>
          <div className="mt-4">
            {entriesFound.isLoading ? (
              <p>Loading...</p>
            ) : (
              <ListItem items={entriesFound.entries.data} />
            )}
          </div>
        </div>
        <CallToAction />
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   let success = false;
//   let message = "";
//   let data = {};

//   try {
//     let items = await networkServer.get(`/items?per=6`);
//     let itemsWithReward = await networkServer.get(
//       `/items?per=6&reward=yes&condition=lost`
//     );
//     let itemsLost = await networkServer.get(`/items?per=6&condition=lost`);
//     let itemsFound = await networkServer.get(`/items?per=6&condition=found`);

//     data = {
//       important: items.data.data,
//       reward: itemsWithReward.data.data,
//       lost: itemsLost.data.data,
//       found: itemsFound.data.data,
//       recent: items.data.data,
//     };

//     success = true;
//   } catch (err) {
//     console.log("err: ", err);
//     // message = err.message;
//   }

//   return { props: { data, success, message } };
// }

export default Home;
