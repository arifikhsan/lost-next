import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSession } from "next-auth/client";
import network from "utils/network";
import { Component } from "react";
import networkClient from "utils/network-client";
import Link from "next/link";
import ItemForm from "components/ItemForm";
import { pick } from "lodash";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: { ...this.props.item },
      slug: this.props.slug,
      // item: {
      //   title: "new title",
      //   detail: "detail",
      //   condition: "lost",
      //   category: [],
      //   category_items_attributes: [],
      //   reward_attributes: {},
      // },
      categories: [...this.props.categories],
      done: false,
    };

    // this.state.item.category = []
    this.state.item.category_items_attributes = [];
    this.state.item.category_ids = this.state.item.category_items.map((e) =>
      String(e.category_id)
    );
  }

  submitItem = async () => {
    // let requestBody = { ...this.state.item };
    // delete requestBody.id;
    // delete requestBody.categories;
    // delete requestBody.category;
    // delete requestBody.slug;
    // delete requestBody.category_ids;
    // delete requestBody.category_items;

    let requestBody = pick(this.state.item, [
      "title",
      "detail",
      "condition",
      "status",
      "time_start",
      "time_end",
      "user",
      "reward",
      "category_items_attributes",
    ]);

    console.log(requestBody);

    const response = await networkClient.put(
      `/items/${this.state.slug}`,
      requestBody,
      {
        headers: { ...this.props.headers },
      }
    );

    if (response.status == 200) {
      alert("Berhasil update laporan 😇");

      this.state.item = response.data.data;
      this.setState({ done: true });
      this.state.item.category_ids = this.state.item.category_items.map((e) =>
        String(e.category_id)
      );
    } else {
      alert("Gagal update laporan 😭");
    }
  };

  render() {
    if (!this.props.session) {
      return (
        <Layout>
          <AccessDenied />
        </Layout>
      );
    }

    return (
      <Layout>
        <SEO
          title="Buat Laporan Kehilangan / Penemuan"
          description="Laporkan barang yang Anda yang hilang atau ditemukan"
        />
        <div>
          <div>
            <div className="grid gap-6">
              <h1 className="py-6 text-3xl font-bold font-display">
                Buat Laporan
              </h1>
              <ItemForm
                submitItem={this.submitItem}
                categories={this.state.categories}
                item={this.state.item}
                isEdit
              />
              {this.state.done && (
                <Link href={`/item/${this.state.item.slug}`}>
                  <a className="px-4 py-2 text-sm text-white rounded bg-primary">
                    Lihat post
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let token = null;
  let categories = null;
  let headers = null;
  let item = null;

  if (session) {
    const hostname = process.env.NEXTAUTH_URL || "http://localhost:8000";
    const options = { headers: { cookie: context.req.headers.cookie } };

    const resToken = await fetch(`${hostname}/api/examples/jwt`, options);
    const tokenJson = await resToken.json();
    token = tokenJson;

    console.log("context: ", context.params);

    headers = {
      "access-token": token["access-token"],
      client: token["client"],
      uid: token["uid"],
    };

    const resItem = await network.get(`/items/${context.params.slug}/edit`, {
      headers,
    });

    if (resItem.data) {
      item = resItem.data["data"];
    }

    const resCategories = await network.get(`/categories`, { headers });

    if (resCategories.data) {
      categories = resCategories.data["data"];
    }
  }

  return {
    props: {
      categories,
      headers,
      item,
      session,
      slug: context.params.slug,
    },
  };
}

export default Edit;
