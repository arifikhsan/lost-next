import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 font-light text-center text-gray-800">
      <div className="py-10 bg-gray-100">
        <div className="max-w-5xl p-4 mx-auto">
          <p className="text-lg font-semibold font-display">Halaman</p>
          <div className="flex flex-col mt-2 space-y-1">
            <Link href="/">
              <a>Beranda</a>
            </Link>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="max-w-5xl p-4 mx-auto">
          bantutemu, {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
