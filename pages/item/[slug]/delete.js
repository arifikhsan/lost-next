import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSession } from "next-auth/client";
import network from "utils/network";
import { Component } from "react";
import networkClient from "utils/network-client";
import Link from "next/link";
import Router from "next/router";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: { ...this.props.item },
      slug: this.props.slug,
      done: false,
    };
  }

  submitItem = async () => {
    const response = await networkClient.delete(`/items/${this.state.slug}`, {
      headers: { ...this.props.headers },
    });

    if (response.status == 204) {
      alert("Berhasil menghapus laporan 😇")
      Router.push("/")
    } else {
      alert("Gagal menghapus laporan 😭")
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
          title={`Hapus ${this.state.item.title}`}
          description="Laporkan barang yang Anda yang hilang atau ditemukan"
        />
        <div>
          <div>
            <div className="grid gap-6">
              <h1 className="py-6 text-3xl font-bold font-display">
                Hapus Laporan "{this.state.item.title}"
              </h1>
              <div>
                {this.state.done ? (
                  <div>
                    <Link href={`/`}>
                      <a className="px-4 py-2 text-sm text-white rounded bg-primary">
                        Kembali ke beranda
                      </a>
                    </Link>
                    <Link href={`/items/new`}>
                      <a className="px-4 py-2 text-sm text-white rounded bg-primary">
                        Buat laporan baru
                      </a>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={this.submitItem}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded"
                  >
                    Hapus laporan ini
                  </button>
                )}
              </div>
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
  let headers = null;
  let item = null;

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

    const resItem = await network.get(`/items/${context.params.slug}`, {
      headers,
    });

    // console.log("resItem.status: ", resItem.status);
    // console.log("resItem.data: ", resItem.data);

    if (resItem.status === 200) {
      if (resItem.data) {
        item = resItem.data["data"];
      }
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      headers,
      item,
      session,
      slug: context.params.slug,
    },
  };
}

export default Delete;
