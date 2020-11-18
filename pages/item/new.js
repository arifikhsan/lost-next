import Layout from "components/Layout";
import SEO from "components/Seo";

export default function New() {
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
