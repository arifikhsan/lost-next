import AccessDenied from "components/error/AccessDenied";
import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSession } from "next-auth/client";
import networkServer from "utils/network/network-server";
import { Component } from "react";
import networkClient from "utils/network/network-client";
import Link from "next/link";
import ItemForm from "components/ItemForm";
import { pick } from "lodash";

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        title: "",
        detail: "",
        condition: "lost",
        category: [],
        category_items_attributes: [],
        // reward_attributes: {},
      },
      categories: {},
      done: false,
    };

    this.state.categories = this.props.categories;
    this.state.item.category_ids = [];
  }

  submitItem = async () => {
    // let requestBody = { ...this.state.item };
    // delete requestBody.category;
    // delete requestBody.slug;

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

    const response = await networkClient.post("/items", requestBody, {
      headers: { ...this.props.headers },
    });

    if (response.status == 201) {
      alert("Berhasil membuat laporan 😇");
      this.state.item.slug = response.data.data.slug;
      this.setState({ done: true });
    } else {
      alert("Gagal membuat laporan 😭");
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
            <div className="grid max-w-3xl gap-6 mx-auto">
              <h1 className="py-6 text-3xl font-bold font-display">
                Buat Laporan
              </h1>
              <ItemForm
                submitItem={this.submitItem}
                categories={this.state.categories}
                item={this.state.item}
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
  let content = null;
  let token = null;
  let categories = null;
  let headers = null;

  if (session) {
    const options = { headers: { cookie: context.req.headers.cookie } };
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/examples/protected`,
      options
    );
    const json = await res.json();

    if (json.content) {
      content = json.content;
    }

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

    console.log("headers: ", headers);

    const resCategories = await networkServer.get("/categories", { headers });
    // const me = await networkServer.get("/me", { headers });

    if (resCategories.data) {
      categories = resCategories.data["data"];
    }
  }

  return {
    props: {
      session,
      content,
      token,
      categories,
      headers,
    },
  };
}

export default New;
