import Layout from "components/Layout";
import SearchItemForm from "components/SearchItemForm";
import SEO from "components/Seo";
import { getItems } from "repository/item-repository";
import { getSiteMetaData } from "utils/helpers";

import ItemCard from "components/ItemCard";

export default function Home({ items }) {
  const siteMetaData = getSiteMetaData();

  console.log(items);
  return (
    <Layout>
      <SEO title="Beranda" description={siteMetaData.description} />
      <div className="inline-flex justify-between w-full space-x-2">
        <SearchItemForm />
        <button className="p-2 text-sm rounded bg-primary text-secondary">Filter</button>
      </div>
      <div className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
        {items.data.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const items = await getItems();

  return { props: { items } };
}
