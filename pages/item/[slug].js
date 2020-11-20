import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import moment from "moment";
import CallToAction from "components/CallToAction";

function Item({ item }) {
  return (
    <Layout>
      <SEO title={item.title} description={item.detail} />
      <div className="grid gap-6">
        <h1 className="py-6 text-3xl font-bold font-display">{item.title}</h1>
        <div className="">
          <h3 className="text-xl font-semibold font-display">Informasi</h3>
          <div className="mt-2 text-sm text-gray-700">
            <p>Kondisi: {item.condition}</p>
            {item.reward > 0 && <p>Hadiah: Rp. item.reward</p>}
            <p>Sejak: {moment(item.time_start).fromNow()}</p>
            <p>Pelapor: {item.user.name}</p>
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
        <div className="">
          <h3 className="text-xl font-semibold font-display">Kontak</h3>
          <div className="mt-2 text-sm text-gray-700">
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

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.LOST_API_URL}/items/${params.slug}`);
  const data = await res.json();
  const item = data["data"];

  return { props: { item } };
}

export default Item;
