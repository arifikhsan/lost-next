import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSiteMetaData } from "utils/helpers";
import moment from "moment";
import CallToAction from "components/CallToAction";
import literalCondition from "utils/helper/condition-helper";
import { isEmpty, isNil, times } from "lodash";
import {
  useItems,
  useItemsWithReward,
  useItemsLost,
  useItemsFound,
  useGroups,
} from "utils/network/swr-hooks";
import SearchItemForm from "components/SearchItemForm";

function ListItem({ items }) {
  if (isEmpty(items)) {
    return (
      <div className="col-start-2 py-6 text-center">
        <h1 className="text-3xl font-bold text-red-500 font-display">
          Laporan tidak ditemukan 😭😭
        </h1>
      </div>
    );
  }

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

function IndexPage({ data, success, message }) {
  const siteMetadata = getSiteMetaData();
  const metaDescription = siteMetadata.description || "";

  const { entries, isLoading } = useItems();
  const entriesReward = useItemsWithReward();
  const entriesLost = useItemsLost();
  const entriesFound = useItemsFound();
  const entriesGroup = useGroups();

  return (
    <Layout>
      <SEO title="BantuTemu" description={metaDescription} />
      <div className="grid gap-8">
        <div className="md:text-center md:py-12">
          <h1 className="py-4 text-3xl font-bold sm:text-4xl lg:text-5xl text-primary font-display">
            {metaDescription}
          </h1>
          <blockquote className="text-sm italic md:mt-4">
            "Dari Zaid bin Khalid al-Juhani RA. [diriwayatkan] ia berkata:
            Seorang laki-laki datang kepada Rasulullah SAW. lalu ia bertanya
            kepada beliau mengenai al-luqathah (barang temuan), maka beliau
            bersabda: Kenali lah dompetnya dan talinya, kemudian umumkan selama
            satu tahun. Jika pemiliknya datang, (maka serahkan kepadanya), dan
            jika tidak, maka barang itu terserah kepadamu” [HR. al-Bukhari dan
            Muslim]."
          </blockquote>
          <div className="max-w-md mx-auto mt-6">
            <SearchItemForm />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Grup</h2>
          <div className="flex justify-start pb-2 mt-4 space-x-2 overflow-y-auto md:justify-center">
            {entriesGroup.isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {entriesGroup.entries.data.map((group) => {
                  return (
                    <div
                      key={group.id}
                      className="flex flex-col items-center flex-shrink-0 space-y-1"
                    >
                      <div className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                        <a
                          className="block p-1 transition transform bg-white rounded-full hover:-rotate-6"
                          href="#"
                        >
                          {isNil(group.avatar) ? (
                            <img
                              className="w-16 h-16 rounded-full"
                              src="https://placekitten.com/200/200"
                              alt="cute kitty"
                            />
                          ) : (
                            <img
                              className="w-16 h-16 rounded-full"
                              src={group.avatar.original}
                              alt={`@${group.username}`}
                            />
                          )}
                        </a>
                      </div>
                      <a href="#" className="text-xs">
                        @{group.username}
                      </a>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Baru-baru ini</h2>
          <div className="mt-4">
            {isLoading ? <p>Loading...</p> : <ListItem items={entries.data} />}
          </div>
          <div className="md:flex md:justify-end">
            <MoreButton />
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
          <div className="md:flex md:justify-end">
            <MoreButton />
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
          <div className="md:flex md:justify-end">
            <MoreButton />
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
          <div className="md:flex md:justify-end">
            <MoreButton />
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

export default IndexPage;

function MoreButton() {
  return (
    <Link href="/item">
      <a className="block py-2 my-6 text-sm text-center transition duration-500 bg-white border rounded-md md:px-4 hover:text-secondary hover:bg-primary text-primary">
        Lihat lebih banyak...
      </a>
    </Link>
  );
}
