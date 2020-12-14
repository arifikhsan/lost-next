import Layout from "components/Layout";
import SearchItemForm from "components/SearchItemForm";
import SEO from "components/Seo";
import { getItems } from "repository/item-repository";
import { getSiteMetaData } from "utils/helpers";
import Pagination from "components/Pagination";
import ItemCard from "components/ItemCard";
import { Component } from "react";
import networkServer from "utils/network/network-server";
import { isEmpty } from "lodash";

export default class Home extends Component {
  render() {
    const siteMetaData = getSiteMetaData();
    const { items } = this.props;

    return (
      <Layout>
        <SEO title="Beranda" description={siteMetaData.description} />
        <div className="flex justify-between w-full space-x-2">
          <SearchItemForm initQuery={this.props.query.query} />
          <button className="inline-flex items-center justify-center p-2 space-x-1 text-sm rounded bg-primary text-secondary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span>Filter</span>
          </button>
        </div>
        <div className="grid gap-4 my-4 sm:grid-cols-2 md:grid-cols-3">
          {items.data.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })}
          {isEmpty(items.data) && (
            <div className="py-6 text-center">
              <h1 className="text-3xl font-bold text-yellow-500 font-display">
                Laporan tidak ditemukan 😭😭
              </h1>
              <p className="mt-4 text-sm">Coba ulangi dengan kata kunci lain</p>
            </div>
          )}
        </div>
        <Pagination pagination={items.pagination} />
      </Layout>
    );
  }
}

export async function getServerSideProps({ query }) {
  const params = { page: query.page || 1, per: query.per || 10 };
  if (query.query) {
    params.query = query.query;
  }
  const res = await networkServer.get("/items", { params });
  const items = res.data;

  return { props: { items, query } };
}
