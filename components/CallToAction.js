import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold font-display">
        Ingin lapor barang hilang/ditemukan?
      </h2>
      <div className="grid gap-6 mt-4 md:grid-cols-2">
        <div className="">
          <h1 className="text-lg">
            Kehilangan uang, dompet, SIM, KTP, dan kawan-kawannya? Segera lapor
            di BantuTemu Kami akan bantu untuk mencari di database pelaporan
            barang hilang.
          </h1>
          <Link href="/item/new">
            <a>
              <div className="py-2 my-6 text-sm text-center text-white rounded bg-primary">
                Lapor Kehilangan Barang
              </div>
            </a>
          </Link>
        </div>
        <div className="">
          <h1 className="text-lg">
            Atau menemukan barang berharga yang tidak tahu siapa pemiliknya?
            Segera lapor di BantuTemu!
          </h1>
          <Link href="/item/new">
            <a>
              <div className="py-2 my-6 text-sm text-center text-white rounded bg-primary">
                Lapor Barang Temuan
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
