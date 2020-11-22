import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSession } from "next-auth/client";
import { Formik, Form, Field } from "formik";
import network from "utils/network";
import { Component } from "react";
import networkClient from "utils/network-client";
import Link from "next/link";

function ItemForm({ submitItem, categories, item }) {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ item }}
        onSubmit={(values) => {
          const dateNow = new Date();
          const nextYear = dateNow.setFullYear(dateNow.getFullYear() + 1);

          item.title = values.item.title;
          item.detail = values.item.detail;
          item.condition = values.item.condition;
          item.time_start = new Date().toISOString();
          item.time_end = new Date(nextYear).toISOString();

          if (values.item.category.length > 0) {
            values.item.category.map((category_id) => {
              item.category_items_attributes.push({
                category_id: parseInt(category_id),
              });
            });
          }

          submitItem();
        }}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-xl font-semibold font-display">Kondisi</h3>
                <div className="text-gray-700">Hilang / Ditemukan</div>
                <div className="flex mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <Field
                      className="form-radio"
                      type="radio"
                      name="item.condition"
                      value="lost"
                      required
                    />
                    <span className="ml-2">Hilang</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      className="form-radio"
                      type="radio"
                      name="item.condition"
                      value="found"
                    />
                    <span className="ml-2">Ditemukan</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold font-display">
                  Detail Barang
                </h3>
                <div>
                  <label className="text-gray-700">Judul</label>
                  <Field
                    name="item.title"
                    className="block w-full mt-1 form-input"
                    placeholder="Telah hilang/ditemukan..."
                  />
                </div>
                <div>
                  <label className="text-gray-700">Deskripsi</label>
                  <Field
                    component="textarea"
                    name="item.detail"
                    className="block w-full mt-1 form-textarea"
                    rows="4"
                    placeholder="Ceritakan waktu, tempat, serta hal lain yang mendukung"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold font-display">
                  Kategori Barang
                </h3>
                <span>Pilih kategori yang relevan</span>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="inline-flex items-center"
                    >
                      <Field
                        component="input"
                        type="checkbox"
                        name="item.category"
                        value={category.id}
                        className="form-checkbox"
                        checked={values.category}
                      />
                      <span className="ml-2 text-gray-800">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold font-display">
                  Kirim laporan
                </h3>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white rounded bg-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        title: "new title",
        detail: "detail",
        condition: "lost",
        category: [],
        category_items_attributes: [],
        // reward_attributes: {},
      },
      categories: {},
      done: false,
    };

    this.state.categories = this.props.categories;
  }

  submitItem = async () => {
    let requestBody = { ...this.state.item };
    delete requestBody.category;
    delete requestBody.slug;

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
            <div className="grid gap-6">
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
    const hostname = process.env.NEXTAUTH_URL || "http://localhost:8000";
    const options = { headers: { cookie: context.req.headers.cookie } };
    const res = await fetch(`${hostname}/api/examples/protected`, options);
    const json = await res.json();

    if (json.content) {
      content = json.content;
    }

    const resToken = await fetch(`${hostname}/api/examples/jwt`, options);
    const tokenJson = await resToken.json();
    token = tokenJson;

    headers = {
      "access-token": token["access-token"],
      client: token["client"],
      uid: token["uid"],
    };

    const resCategories = await network.get("/items/new", { headers });
    const me = await network.get("/me", { headers });

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
