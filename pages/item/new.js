import AccessDenied from "components/AccessDenied";
import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSession } from "next-auth/client";
import network from "utils/network";

export default function New({ content, session, token, categories }) {

  if (!session) {
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
            <div className="">
              <h3 className="text-xl font-semibold font-display">Kondisi</h3>
              {/* <div className="mt-2 text-sm text-gray-700">
                <p>HP: {item.user.phone_number}</p>
                <p>Whatsapp: {item.user.whatsapp_phone_number}</p>
              </div> */}
              {content}
              {categories.map((c) => (
                <p key={c.id}>{c.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let content = null;
  let token = null;
  let categories = null;

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

    const headers = {
      "access-token": token["access-token"],
      client: token["client"],
      uid: token["uid"],
    };

    const resCategories = await network.get("/categories", { headers });
    const me = await network.get("/me", { headers });

    // console.log("resCategories: ", resCategories.data);
    // console.log("me: ", me.data);

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
    },
  };
}
