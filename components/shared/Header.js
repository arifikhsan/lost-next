import { Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useState } from "react";
import Account from "./Account";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [session, loading] = useSession();

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <>
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between py-3">
            <Link href="/">
              <a className="py-4 ml-4">
                <img src="/logo.svg" alt="logo bantutemu" />
              </a>
            </Link>
            <div className="flex items-center justify-between mr-4">
              <div className="hidden md:block">
                <Account />
              </div>
              <div className="relative z-0 inline-block text-left">
                <div>
                  <button
                    onClick={() => {
                      toggleNav();
                    }}
                    type="button"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {/* <!-- Heroicon name: alt 3 --> */}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                </div>
                <Transition
                  show={navOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100 transform"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {session && (
                        <>
                          <Link href="/item/new" className="" role="menuitem">
                            <a
                              className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Laporkan Barang Hilang/Temuan
                            </a>
                          </Link>
                          <Link href="/item/mine" className="" role="menuitem">
                            <a
                              className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Laporkanku
                            </a>
                          </Link>
                        </>
                      )}
                      <Link href="/" className="" role="menuitem">
                        <a className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          Beranda
                        </a>
                      </Link>
                      <Link href="/blog" className="" role="menuitem">
                        <a className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          Blog
                        </a>
                      </Link>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* account */}
      <div className="md:hidden">
        <Account />
      </div>
    </>
  );
}
