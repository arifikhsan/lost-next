import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold font-display">
        Ingin lapor barang hilang/ditemukan?
      </h2>
      <div className="grid gap-6 mt-4 md:grid-cols-2">
        <div className="">
          <h1 className="text-xl text-primary">
            Kehilangan uang, dompet, SIM, KTP, dan kawan-kawannya? Segera lapor
            di BantuTemu Kami akan bantu untuk mencari di database pelaporan
            barang hilang.
          </h1>
          <Link href="/item/new">
            <a>
              <div className="py-3 my-6 text-lg text-center text-white rounded bg-primary">
                Lapor Kehilangan Barang
              </div>
            </a>
          </Link>
        </div>
        <div className="">
          <h1 className="text-xl text-primary">
            Atau menemukan barang berharga yang tidak tahu pemiliknya siapa?
            Segera lapor juga di BantuTemu supaya pemiliknya dapat segera
            ketemu.
          </h1>
          <Link href="/item/new">
            <a>
              <div className="py-3 my-6 text-lg text-center text-white rounded bg-primary">
                Lapor Barang Temuan
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
