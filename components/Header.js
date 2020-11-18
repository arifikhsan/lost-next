import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <div className="sticky top-0 bg-white border-b">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between py-3">
          <Link href="/">
            <a className="p-4">
              <img src="/logo.svg" alt="logo bantutemu" />
            </a>
          </Link>
          <button onClick={toggleNav} className="p-4">
            Menu
          </button>
        </div>
      </div>

      {/* overlay */}
      <div hidden={!navOpen} className="absolute w-full h-screen bg-white">
        <div className="flex flex-col justify-between mt-20 space-y-4 text-lg text-center font-display">
          <Link href="/">
            <a>
              <p onClick={toggleNav} className="p-4">
                Beranda
              </p>
            </a>
          </Link>
          <Link href="/">
            <a>
              <p onClick={toggleNav} className="p-4">
                Daftar / Masuk
              </p>
            </a>
          </Link>
          <Link href="/blog">
            <a>
              <p onClick={toggleNav} className="p-4">
                Blog
              </p>
            </a>
          </Link>
          <Link href="/item/new">
            <a>
              <p onClick={toggleNav} className="p-4">
                Laporkan Barang Hilang
              </p>
            </a>
          </Link>
          <Link href="/item/new">
            <a>
              <p onClick={toggleNav} className="p-4">
                Laporkan Barang Temuan
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
