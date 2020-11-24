import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import moment from "moment";
import CallToAction from "components/CallToAction";
import networkServer from "utils/network/network-server";
import { isNil } from "lodash";

function Item({ item, editable }) {
  return (
    <Layout>
      <SEO title={item.title} description={item.detail} />
      <div className="grid gap-6">
        <h1 className="py-6 text-3xl font-bold font-display">{item.title}</h1>
        {editable && (
          <div className="space-x-2">
            <Link href={`/item/${item.slug}/edit`}>
              <a className="px-4 py-2 text-sm text-white rounded bg-primary">
                Edit
              </a>
            </Link>
            <Link href={`/item/${item.slug}/delete`}>
              <a className="px-4 py-2 text-sm text-white bg-red-500 rounded">
                Hapus
              </a>
            </Link>
          </div>
        )}
        <div className="">
          <h3 className="text-xl font-semibold font-display">Informasi</h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>Kondisi: {item.condition}</p>
            <p>Sejak: {moment(item.time_start).fromNow()}</p>
            <p>
              Kategori:{" "}
              {item.categories.map((category) => {
                const isFirst = item.categories[0].id == category.id;

                return (
                  <span key={category.id} className="text-gray-700">
                    {!isFirst && <span>, </span>}
                    {category.name}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        {!isNil(item.reward) && (
          <div className="">
            <h3 className="text-xl font-semibold font-display">Hadiah</h3>
            <div className="mt-2 text-sm text-gray-700">
              <p>Tipe: {item.reward.category}</p>
              <p>Jumlah: Rp. {item.reward.value}</p>
            </div>
          </div>
        )}
        <div className="">
          <h3 className="text-xl font-semibold font-display">Kontak</h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>Nama: {item.user.name}</p>
            <p>HP: {item.user.phone_number}</p>
            <p>Whatsapp: {item.user.whatsapp_phone_number}</p>
          </div>
        </div>
        <div className="">
          <h3 className="text-xl font-semibold font-display">Deskripsi</h3>
          <div className="mt-2 text-gray-800">
            <p>{item.detail}</p>
          </div>
        </div>
        <CallToAction />

        {item.whatsapp_phone_number && (
          <div className="sticky p-4 mt-6 text-center text-white bg-blue-600 rounded cursor-pointer">
            <p>Hubungi pelapor</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params, req }) {
  let editable = false;
  // const res = await fetch(`${process.env.LOST_API_URL}/items/${params.slug}`);
  const res = await networkServer.get(`/items/${params.slug}`);

  const options = { headers: { cookie: req.headers.cookie } };
  const resToken = await networkServer.get(
    `${process.env.NEXTAUTH_URL}/api/examples/jwt`,
    options
  );
  // console.log(resToken.data);

  // const data = await res.json();
  const item = res.data["data"];
  // console.log(item.user.uid)

  if (resToken.data) {
    editable = item.user.email === resToken.data.email;
  }

  return { props: { item, editable } };
}

export default Item;
