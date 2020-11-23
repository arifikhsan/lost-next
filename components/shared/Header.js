import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useState } from "react";
import Account from "./Account";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [session, loading] = useSession();

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <div>
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between py-3">
            <Link href="/">
              <a className="py-4 ml-4">
                <img src="/logo.svg" alt="logo bantutemu" />
              </a>
            </Link>
            <div className="flex items-center justify-between mr-4 space-x-4">
              <div className="hidden md:block">
                <Account />
              </div>
              <button onClick={toggleNav} className="p-2 border rounded-lg">
                {!navOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* menu alt 1 */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* x */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* overlay */}
        <div
          hidden={!navOpen}
          className="relative z-50 w-full h-screen bg-white"
        >
          <div className="flex flex-col justify-between mt-20 space-y-4 text-lg text-center font-display">
            {session && (
              <>
                <Link href="/item/new">
                  <a>
                    <p onClick={toggleNav} className="p-4">
                      Laporkan Barang Hilang/Temuan
                    </p>
                  </a>
                </Link>
                <Link href="/item/mine">
                  <a>
                    <p onClick={toggleNav} className="p-4">
                      Laporanku
                    </p>
                  </a>
                </Link>
              </>
            )}
            <Link href="/">
              <a>
                <p onClick={toggleNav} className="p-4">
                  Beranda
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
          </div>
        </div>
      </div>

      {/* account */}
      <div className="md:hidden">
        <Account />
      </div>
    </div>
  );
}
